import type { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { changeRoute } from '../../containers/history-catcher';
import s from './sample.module.scss';

type TSample = {
  theme: string;
};

const SampleComponent: FC<TSample> = ({ theme }) => (
  <Container className={'h-100 d-flex align-items-center justify-content-center'}>
    <Row className="w-100">
      <Col xs={12}>
        <Button
          onClick={() => {
            changeRoute('/login');
          }}
        >
          login
        </Button>
      </Col>
    </Row>
    <Row className="w-100">
      <Col xs={12}>
        <Button
          onClick={() => {
            changeRoute('/register');
          }}
        >
          register
        </Button>
      </Col>
    </Row>
  </Container>
);

export { SampleComponent };
