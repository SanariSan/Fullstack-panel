import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import type { TLogin } from './login.type';

const LoginComponent: FC<TLogin> = ({ theme, isLoading, onChangeRoute, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;

  return (
    <Container
      as={FormikForm}
      onSubmit={handleSubmit}
      className={'h-100 d-flex align-items-center justify-content-center'}
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="Header">
            <h2 style={{ textAlign: 'center' }}>Login</h2>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
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
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check as={Field} type="checkbox" name="checkbox1" label="Check to continue" />
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicSubmit">
            <Button variant="primary" type="submit" className="me-1" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
            <Button
              variant="secondary"
              type="button"
              className="ms-1"
              disabled={isLoading}
              onClick={onChangeRoute}
            >
              Register instead
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export { LoginComponent };
