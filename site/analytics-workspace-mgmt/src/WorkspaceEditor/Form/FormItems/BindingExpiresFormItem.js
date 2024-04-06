
import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function BindingExpiresFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        if(e.target.value === ""){
            console.warn(e.target.id + " is empty");
            setIsValid(false);
            onChange(e);
        }
        else {
            setIsValid(true);
            item.spec.expires = e.target.value;
            onChange(e, item);
        }
    }
    return (
        <FormItem 
            as="datepicker"
            formId={item.metadata.name}
            onChange={onValidate}
            isInvalid={!isValid}
            name="expires" 
            title="Expires" 
            description="The date that this workspace is no longer available to users." 
            defaultValue={item.spec.expires}/>
    );
}