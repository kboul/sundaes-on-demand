import PropTypes from 'prop-types';

import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../contexts/OrderDetails';
import { formatCurrency } from '../utils';

export default function OrderSummary({ setOrderPhase }) {
    const [orderDetails] = useOrderDetails();
    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {formatCurrency(orderDetails.totals.scoops)}</h2>
            {orderDetails.totals.toppings > 0 && (
                <h2>
                    Toppings: {formatCurrency(orderDetails.totals.toppings)}
                </h2>
            )}
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
}

OrderSummary.propTypes = {
    setOrderPhase: PropTypes.func
};
