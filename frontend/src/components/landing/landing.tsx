import classNames from 'classnames';
import type { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { changeRoute } from '../../containers/history-catcher';
import style from './landing.module.scss';
import type { TLanding } from './landing.type';

const LandingComponent: FC<TLanding> = ({ theme }) => (
  <Container fluid className={classNames('h-100 d-flex align-items-start', style[theme])}>
    <Row className="w-100 mt-4">
      <Col xs={12} className="d-flex justify-content-end">
        <Button
          className="me-2"
          onClick={() => {
            changeRoute('/login');
          }}
        >
          login
        </Button>
        <Button
          className="ms-2 me-2"
          onClick={() => {
            changeRoute('/register');
          }}
        >
          register
        </Button>
        <Button
          className="ms-2"
          onClick={() => {
            changeRoute('/dashboard');
          }}
        >
          dashboard
        </Button>
      </Col>
    </Row>
  </Container>
);

export { LandingComponent };
