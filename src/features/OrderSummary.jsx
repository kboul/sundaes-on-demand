import PropTypes from 'prop-types';

import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../contexts/OrderDetails';

export default function OrderSummary({ setOrderPhase }) {
    const [orderDetails] = useOrderDetails();
    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {orderDetails.totals.scoops}</h2>

            <h2>Toppings: {orderDetails.totals.toppings}</h2>

            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
}

OrderSummary.propTypes = {
    setOrderPhase: PropTypes.func
};
