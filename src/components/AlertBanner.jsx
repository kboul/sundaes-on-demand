import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { orderConfirmAlertMsg } from './constants';

const alertStyle = { backgroundColor: 'red' };

export default function AlertBanner({ message, variant = 'danger' }) {
    const alertMessage = message || orderConfirmAlertMsg;

    return (
        <Alert style={alertStyle} variant={variant}>
            {alertMessage}
        </Alert>
    );
}

AlertBanner.propTypes = {
    message: PropTypes.string,
    variant: PropTypes.string
};
