import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  SmartButton as ButtonIcon,
  TextFields as TypographyIcon,
  Input as InputIcon,
  CreditCard as CardIcon,
  LocalOffer as BadgeIcon,
  WebAsset as ModalIcon,
} from '@mui/icons-material';
import { Typography } from '@design-system/ui-components';

const drawerWidth = 280;

const menuItems = [
  { path: '/', label: 'Home', icon: <HomeIcon /> },
  { divider: true },
  { path: '/components/button', label: 'Button', icon: <ButtonIcon /> },
  { path: '/components/typography', label: 'Typography', icon: <TypographyIcon /> },
  { path: '/components/input', label: 'Input', icon: <InputIcon /> },
  { path: '/components/card', label: 'Card', icon: <CardIcon /> },
  { path: '/components/badge', label: 'Badge', icon: <BadgeIcon /> },
  { path: '/components/modal', label: 'Modal', icon: <ModalIcon /> },
];

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Design System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', py: 2 }}>
          <List>
            {menuItems.map((item, index) =>
              'divider' in item ? (
                <Divider key={index} sx={{ my: 1 }} />
              ) : (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={location.pathname === item.path}
                    sx={{
                      mx: 1,
                      borderRadius: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
