import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ApiService } from './Api.js'
import { Link } from 'react-router-dom';


function WorkspaceItem({ item }) {
    return (
        <Card>

            <Card.Body>
                <Card.Title>{item.spec.displayName}</Card.Title>

                <Card.Text>
                    {item.spec.description}
                </Card.Text>
                <Card.Footer>
                    <Link to={`/workspaces/${item.metadata.name}`}>Edit</Link>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}

export default function WorkspaceList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.info("Fetching Data");
            try {
                const api = new ApiService();
                const result = await api.FetchWorkspaces();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.info(data);
    console.info(data.keys());

    return (
        <>
            <Link to={`workspaces/new`}>
                Add Workspace
            </Link>
            <Row xs={1} md={2} className="g-4">
                {data.map((value, idx) => (
                    <Col key={idx}>
                        <WorkspaceItem item={value} />
                    </Col>
                ))}
            </Row>
        </>
    )
}