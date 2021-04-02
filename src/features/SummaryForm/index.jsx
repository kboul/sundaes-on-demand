import { useState } from 'react';
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
        <OverlayTrigger placement="right" overlay={popover}>
            <span style={termsColor} data-testid="terms">
                Terms and Conditions
            </span>
        </OverlayTrigger>
    </>
);

export default function SummaryForm({ setOrderPhase }) {
    const [checkbox, setCheckbox] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        setOrderPhase('completed');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="checkbox">
                <Form.Check
                    inline
                    label={label}
                    onChange={e => setCheckbox(e.target.checked)}
                    type="checkbox"
                    value={checkbox}
                />
            </Form.Group>

            <Button disabled={!checkbox} type="submit" variant="primary">
                Confirm Order
            </Button>
        </Form>
    );
}

SummaryForm.propTypes = {
    setOrderPhase: PropTypes.func
};
