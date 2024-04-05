import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function DisplayNameFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        if(e.target.value === ""){
            console.warn(e.target.id + " is empty");
            setIsValid(false);
            onChange(e);
        }
        else {
            setIsValid(true);
            item.spec.displayName = e.target.value;
            onChange(e, item);
        }
    }
    return (
        <FormItem 
            formId={item.metadata.name}
            onChange={onValidate}
            isInvalid={!isValid}
            name="displayName" 
            title="Display Name" 
            description="This is the title of the workspace as displayed in JupyterHub. This should be a short title." 
            defaultValue={item.spec.displayName}/>
    );
}