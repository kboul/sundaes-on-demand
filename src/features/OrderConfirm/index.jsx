import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import AlertBanner from '../../components/AlertBanner';
import { useOrderDetails } from '../../contexts/OrderDetails';
import client from '../../api/client';
import { loadingText, newOrderBtnLabel } from './constants';

const styles = { container: { textAlign: 'center' } };

export default function OrderConfirm({ setOrderPhase }) {
    const [, , resetOrder] = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(false);

    const order = async () => {
        try {
            const response = await client.post('/order');
            setOrderNumber(response.data.orderNumber);
        } catch (err) {
            setError(true);
        }
    };

    useEffect(() => {
        order();
    }, []);

    function handleClick() {
        // clear the order details
        resetOrder();

        // send back to order page
        setOrderPhase('inProgress');
    }

    if (error) return <AlertBanner />;
    if (orderNumber)
        return (
            <div style={styles.container}>
                <h1>Thank you!</h1>
                <p>Your order number is {orderNumber}</p>
                <Button onClick={handleClick}>{newOrderBtnLabel}</Button>
            </div>
        );
    return <div>{loadingText}</div>;
}

OrderConfirm.propTypes = {
    setOrderPhase: PropTypes.func.isRequired
};
