import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function AvailableFromFormItem({item, onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        if(e.target.value === ""){
            console.warn(e.target.id + " is empty");
            setIsValid(false);
            onChange(e);
        }
        else {
            setIsValid(true);
            item.spec.validity.availableFrom = e.target.value;
            onChange(e, item);
        }
    }
    return (
        <FormItem 
            as="datepicker"
            onChange={onValidate}
            isInvalid={!isValid}
            formId={item.metadata.name}
            name="availableFrom" 
            title="Available From" 
            description="The date that this workspace becomes available to users." 
            defaultValue={item.spec.validity.availableFrom}/>
    );
}