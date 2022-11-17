import type { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { changeRoute } from '../../containers/history-catcher';
import { useAppDispatch } from '../../hooks/redux';
import { logoutUserAsync } from '../../store';
import type { TDashboard } from './dashboard.type';

const DashboardComponent: FC<TDashboard> = ({ theme }) => {
  const a = 1;
  // todo: don't do like that
  const dispatch = useAppDispatch();

  return (
    <Container className={'h-100 d-flex align-items-center justify-content-center'}>
      <Row className="w-100">
        <Col xs={12} className="d-flex justify-content-center">
          <Button
            className="ms-2 me-2"
            onClick={() => {
              changeRoute('/login');
            }}
          >
            login page
          </Button>
          <Button
            className="ms-2 me-2"
            onClick={() => {
              changeRoute('/login');
            }}
          >
            register page
          </Button>
          <Button
            className="ms-2 me-2"
            onClick={() => {
              changeRoute('/');
            }}
          >
            main page
          </Button>
          <Button
            className="ms-2 me-2"
            onClick={() => {
              void dispatch(logoutUserAsync());
            }}
          >
            logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export { DashboardComponent };
