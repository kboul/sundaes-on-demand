import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { formatCurrency } from '../utils';
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
    // eslint-disable-next-line no-restricted-syntax
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });

    const zeroCurrency = formatCurrency(0);

    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
        const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;

        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        });
    }, [optionCounts]);

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = { ...optionCounts };

            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        }

        function resetOrder() {
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map()
            });
        }

        return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
    }, [optionCounts, totals]);

    return <OrderDetails.Provider value={value} {...props} />;
}
