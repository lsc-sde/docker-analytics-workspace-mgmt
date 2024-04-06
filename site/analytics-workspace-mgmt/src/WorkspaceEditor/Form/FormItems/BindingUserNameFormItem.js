import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function BindingUserNameFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        if(e.target.value === ""){
            console.warn(e.target.id + " is empty");
            setIsValid(false);
            onChange(e);
        }
        else {
            setIsValid(true);
            item.spec.username = e.target.value;
            onChange(e, item);
        }
    }
    return (
        <FormItem 
            formId={item.metadata.name}
            onChange={onValidate}
            isInvalid={!isValid}
            name="bindingName" 
            title="Username" 
            description="The username to assign the binding to, this is usually the email address of the user." 
            defaultValue={item.spec.username}/>
    );
}