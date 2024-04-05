import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AvailableFromFormItem from './FormItems/AvailableFromFormItem.js';
import DescriptionFormItem from './FormItems/DescriptionFormItem.js';
import DisplayNameFormItem from './FormItems/DisplayNameFormItem.js';
import ExpiresFormItem from './FormItems/ExpiresFormItem.js';
import JupyterDefaultUriFormItem from './FormItems/JupyterDefaultUriFormItem.js'
import JupyterExtraLabelsFormItem from './FormItems/JupyterExtraLabelsFormItem.js'
import JupyterImageFormItem from './FormItems/JupyterImageFormItem.js'
import JupyterNodeSelectorFormItem from './FormItems/JupyterNodeSelectorFormItem.js'
import JupyterPersistentVolumeClaimFormItem from './FormItems/JupyterPersistentVolumeClaimFormItem.js'
import JupyterPersistentVolumeClaimStorageClass from './FormItems/JupyterPersistentVolumeClaimStorageClass.js'
import JupyterResourcesFormItem from './FormItems/JupyterResourcesFormItem.js'
import JupyterTolerationsFormItem from './FormItems/JupyterTolerationsFormItem.js'

export default function WorkspaceEditorForm({item, onChange}){
    const id = "form-" + item.metadata.name
    const tabsId = "tabs-" + item.metadata.name
    
    const generateChildId = (eventKey, type) => {
        return eventKey + "=" + type;
    }

    return (
        <Form id={id}>
            <Tab.Container id={tabsId} defaultActiveKey="basics" generateChildId={generateChildId}>
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="basics">Basics</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="jupyter">Jupyter Basics</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="jupyter-adv">Jupyter Advanced</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="basics" >
                                <DisplayNameFormItem item={item} onChange={onChange} />
                                <DescriptionFormItem item={item} onChange={onChange} />
                                <Row>
                                    <Col sm={5}>
                                        <AvailableFromFormItem item={item} onChange={onChange} />
                                    </Col>
                                    <Col sm={5}>
                                        <ExpiresFormItem item={item} onChange={onChange} />
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="jupyter">
                                <Row>
                                    <Col sm={5}>
                                        <JupyterImageFormItem item={item} onChange={onChange} />
                                        <JupyterPersistentVolumeClaimFormItem item={item} onChange={onChange} />
                                    </Col>
                                    <Col sm={5}>
                                        <JupyterDefaultUriFormItem item={item} onChange={onChange} />
                                        <JupyterPersistentVolumeClaimStorageClass item={item} onChange={onChange} />
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="jupyter-adv">
                                <JupyterResourcesFormItem item={item} onChange={onChange} />
                                <JupyterExtraLabelsFormItem item={item} onChange={onChange} />
                                <JupyterNodeSelectorFormItem item={item} onChange={onChange} />
                                <JupyterTolerationsFormItem item={item} onChange={onChange} />                               
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Form>
    );
}