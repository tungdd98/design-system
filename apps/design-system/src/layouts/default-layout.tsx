// Templates component

import React, { FC } from 'react';
import { Outlet } from 'react-router';
import AppHeader from '../components/app-header';
import AppFooter from '../components/app-footer';
import Sidebar from '../components/sidebar';

type DefaultLayoutProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ header, footer }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {header || <AppHeader />}
      <div className="flex-1 container mx-auto flex gap-4 py-4">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      {footer || <AppFooter />}
    </div>
  );
};

export default DefaultLayout;
