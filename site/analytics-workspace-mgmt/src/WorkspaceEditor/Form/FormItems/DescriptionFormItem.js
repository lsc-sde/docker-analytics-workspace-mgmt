import React, { useState } from 'react';
import FormItem from "./FormItem.js";

export default function DescriptionFormItem({item,onChange}){
    const [isValid, setIsValid] = useState(true);

    const onValidate = (e) => {
        if(e.target.value === ""){
            console.warn(e.target.id + " is empty");
            setIsValid(false);
            onChange(e);
        }
        else {
            setIsValid(true);
            item.spec.description = e.target.value;
            onChange(e, item);
        }
    }
    
    return (
        <FormItem 
            formId={item.metadata.name}
            onChange={onValidate}
            isInvalid={!isValid}
            name="description" 
            title="Description" 
            description="This is the full description of the workspace, this can contain multiple lines of text." 
            as="textarea"
            defaultValue={item.spec.description}/>
    );
}
