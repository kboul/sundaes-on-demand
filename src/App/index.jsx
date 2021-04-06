import { useState } from 'react';
import { Container } from 'react-bootstrap';

import { OrderDetailsProvider } from '../contexts/OrderDetails';
import OrderEntry from '../features/entry/OrderEntry';
import OrderConfirm from '../features/OrderConfirm';
import OrderSummary from '../features/OrderSummary';

export default function App() {
    const [orderPhase, setOrderPhase] = useState('inProgress');

    const Component =
        orderPhase === 'inProgress'
            ? OrderEntry
            : orderPhase === 'review'
            ? OrderSummary
            : OrderConfirm;

    return (
        <Container>
            <OrderDetailsProvider>
                <Component setOrderPhase={setOrderPhase} />
            </OrderDetailsProvider>
        </Container>
    );
}
