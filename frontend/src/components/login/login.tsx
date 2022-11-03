import { Formik } from 'formik';
import type { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

type TLogin = {
  theme: string;
  onSubmit: (...args) => void;
};

const LoginComponent: FC<TLogin> = ({ theme, onSubmit }) => (
  <Container as={'form'} className={'h-100 d-flex align-items-center justify-content-center'}>
    <Row className="w-100">
      <Col xs={12}>
        {/* <Formik
          initialValues={{ username: '', password: '' }}
          // validationSchema={formSchema}
          onSubmit={onSubmit}
        > */}
        <div>
          login fields etc
          <button onClick={onSubmit}>SEND</button>
        </div>
        {/* </Formik> */}
      </Col>
    </Row>
  </Container>
);

export { LoginComponent };
