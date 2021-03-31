import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import AlertBanner from '../../../components/AlertBanner';
import ScoopOption from '../ScoopOption';
import ToppingOption from '../ToppingOption';
import client from '../../../api/client';

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

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

    const optionItems = items.map(item => (
        <ItemComponent item={item} key={item.name} />
    ));

    return <Row>{optionItems}</Row>;
}

Options.propTypes = {
    optionType: PropTypes.string.isRequired
};
