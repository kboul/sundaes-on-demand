import PropTypes from 'prop-types';
import { Col, Form } from 'react-bootstrap';

import client from '../../api/client';
import styles from './styles';

export default function ToppingOption({ item, updateItemCount }) {
    const handleChange = e => {
        updateItemCount(item.name, e.target.checked ? 1 : 0);
    };

    return (
        <Col xs={12} sm={6} md={3} lg={2} style={styles.colStyle}>
            <img
                alt={`${item.name} topping`}
                src={`${client.defaults.baseURL}/${item.imagePath}`}
                style={styles.imgStyle}
            />
            <Form>
                <Form.Group controlId={`${item.name}-topping-checkbox`}>
                    <Form.Check
                        type="checkbox"
                        label={item.name}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>
        </Col>
    );
}

ToppingOption.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        imagePath: PropTypes.string
    }).isRequired,
    updateItemCount: PropTypes.func.isRequired
};
