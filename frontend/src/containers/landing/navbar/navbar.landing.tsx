import React from 'react';
import { LandingNavbarComponent } from '../../../components/landing';
import { useAppSelector } from '../../../hooks/redux';
import { themeSelector } from '../../../store';

const LandingNavbarContainer: React.FC = () => {
  const theme = useAppSelector(themeSelector);

  return <LandingNavbarComponent theme={theme} />;
};

export { LandingNavbarContainer };
