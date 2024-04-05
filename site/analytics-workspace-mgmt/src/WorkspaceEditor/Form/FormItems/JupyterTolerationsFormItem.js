import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function JupyterTolerationsFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        try {
            item.spec.jupyterWorkspace.tolerations = JSON.parse(e.target.value);
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
            name="jupyterTolerations" 
            title="Tolerations" 
            description="Tolerations Specification" 
            defaultValue={item.spec.jupyterWorkspace.tolerations}/>
    );
}