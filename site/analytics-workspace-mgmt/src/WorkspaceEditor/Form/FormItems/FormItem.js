
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import StandardFormItem from './StandardFormItem.js';

export default function FormItem({formId, name, title, description, defaultValue, onChange, isInvalid, as = "input"}){
    const id = formId + "-" + name
    
    return (
        <Form.Group className="mb-3">
            <FormLabel>
                <OverlayTrigger
                    trigger="click"
                    key="right"
                    placement="right"
                    overlay={
                        <Popover>
                        <Popover.Header as="h3">{title}</Popover.Header>
                        <Popover.Body>
                            {description}
                        </Popover.Body>
                        </Popover>
                    }
                    >
                <Button variant="link">{title}</Button>
                </OverlayTrigger>
            </FormLabel>
            <StandardFormItem id={id} as={as} defaultValue={defaultValue} onChange={onChange} isInvalid={isInvalid} />
        </Form.Group>
    )
}