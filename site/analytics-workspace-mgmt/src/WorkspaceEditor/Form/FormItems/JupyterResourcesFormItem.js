import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function JupyterResourcesFormItem({item, onChange}){
    
    console.info(item);
    const [isValid, setIsValid] = useState(true);
    const onValidate = (e) => {
        try {
            item.spec.jupyterWorkspace.resources = JSON.parse(e.target.value);
            setIsValid(true);
            onChange(e, item);
        }
        catch(ex){
            setIsValid(false);
            onChange(e);
        }
    }
    return (
        <FormItem 
            as="json"
            formId={item.metadata.name}
            onChange={onValidate}
            isInvalid={!isValid}
            name="jupyterResources" 
            title="Resources" 
            description="Resources Specification" 
            defaultValue={item.spec.jupyterWorkspace.resources}/>
    );
}