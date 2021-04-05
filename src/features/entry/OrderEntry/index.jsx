import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Options from '../Options';
import { useOrderDetails } from '../../../contexts/OrderDetails';
import { formatCurrency } from '../../../utils';

const headerStyle = { marginBottom: 20 };

export default function OrderEntry({ setOrderPhase }) {
    const [orderDetails] = useOrderDetails();
    return (
        <>
            <h1 style={headerStyle}>Design Your Sundae!</h1>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
            <Button
                disabled={orderDetails.totals.grandTotal === formatCurrency(0)}
                onClick={() => setOrderPhase('review')}>
                Order sundae!
            </Button>
        </>
    );
}

OrderEntry.propTypes = {
    setOrderPhase: PropTypes.func
};
