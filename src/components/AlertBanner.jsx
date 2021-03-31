import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const alertStyle = { backgroundColor: 'red' };

export default function AlertBanner({ message, variant = 'danger' }) {
    const alertMessage =
        message || 'An unexpected error occured. Please try again later.';

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
