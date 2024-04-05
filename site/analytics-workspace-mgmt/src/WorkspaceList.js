import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import WorkspaceEditor from './WorkspaceEditor/WorkspaceEditor.js'

function WorkspaceItem({item}){
    const [itemDef, itemChanged] = useState(item);

    return (
        <Accordion.Item eventKey={itemDef.metadata.name}>
            <Accordion.Header>
            {itemDef.spec.displayName}
            </Accordion.Header>
            <Accordion.Body>
            {itemDef.spec.description}
            <WorkspaceEditor item={itemDef} itemChanged={itemChanged} />
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default function WorkspaceList({data}){
    return (
        <Accordion>
            {data.map((item) => (
                <WorkspaceItem item={item} />
            ))}
        </Accordion>
    )
}