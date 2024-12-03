// Organisms component

import { FC } from 'react';
import { Typography } from '@design-system/ui';

const AppFooter: FC = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-4">
        <Typography>Footer</Typography>
      </div>
    </footer>
  );
};

export default AppFooter;
