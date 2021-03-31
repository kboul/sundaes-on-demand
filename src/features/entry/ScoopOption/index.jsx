import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

export default function ScoopOptions({ item }) {
    return (
        <Col xs={12} sm={6} md={3} lg={3} style={{ textAlign: 'center' }}>
            <img
                alt={`${item.name} scoop`}
                src={`http://localhost:3030/${item.imagePath}`}
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
