import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function JupyterNodeSelectorFormItem({item,onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        try {
            item.spec.jupyterWorkspace.nodeSelector = JSON.parse(e.target.value);
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
            name="jupyterNodeSelector" 
            title="Node Selectors" 
            description="Node Selector Specification" 
            defaultValue={item.spec.jupyterWorkspace.nodeSelector}/>
    );
}