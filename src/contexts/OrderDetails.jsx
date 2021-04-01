import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext();

export function useOrderDetails() {
    const context = useContext(OrderDetails);

    if (!context) {
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider'
        );
    }

    return context;
}

function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    Object.values(optionCounts[optionType]).forEach(count => {
        optionCount += count;
    });

    return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });

    const [totals, setTotals] = useState({
        scoops: 0,
        toppings: 0,
        grandTotal: 0
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
        const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: scoopsSubtotal,
            toppings: toppingsSubtotal,
            grandTotal
        });
    }, [optionCounts]);

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optiontype) {
            const newOptionCounts = { ...optionCounts };

            const optionCountsMap = optionCounts[optiontype];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        }
        return [{ ...optionCounts, totals }, updateItemCount];
    }, [optionCounts, totals]);

    return <OrderDetails.Provider value={value} {...props} />;
}
