import * as React from 'react';
import { Link } from 'react-router'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'; // ضفنا الـ IconButton
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // الأيقونة الجديدة
import Badge from '@mui/material/Badge'; 
import { useSelector } from 'react-redux';

const pages = ['Products', 'Cart'];

function ResponsiveAppBar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="static">
      <Box sx={{ px: 2 }}> 
        <Toolbar disableGutters>
          <Typography variant="h6" component={Link} to="/" sx={{ mr: 4, fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>
            E-SHOP
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={page === 'Products' ? '/' : `/${page.toLowerCase()}`}
                sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}
              >
                {page === 'Cart' ? (
                  <Badge badgeContent={totalItems} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  page.toUpperCase()
                )}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton component={Link} to="/register" color="inherit">
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default ResponsiveAppBar;