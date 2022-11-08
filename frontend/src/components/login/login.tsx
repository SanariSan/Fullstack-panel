import { ErrorMessage, Formik } from 'formik';
import { object, string } from 'yup';
import type { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button, Form } from 'react-bootstrap';

type TLogin = {
  theme: string;
  onSubmit: (...args) => void;
};

const formSchema = object({
  username: string()
    .required('Username required')
    .min(6, 'Username too short')
    .max(28, 'Username too long!'),
  password: string()
    .required('Password required')
    .min(6, 'Password too short')
    .max(28, 'Password too long!'),
});

const LoginComponent: FC<TLogin> = ({ theme, onSubmit }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={formSchema}
    onSubmit={onSubmit}
  >
    <Container
      as={Form}
      onSubmit={onSubmit}
      className={'h-100 d-flex align-items-center justify-content-center'}
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              aria-label="username"
              placeholder="Enter username"
            />
            <Form.Text className="text-muted">We'll never share your name.</Form.Text>
          </Form.Group>
          <ErrorMessage name="username" component={'div'} />

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  </Formik>
);

export { LoginComponent };
