import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function JupyterImageFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        if(e.target.value === ""){
            console.warn(e.target.id + " is empty");
            setIsValid(false);
        }
        else {
            setIsValid(true);
        }
        onChange(e);
    }
    return (
        <FormItem 
            formId={item.metadata.name}
            onChange={onValidate}
            isInvalid={!isValid}
            name="jupyterImage" 
            title="Image Name" 
            description="The container image used by this workspace" 
            defaultValue={item.spec.jupyterWorkspace.image}/>
    );
}