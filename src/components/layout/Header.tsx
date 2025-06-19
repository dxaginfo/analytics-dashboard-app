import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Badge
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Notifications as NotificationsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../features/auth/authSlice';
import { RootState } from '../../store';

interface HeaderProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Header = ({ drawerWidth, handleDrawerToggle }: HeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Analytics Dashboard
        </Typography>

        {/* Notifications */}
        <Box sx={{ mr: 2 }}>
          <Tooltip title="Notifications">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleNotificationsMenu}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            id="notifications-menu"
            anchorEl={notificationsAnchorEl}
            keepMounted
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleNotificationsClose}>New channel analytics available</MenuItem>
            <MenuItem onClick={handleNotificationsClose}>Content performance alert</MenuItem>
            <MenuItem onClick={handleNotificationsClose}>Audience shift detected</MenuItem>
          </Menu>
        </Box>

        {/* Settings */}
        <Box sx={{ mr: 2 }}>
          <Tooltip title="Settings">
            <IconButton size="large" color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* User Menu */}
        <Box>
          <Tooltip title="Account settings">
            <IconButton
              size="large"
              onClick={handleMenu}
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <Avatar alt={user?.name || 'User'} src={user?.photoURL || ''} />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;