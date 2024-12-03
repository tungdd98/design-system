import { cn } from '@design-system/utils';
import { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router';

type SidebarLinkProps = NavLinkProps & {
  label: string;
};

// Molecules component
const SidebarLink: FC<SidebarLinkProps> = ({ label, ...props }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn('font-medium', isActive ? 'text-primary-600' : '')
      }
      {...props}
    >
      {label}
    </NavLink>
  );
};

// Organisms component
const Sidebar: FC = () => {
  return (
    <nav className="w-[300px] flex flex-col gap-2">
      <SidebarLink to="/" label="Home" />
      <SidebarLink to="/about-us" label="About Us" />
    </nav>
  );
};

export default Sidebar;
