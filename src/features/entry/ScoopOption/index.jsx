import PropTypes from 'prop-types';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import client from '../../../api/client';
import sharedStyles from '../styles';

const styles = {
    alertMessage: { color: 'white' },
    formGroupStyle: { marginTop: 10 },
    labelStyle: { textAlign: 'right' }
};

export default function ScoopOptions({ item, updateItemCount }) {
    const [isInvalid, setIsInvalid] = useState(false);

    const handleChange = e => {
        const newValue = e.target.value;
        updateItemCount(item.name, newValue);

        setIsInvalid(Number(newValue) < 0);
    };

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={sharedStyles.colStyle}>
            <img
                alt={`${item.name} scoop`}
                src={`${client.defaults.baseURL}/${item.imagePath}`}
                style={sharedStyles.imgStyle}
            />
            <Form.Group
                as={Row}
                controlId={`${item.name}-count`}
                style={styles.formGroupStyle}>
                <Form.Label column style={styles.labelStyle} xs="6">
                    {item.name}
                </Form.Label>
                <Col xs="5">
                    <Form.Control
                        defaultValue={0}
                        isInvalid={isInvalid}
                        type="number"
                        onChange={handleChange}
                    />
                    {isInvalid && (
                        <Form.Control.Feedback type="invalid">
                            <span style={styles.alertMessage}>
                                Please provide a number above zero.
                            </span>
                        </Form.Control.Feedback>
                    )}
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
