// Organisms component

import { FC } from 'react';
import { Typography } from '@design-system/ui';

const AppHeader: FC = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4">
        <Typography variant="subtitle2">Design System</Typography>
      </div>
    </header>
  );
};

export default AppHeader;
