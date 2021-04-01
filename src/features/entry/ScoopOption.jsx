import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';

import client from '../../api/client';
import styles from './styles';

const formGroupStyle = { marginTop: 10 };
const labelStyle = { textAlign: 'right' };
const colStyle = { textAlign: 'left' };

export default function ScoopOptions({ item, updateItemCount }) {
    const handleChange = e => {
        updateItemCount(item.name, e.target.value);
    };

    return (
        <Col xs={12} sm={6} md={3} lg={2} style={styles.colStyle}>
            <img
                alt={`${item.name} scoop`}
                src={`${client.defaults.baseURL}/${item.imagePath}`}
                style={styles.imgStyle}
            />
            <Form.Group
                as={Row}
                controlId={`${item.name}-count`}
                style={formGroupStyle}>
                <Form.Label column style={labelStyle} xs="6">
                    {item.name}
                </Form.Label>
                <Col style={colStyle} xs="5">
                    <Form.Control
                        defaultValue={0}
                        type="number"
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
}

ScoopOptions.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        imagePath: PropTypes.string
    }).isRequired,
    updateItemCount: PropTypes.func.isRequired
};
