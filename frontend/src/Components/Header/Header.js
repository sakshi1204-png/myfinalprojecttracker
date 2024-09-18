import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import {useLogout} from "../../hook/useLogout";
import { useNavigate } from 'react-router-dom';
import avatar from '../../img/avatar.png'; // Import the avatar image

function Header({ isLoggedIn, setIsLoggedIn }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [active, setActive] = useState(null); // State to track active menu item
    const navigate = useNavigate();
    const {logout} = useLogout();


    const handleClick = () => {
        logout();
      };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = (id) => {
        setActive(id);
        handleCloseNavMenu(); // Close the menu after selection
    };

    const toProfile = (setting) => {
        if (setting === "Profile") {
            navigate("/profile"); // Change this to the actual profile route if it exists
        } else if (setting === "Logout") {
            // Clear authentication state (e.g., remove token, reset user context)
            setIsLoggedIn(false); // Update state to reflect logout
            navigate('/login'); // Navigate to login page
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ffffff', backdropFilter: 'blur(4.5px)' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#000000' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#000000', // Text color in the AppBar
                            textDecoration: 'none',
                        }}
                    >
                        Expense Tracker
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon sx={{ color: '#000000' }} /> {/* MenuIcon color */}
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' }, bgcolor: '#ffffff' }} // Background color for menu
                    >
                        <MenuItem
                            onClick={() => navigate('/')}
                            sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                        >
                            <Typography sx={{ ml: 1, color: '#000000' }}>Home</Typography> {/* Text color */}
                        </MenuItem>
                    </Menu>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate('/dashboard')} sx={{ color: '#000000' }}>
                        <Typography sx={{ ml: 1, color: '#000000' }}>
                            Dashboard
                        </Typography>
                    </IconButton>
                    <IconButton onClick={() => navigate('/income')} sx={{ color: '#000000' }}>
                        <Typography sx={{ ml: 1, color: '#000000' }}>
                            Income
                        </Typography>
                    </IconButton>
                    <IconButton onClick={() => navigate('/expense')} sx={{ color: '#000000' }}>
                        <Typography sx={{ ml: 1, color: '#000000' }}>
                            Expense
                        </Typography>
                    </IconButton>
                    <IconButton onClick={() => navigate('/summary')} sx={{ color: '#000000' }}>
                        <Typography sx={{ ml: 1, color: '#000000' }}>
                            Summary
                        </Typography>
                    </IconButton>
                    <IconButton onClick={() => navigate('/help')} sx={{ color: '#000000' }}>
                        <Typography sx={{ ml: 1, color: '#000000' }}>
                            Help
                        </Typography>
                    </IconButton>
                </Box>
{/* 
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="User Avatar" src={avatar} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {['Profile', 'Logout'].map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography onClick={() => toProfile(setting)} sx={{ color: '#000000' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box> */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

<button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
Log out
</button>


</Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
