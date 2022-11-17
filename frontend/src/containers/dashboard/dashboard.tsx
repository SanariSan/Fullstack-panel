import React from 'react';
import { DashboardComponent } from '../../components/dashboard';
import { useAppSelector } from '../../hooks/redux';
import { themeSelector } from '../../store';

const DashboardContainer: React.FC = () => {
  const theme = useAppSelector(themeSelector);

  return <DashboardComponent theme={theme} />;
};

export { DashboardContainer };
