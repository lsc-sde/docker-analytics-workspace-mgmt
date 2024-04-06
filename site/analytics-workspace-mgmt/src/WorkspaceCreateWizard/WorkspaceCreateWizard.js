import React, { useState } from 'react';
import FormWizard from "react-form-wizard-component";

import DisplayNameFormItem from "../WorkspaceEditor/Form/FormItems/DisplayNameFormItem.js"
import DescriptionFormItem from "../WorkspaceEditor/Form/FormItems/DescriptionFormItem.js"
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import AvailableFromFormItem from '../WorkspaceEditor/Form/FormItems/AvailableFromFormItem';
import ExpiresFormItem from '../WorkspaceEditor/Form/FormItems/ExpiresFormItem';
import JupyterImageFormItem from '../WorkspaceEditor/Form/FormItems/JupyterImageFormItem';
import { ApiService } from "../Api.js"
import { useNavigate } from "react-router-dom";

export default function WorkspaceCreateWizard(){
    let navigate = useNavigate();
    const item = {
        "apiVersion": "xlscsde.nhs.uk/v1",
        "kind": "AnalyticsWorkspace",
        "metadata" : {
            "name" : "",
            "namespace" : "jupyterhub"
        },
        "spec" : {
            "displayName" : "",
            "description" : "",
            "validity" : {
                "availableFrom" : "2020-01-01", 
                "expires" : "2020-01-01"
            },
            "jupyterWorkspace" : {
                "image" : "lscsde/datascience-notebook-default:0.1.0"
            }
        }
    };
    const [newItem, newItemChanged] = useState(item);
    const onChange = (e, newItem) => {
        console.info(newItem);
        if(!!newItem){
            newItemChanged(newItem);
        }
    }
    const translateName = (displayName) => {
        return displayName.toLowerCase().trim().replaceAll(" ", "-");
    };

    const handleComplete = async () => {
        console.log("Form completed!");
        const api = new ApiService();
        newItem.metadata.name = translateName(newItem.spec.displayName);
        const createdWorkspace = await api.CreateWorkspace(newItem);
        navigate(`/workspaces/${createdWorkspace.metadata.name}`);
    };
    
    return (
        <FormWizard shape="circle" onComplete={handleComplete}>
            <FormWizard.TabContent title="Introduction" icon="ti-user">
                <p>This wizard will guide you through the process of creating a new Analytics Workspace.</p>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Name" icon="ti-settings">
                <DisplayNameFormItem item={newItem} onChange={onChange} />
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Description" icon="ti-settings">
                <DescriptionFormItem item={newItem} onChange={onChange} />
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Validity" icon="ti-settings">
                <Row>
                    <Col sm={5}>
                        <AvailableFromFormItem item={newItem} onChange={onChange} />
                    </Col>
                    <Col sm={5}>
                        <ExpiresFormItem item={newItem} onChange={onChange} />
                    </Col>
                </Row>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Jupyter Image" icon="ti-settings">
                <JupyterImageFormItem item={newItem} onChange={onChange} />
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Review" icon="ti-check">
                <Row>
                    <Col sm={6}>
                        <h4>Short Name</h4>
                        {translateName(newItem.spec.displayName)}
                    </Col>
                    <Col sm={6}>
                        <h4>Display Name</h4>
                        {newItem.spec.displayName}
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <h4>Description</h4>
                        {newItem.spec.description}
                    </Col>
                </Row>
            </FormWizard.TabContent>
        </FormWizard>
    );
}