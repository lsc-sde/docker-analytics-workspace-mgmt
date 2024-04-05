import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function JupyterDefaultUriFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);
    const onValidate = (e) => {
        try {
            item.spec.jupyterWorkspace.defaultUri = e.target.value;
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
            name="jupyterDefaultUri" 
            title="Default URI" 
            description="The uri to redirect the user to once they are logged into this workspace. Defaults to jupyter if left empty" 
            defaultValue={item.spec.jupyterWorkspace.defaultUri}/>
    );
}
