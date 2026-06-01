import { Container, Typography, Box, IconButton, Button, Divider, Paper, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart,decrementQuantity,incrementQuantity } from '../store/slices/cart';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        Shopping Cart
      </Typography>

      {/* Cart Items List Wrapper */}
      <Box>
              {cartItems.map(item => (
                  <Paper key={item.id} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 3 }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={3} md={2}>
                <img src={item.thumbnail} alt={item.title} style={{ width: '100%', borderRadius: 8 }} />
              </Grid>
              
              <Grid item xs={9} md={4}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1" color="text.secondary">${item.price}</Typography>
              </Grid>

              <Grid item xs={6} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="outlined" size="small" onClick={() => dispatch(decrementQuantity(item.id))}>-</Button>
                <Typography sx={{ mx: 2, fontWeight: 'bold' }}>{item.quantity}</Typography>
                <Button variant="outlined" size="small" onClick={() => dispatch(incrementQuantity(item.id))}>+</Button>
              </Grid>

              <Grid item xs={6} md={3} sx={{ textAlign: 'right' }}>
                <IconButton color="error" onClick={() => dispatch(removeFromCart(item.id))}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
              )
                  
              ) }
              
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Cart Summary Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Total: ${totalPrice.toFixed(2)}
              </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.5 }}>
          Checkout
        </Button>
      </Box>
    </Container>
  );
}