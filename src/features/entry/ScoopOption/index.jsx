import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import client from '../../../api/client';

const colStyle = { textAlign: 'center' };

export default function ScoopOptions({ item }) {
    return (
        <Col xs={12} sm={6} md={3} lg={3} style={colStyle}>
            <img
                alt={`${item.name} scoop`}
                src={`${client.defaults.baseURL}/${item.imagePath}`}
                style={{ width: '75%' }}
            />
        </Col>
    );
}

ScoopOptions.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        imagePath: PropTypes.string
    }).isRequired
};
