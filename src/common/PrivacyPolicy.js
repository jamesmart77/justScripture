import { Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy () {
  return (
    <section>
      <Row>
        <Col s={12}>
          <h1>Privacy Policy</h1>
          <p>
            The JustScripture application does not collect, share, or distribute any user or application data.
            {' '}
            <Link to="/justScripture">Return Home</Link>  
          </p>
        </Col>
      </Row>
    </section>
  );
};
