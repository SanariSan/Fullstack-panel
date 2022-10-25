import type { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { changeRoute } from '../../containers/history-catcher';
import { useAppSelector } from '../../hooks/redux';
import { useScreenDetails } from '../../hooks/use-screen-details';
import { themeSelector } from '../../store';
import s from './landing.module.scss';

const LandingComponent: FC = () => {
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();

  const theme = useAppSelector(themeSelector);

  return (
    <Container className={'h-100 d-flex align-items-center justify-content-center'}>
      <Row className="w-100">
        <Col xs={12}>
          <pre className={s[theme]}>Current page size - {`${w} x ${h}`}</pre>
        </Col>
        <Col xs={6}></Col>
        <Col xs={2}>
          <Button
            onClick={() => {
              changeRoute('/login');
            }}
          >
            login
          </Button>
        </Col>
        <Col xs={2}>
          <Button
            onClick={() => {
              changeRoute('/register');
            }}
          >
            register
          </Button>
        </Col>
        <Col xs={2}>
          <Button
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
};

export { LandingComponent };
