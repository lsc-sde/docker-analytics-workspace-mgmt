import React, { useState, useEffect } from 'react';
import { ApiService } from '../../Api.js'
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Modal from 'react-bootstrap/Modal';

function WorkspaceBinding({workspaceBinding}){
    const [binding, bindingUpdated] = useState(workspaceBinding);
    const [showExtendScreen, showExtendScreenUpdated] = useState(false);
    const [stagedExpiry, updateStagedExpiry] = useState(workspaceBinding.spec.expires);

    const expireNow = async (e) => {
        const api = new ApiService();
        const newBinding = binding;
        newBinding.spec.expires = dayjs().toISOString().split("T")[0];
        
        const result = await api.UpdateWorkspaceBinding(binding);
        bindingUpdated(result);
        updateStagedExpiry(result.spec.expires);
    }

    const extendExpiry = async(e) => {
        const api = new ApiService();
        const newBinding = binding;
        newBinding.spec.expires = dayjs(stagedExpiry).toISOString().split("T")[0];
        
        const result = await api.UpdateWorkspaceBinding(binding);
        bindingUpdated(result);
        handleCloseExtendStreen();
    }

    const handleShowExtendScreen = () => {
        showExtendScreenUpdated(true);
    }

    const handleCloseExtendStreen = () => {
        showExtendScreenUpdated(false);
    } 

    return (
        <>
            <Modal show={showExtendScreen} onHide={handleCloseExtendStreen}>
                <Modal.Header closeButton>
                <Modal.Title>Extend Binding Duration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>When would you like this to be extended until?</p>
                    <DatePicker format='YYYY-MM-DD' defaultValue={dayjs(stagedExpiry)} onChange={updateStagedExpiry} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseExtendStreen}>
                    Close
                </Button>
                <Button variant="primary" onClick={extendExpiry}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <Card>
                <Card.Body>
                    <Card.Title>{binding.spec.username}</Card.Title>

                    <Card.Text>
                        Expires: {binding.spec.expires}
                    </Card.Text>
                    <Card.Footer>
                        <Button disabled={dayjs().isAfter(dayjs(binding.spec.expires))}  variant="danger" onClick={expireNow}>Expire Now</Button>
                        
                        <Button variant="primary" onClick={handleShowExtendScreen}>
                            Extend
                        </Button>

                        
                    </Card.Footer>
                </Card.Body>
            </Card>
        </>
    );
}

export default function WorkspaceBindingEditor({workspaceId}){
    const [bindings, bindingsUpdated] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            console.info("Fetching Binding Data");
            try {
                const api = new ApiService();
                const result = await api.FetchWorkspaceBindings(workspaceId);
                console.info(result);
                bindingsUpdated(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [ workspaceId ]);


    return (
        <>
            <Link to={`/workspaces/${workspaceId}/bindings/new`}>Add Binding</Link>
            <Row xs={1} md={2} className="g-4">
                {bindings.map((value, idx) => (
                    <Col key={idx}>
                        <WorkspaceBinding workspaceBinding={value} />
                    </Col>
                ))}
            </Row>
        </>
    );
}