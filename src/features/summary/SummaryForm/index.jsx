import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const termsColor = { color: 'blue' };
const label = (
    <div>
        I agree to <span style={termsColor}>Terms and Conditions</span>
    </div>
);

export default function SummaryForm() {
    const [checkbox, setCheckbox] = useState(false);

    return (
        <Form>
            <Form.Check
                inline
                onChange={e => setCheckbox(e.target.checked)}
                label={label}
                type="checkbox"
                value={checkbox}
            />
            <Button disabled={!checkbox} variant="primary">
                Confirm Order
            </Button>
        </Form>
    );
}
