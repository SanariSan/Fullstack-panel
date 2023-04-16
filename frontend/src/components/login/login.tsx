import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import classNames from 'classnames';
import { changeRoute } from '../../containers/history-catcher';
import type { TLogin } from './login.type';
import style from './login.module.scss';

const LoginComponent: FC<TLogin> = ({ theme, isLoading, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;

  return (
    <Container
      as={FormikForm}
      onSubmit={handleSubmit}
      className={classNames('h-100', 'd-flex', 'flex-column', 'align-items-center', style[theme])}
    >
      <Row className="w-100" style={{ height: '30%' }} />
      <Row className="w-100">
        <Col xs={0} md={3} xl={4}></Col>
        <Col xs={12} md={6} xl={4} className="d-flex flex-column justify-content-center">
          <h2 style={{ textAlign: 'center' }}>Log in</h2>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label className={style[theme]}>Username</Form.Label>
            <Form.Control
              as={Field}
              className="mb-1"
              isInvalid={touched.username !== undefined && errors.username !== undefined}
              type="text"
              name="username"
              aria-label="username"
              placeholder="Enter username"
            />
            <ErrorMessage name="username">
              {(errorMessage: string) => (
                <Form.Text className="ms-1 text-danger">{errorMessage}</Form.Text>
              )}
            </ErrorMessage>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              as={Field}
              className="mb-1"
              isInvalid={touched.password !== undefined && errors.password !== undefined}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password">
              {(errorMessage: string) => (
                <Form.Text className="ms-1 text-danger">{errorMessage}</Form.Text>
              )}
            </ErrorMessage>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCheckbox">
            <Form.Check as={Field} type="checkbox" name="checkbox1" label="Check to continue" />
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-center" controlId="formSubmit">
            <Button variant="primary" type="submit" className="me-1" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Log in'}
            </Button>
            <Button
              variant="secondary"
              type="button"
              className="ms-1"
              disabled={isLoading}
              onClick={() => {
                changeRoute('/register');
              }}
            >
              Sign up instead
            </Button>
          </Form.Group>
        </Col>
        <Col xs={0} md={3} xl={4}></Col>
      </Row>
    </Container>
  );
};

export { LoginComponent };
