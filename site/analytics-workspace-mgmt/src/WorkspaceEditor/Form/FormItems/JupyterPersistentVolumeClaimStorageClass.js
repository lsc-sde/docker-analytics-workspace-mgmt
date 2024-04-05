import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function JupyterPersistentVolumeClaimStorageClass({item, onChange}){
    const [isValid, setIsValid] = useState(true);
    const onValidate = (e) => {
        try {
            item.spec.jupyterWorkspace.persistentVolumeClaim.storageClassName = e.target.value;
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
            name="jupyterPvcStorageClass" 
            title="Persistent Volume Claim Storage Class" 
            description="The name of the storage class to create the persistent volume claim.

            If not populated, it will default to the system default
            
            This is only applied when a PVC is initially created, it is ignored otherwise." 
            defaultValue={item.spec.jupyterWorkspace.persistentVolumeClaim.storageClassName}/>
    );
}