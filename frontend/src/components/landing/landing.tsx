import classNames from 'classnames';
import type { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import style from './landing.module.scss';
import type { TLanding } from './landing.type';

const LandingComponent: FC<TLanding> = ({ theme }) => (
  // const [d, setD] = useState();

  <Container
    fluid
    className={classNames('h-100 d-flex align-items-center justify-content-center', style[theme])}
  >
    <Row className="w-100 mt-4">
      <Col xs={12} className="d-flex justify-content-center"></Col>
    </Row>
  </Container>
);
export { LandingComponent };
