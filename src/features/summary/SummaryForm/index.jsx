import { useState } from 'react';
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';

const termsColor = { color: 'blue', paddingLeft: 5 };
const popover = (
    <Popover>
        <Popover.Content>
            No ice cream will actually be delivered
        </Popover.Content>
    </Popover>
);
const label = (
    <>
        I agree to
        <OverlayTrigger placement="right" overlay={popover} transition={false}>
            <span style={termsColor} data-testid="terms">
                Terms and Conditions
            </span>
        </OverlayTrigger>
    </>
);

export default function SummaryForm() {
    const [checkbox, setCheckbox] = useState(false);

    return (
        <Form>
            <Form.Group controlId="checkbox">
                <Form.Check
                    inline
                    onChange={e => setCheckbox(e.target.checked)}
                    label={label}
                    type="checkbox"
                    value={checkbox}
                />
            </Form.Group>

            <Button disabled={!checkbox} variant="primary">
                Confirm Order
            </Button>
        </Form>
    );
}
