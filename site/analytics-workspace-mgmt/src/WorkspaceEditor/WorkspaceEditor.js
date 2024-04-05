import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import WorkspaceEditorForm from './Form/WorkspaceEditorForm.js';


export default function WorkspaceEditor({item, itemChanged}) {
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState(false);
    const [newItem, newItemChanged] = useState(item);
    const handleClose = () => {
        if(changed){
            console.warn(item.metadata.name + " has changed");
        }
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const onChange = (e, newItem) => {
        setChanged(true);
        if(!!newItem){
            newItemChanged(newItem);
        }
    }
    const save = async () => {
        console.info("Saving changes to " + newItem.metadata.name);
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            };

            const response = await fetch('http://localhost:8000/api/workspace', requestOptions);
            const result = await response.json();
            console.info(newItem);
            newItemChanged(result);
            itemChanged(result);
            setChanged(false);
            handleClose();
        } catch(ex){
            console.error(ex);
        }
    }


    return (
        <div>
            <Button onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{newItem.metadata.namespace}/{newItem.metadata.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WorkspaceEditorForm item={newItem} onChange={onChange} />
                    <Button onClick={save}>
                        Save
                    </Button>
                </Modal.Body>
            </Modal>
            
        </div>
    )
}