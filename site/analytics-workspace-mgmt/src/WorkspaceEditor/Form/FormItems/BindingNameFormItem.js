import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function BindingNameFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        if(e.target.value === ""){
            console.warn(e.target.id + " is empty");
            setIsValid(false);
            onChange(e);
        }
        else {
            setIsValid(true);
            item.metadata.name = e.target.value;
            onChange(e, item);
        }
    }
    return (
        <FormItem 
            formId={item.metadata.name}
            onChange={onValidate}
            isInvalid={!isValid}
            name="bindingName" 
            title="Binding Name" 
            description="This is the name of the resource in kubernetes control plane, must be contain only lowercase letters, numbers and dashes and must be unique." 
            defaultValue={item.metadata.name}/>
    );
}