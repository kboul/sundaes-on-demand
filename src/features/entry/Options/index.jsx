import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import AlertBanner from '../../../components/AlertBanner';
import ScoopOption from '../ScoopOption';
import ToppingOption from '../ToppingOption';
import client from '../../../api/client';
import { useOrderDetails } from '../../../contexts/OrderDetails';
import { formatCurrency } from '../../../utils';
import { pricePerItem } from '../../../constants';

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDetails, updateItemCount] = useOrderDetails();

    const getOptions = useCallback(async () => {
        try {
            const response = await client.get(`/${optionType}`);
            setItems(response.data);
        } catch (err) {
            setError(true);
        }
    }, [optionType]);

    useEffect(() => {
        getOptions();
    }, [getOptions]);

    if (error) return <AlertBanner />;

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const title =
        optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map(item => (
        <ItemComponent
            item={item}
            key={item.name}
            updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, optionType)
            }
        />
    ));

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>
                {title} total: {orderDetails.totals[optionType]}
            </p>
            <Row>{optionItems}</Row>
        </>
    );
}

Options.propTypes = {
    optionType: PropTypes.string.isRequired
};
