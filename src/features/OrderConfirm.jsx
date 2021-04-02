import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { useOrderDetails } from '../contexts/OrderDetails';
import client from '../api/client';

const styles = { container: { textAlign: 'center' } };

export default function OrderConfirm({ setOrderPhase }) {
    const [, , resetOrder] = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);

    const order = async () => {
        try {
            const response = await client.post('/order');
            setOrderNumber(response.data.orderNumber);
        } catch (error) {
            console.log(error);
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

    if (orderNumber)
        return (
            <div style={styles.container}>
                <h1>Thank you!</h1>
                <p>Your order number is {orderNumber}</p>
                <Button onClick={handleClick}>Create new order</Button>
            </div>
        );
    return <div>Loading...</div>;
}

OrderConfirm.propTypes = {
    setOrderPhase: PropTypes.func.isRequired
};
