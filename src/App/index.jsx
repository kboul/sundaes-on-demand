import Options from '../features/entry/Options';
import SummaryForm from '../features/summary/SummaryForm';

export default function App() {
    return (
        <>
            <SummaryForm />
            <Options optionType="toppings" />
            <Options optionType="scoops" />
        </>
    );
}
