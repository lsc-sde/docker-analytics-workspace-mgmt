import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function JupyterPersistentVolumeClaimFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);
    const onValidate = (e) => {
        try {
            item.spec.jupyterWorkspace.persistentVolumeClaim.name = e.target.value;
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
            formId={item.metadata.name}
            onChange={onValidate}
            isInvalid={!isValid}
            name="jupyterPvc" 
            title="Persistent Volume Claim" 
            description="The name of the persistent volume claim to provision (auto generates if not provided)" 
            defaultValue={item.spec.jupyterWorkspace.persistentVolumeClaim.name}/>
    );
}
