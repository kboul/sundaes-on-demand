import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Options from '../Options';
import { useOrderDetails } from '../../../contexts/OrderDetails';
import { formatCurrency } from '../../../utils';
import { grandTotalText, orderBtnLabel } from './constants';

const headerStyle = { marginBottom: 20 };

export default function OrderEntry({ setOrderPhase }) {
    const [orderDetails] = useOrderDetails();

    const grandTotal = Number(orderDetails.totals.grandTotal);
    const disableOrderBtn = grandTotal === 0 || grandTotal < 0;

    return (
        <>
            <h1 style={headerStyle}>Design Your Sundae!</h1>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>
                {grandTotalText}
                {formatCurrency(orderDetails.totals.grandTotal)}
            </h2>
            <Button
                disabled={disableOrderBtn}
                onClick={() => setOrderPhase('review')}>
                {orderBtnLabel}
            </Button>
        </>
    );
}

OrderEntry.propTypes = {
    setOrderPhase: PropTypes.func
};
