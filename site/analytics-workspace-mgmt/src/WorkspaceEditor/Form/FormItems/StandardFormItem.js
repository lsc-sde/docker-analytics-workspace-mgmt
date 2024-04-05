import Form from 'react-bootstrap/Form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function StandardFormItem({id, defaultValue, as, onChange, isInvalid}){
    if(as === "datepicker"){
        const datepickerValueChanged = (value) => {
            const isoDate = value.toISOString().split('T')[0]
            const e = {
                target: {
                    id: id,
                    value: isoDate
                }
            };
            onChange(e);
        };
        return (
            <DatePicker id={id} format='YYYY-MM-DD' defaultValue={dayjs(defaultValue)} onChange={datepickerValueChanged} isInvalid={isInvalid} />
        );
    }
    else if(as === "json"){
        let updatedValue = "{}"; 
        
        if(defaultValue !== null && defaultValue !== undefined){
            updatedValue = JSON.stringify(defaultValue);
        }
        return (
            <Form.Control id={id} as="textarea" defaultValue={updatedValue} onChange={onChange} isInvalid={isInvalid} />
        );
    }
    else {
        return (
            <Form.Control id={id} as={as} defaultValue={defaultValue} onChange={onChange} isInvalid={isInvalid} />
        );
    }
}