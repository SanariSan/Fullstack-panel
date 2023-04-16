import classNames from 'classnames';
import type { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { changeRoute } from '../../containers/history-catcher';
import { useAppDispatch } from '../../hooks/redux';
import { logoutUserAsync } from '../../store';
import style from './dashboard.module.scss';
import type { TDashboard } from './dashboard.type';

const DashboardComponent: FC<TDashboard> = ({ theme }) => {
  const a = 1;
  // todo: don't do like that
  const dispatch = useAppDispatch();

  return (
    <Container
      fluid
      className={classNames(
        'overflow-scroll h-100 d-flex align-items-center justify-content-center',
        style[theme],
        style.containerScrollOverflow,
      )}
      // className={classNames('h-100 w-100 p-0', style[theme])}
    >
      <Row className={style.rowScrollOverflow}>
        <Col style={{ display: 'flex', flexDirection: 'row' }}>
          <h1>text</h1>
        </Col>
      </Row>
    </Container>
  );
};

export { DashboardComponent };
