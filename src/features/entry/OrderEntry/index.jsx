import Options from '../Options';
import { useOrderDetails } from '../../../contexts/OrderDetails';

const headerStyle = { marginBottom: 20 };

export default function OrderEntry() {
    const [orderDetails] = useOrderDetails();
    return (
        <>
            <h1 style={headerStyle}>Design Your Sundae!</h1>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
        </>
    );
}
