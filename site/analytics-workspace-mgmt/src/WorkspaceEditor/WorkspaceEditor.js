import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import WorkspaceEditorForm from './Form/WorkspaceEditorForm.js';
import { ApiService } from '../Api.js'
import { Link, useParams } from 'react-router-dom';

export default function WorkspaceEditor({defaultActiveKey = "basics"}) {
    const { workspaceId } = useParams();
    const item = { "metadata" : { "name" : workspaceId }};
    const [newItem, newItemChanged] = useState(item);
    const onChange = (e, newItem) => {
        if(!!newItem){
            newItemChanged(newItem);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            console.info("Fetching Data");
            try {
                const api = new ApiService();
                const result = await api.FetchWorkspace(workspaceId);
                console.info(result);
                newItemChanged(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [ workspaceId ]);


    const save = async () => {
        try {
            const api = new ApiService();
            const result = await api.UpdateWorkspace(newItem);
            console.info(result);
            newItemChanged(result);
        } catch(ex){
            console.error(ex);
        }
    }

    if(newItem.spec === null || newItem.spec === undefined){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <Link to={`/`}>Home</Link>
            <h1>{newItem.metadata.namespace}/{newItem.metadata.name}</h1>
            <WorkspaceEditorForm item={newItem} onChange={onChange} defaultActiveKey={defaultActiveKey} />
            <Button onClick={save}>
                Save
            </Button>
        </div>
    );
}