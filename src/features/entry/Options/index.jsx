import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import ScoopOption from '../ScoopOption';
import ToppingOption from '../ToppingOption';
import client from '../../../api/client';

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);

    const getOptions = useCallback(async () => {
        const response = await client.get(optionType);
        try {
            setItems(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [optionType]);

    useEffect(() => {
        getOptions();
    }, [getOptions]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

    const optionItems = items.map(item => (
        <ItemComponent item={item} key={item.name} />
    ));

    return <Row>{optionItems}</Row>;
}

Options.propTypes = {
    optionType: PropTypes.string.isRequired
};
