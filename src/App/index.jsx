import { Container } from 'react-bootstrap';

import { OrderDetailsProvider } from '../contexts/OrderDetails';
import OrderEntry from '../features/entry/OrderEntry';

export default function App() {
    return (
        <Container>
            <OrderDetailsProvider>
                <OrderEntry />
            </OrderDetailsProvider>
        </Container>
    );
}
