import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function JupyterExtraLabelsFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);
    const onValidate = (e) => {
        try {
            item.spec.jupyterWorkspace.extraLabels = JSON.parse(e.target.value);
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
            name="jupyterExtraLabels" 
            title="Extra Labels" 
            description="Extra Labels Specification" 
            defaultValue={item.spec.jupyterWorkspace.extraLabels}/>
    );
}
