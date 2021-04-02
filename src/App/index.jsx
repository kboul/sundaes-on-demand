import { useState } from 'react';
import { Container } from 'react-bootstrap';

import { OrderDetailsProvider } from '../contexts/OrderDetails';
import OrderEntry from '../features/entry/OrderEntry';
import OrderConfirm from '../features/OrderConfirm';
import OrderSummary from '../features/OrderSummary';

export default function App() {
    const [orderPhase, setOrderPhase] = useState('inProgress');

    let Component = OrderEntry;
    switch (orderPhase) {
        case 'inProgress':
            Component = OrderEntry;
            break;
        case 'review':
            Component = OrderSummary;
            break;
        case 'completed':
            Component = OrderConfirm;
            break;
        default:
            break;
    }

    return (
        <Container>
            <OrderDetailsProvider>
                <Component setOrderPhase={setOrderPhase} />
            </OrderDetailsProvider>
        </Container>
    );
}
