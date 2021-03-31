import PropTypes from 'prop-types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import ScoopOption from '../ScoopOption';

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);

    const getOptions = useCallback(async () => {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        try {
            setItems(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [optionType]);

    useEffect(() => {
        getOptions();
    }, [getOptions]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

    const optionItems = items.map(item => (
        <ItemComponent item={item} key={item.name} />
    ));

    return <Row>{optionItems}</Row>;
}

Options.propTypes = {
    optionType: PropTypes.string.isRequired
};
