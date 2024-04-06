import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import FormWizard from "react-form-wizard-component";
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import BindingNameFormItem from '../Form/FormItems/BindingNameFormItem';
import BindingUserNameFormItem from '../Form/FormItems/BindingUserNameFormItem';
import BindingExpiresFormItem from '../Form/FormItems/BindingExpiresFormItem';
import { ApiService } from '../../Api';


export default function WorkspaceBindingCreateWizard(){
    const navigate = useNavigate();

    const {workspaceId} = useParams();
    const item = {
        "apiVersion": "xlscsde.nhs.uk/v1",
        "kind": "AnalyticsWorkspaceBinding",
        "metadata" : {
            "name" : `binding-${uuidv4().replaceAll("-", "")}`,
            "namespace" : "jupyterhub"
        },
        "spec" : {
            "workspace" : workspaceId,
            "username" : "",
            "expires" : dayjs().toISOString().split("T")[0]
        }
    };

    const [binding, bindingUpdated] = useState(item);

    const handleComplete = async () => {
        const api = new ApiService();
        const result = await api.CreateWorkspaceBinding(binding)
        bindingUpdated(result);
        navigate(`/workspaces/${workspaceId}/bindings`);
    }

    const onChange = (e, item) => {
        console.info(item);
        bindingUpdated(item);
    }
    
    
    return (
        <FormWizard shape="circle" onComplete={handleComplete}>
            <FormWizard.TabContent title="Introduction" icon="ti-user">
                <p>This wizard will guide you through the process of creating a new Analytics Workspace Binding.</p>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Binding Name" icon="ti-settings">
                <BindingNameFormItem item={binding} onChange={onChange} />
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Username" icon="ti-settings">
                <BindingUserNameFormItem item={binding} onChange={onChange} />
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Expiry" icon="ti-settings">
                <BindingExpiresFormItem item={binding} onChange={onChange} />
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Review" icon="ti-check">
                <p>Binding: {binding.metadata.name}</p>
                <p>Workspace: {binding.spec.workspace}</p>
                <p>Username: {binding.spec.username}</p>
                <p>Expires: {binding.spec.expires}</p>
            </FormWizard.TabContent>
        </FormWizard>

    )
}