import React from 'react';
import { LandingComponent } from '../../components/landing';
import { useAppSelector } from '../../hooks/redux';
import { themeSelector } from '../../store';

const LandingContainer: React.FC = () => {
  const theme = useAppSelector(themeSelector);

  return (
    <>
      <LandingComponent theme={theme} />;
    </>
  );
};

export { LandingContainer };
