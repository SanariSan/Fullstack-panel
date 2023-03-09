import React from 'react';
import { DashboardNavbarComponent } from '../../../components/dashboard';
import { useAppSelector } from '../../../hooks/redux';
import { themeSelector } from '../../../store';

const DashboardNavbarContainer: React.FC = () => {
  const theme = useAppSelector(themeSelector);

  return <DashboardNavbarComponent theme={theme} />;
};

export { DashboardNavbarContainer };
