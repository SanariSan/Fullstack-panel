import React from 'react';
import { DashboardComponent } from '../../components/dashboard';
import { useAppSelector } from '../../hooks/redux';
import { themeSelector } from '../../store';
import { DashboardNavbarContainer } from './navbar';

const DashboardContainer: React.FC = () => {
  const theme = useAppSelector(themeSelector);

  return (
    <>
      <DashboardNavbarContainer />
      <DashboardComponent theme={theme} />
    </>
  );
};

export { DashboardContainer };
