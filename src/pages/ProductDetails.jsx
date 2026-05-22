import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
// Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
// Material UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProductDetails() {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data from API on component mount
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // 1. Loading Screen: Centered using Box Flexbox layout
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={50} thickness={4} />
      </Box>
    );
  }

  // 2. Error Screen: If product data is missing
  if (!product) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Product not found!</Typography>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    // MAIN WRAPPER BOX: Defines padding and full viewport background
    <Box sx={{ p: { xs: 2, md: 6 }, pt: 5, bgcolor: '#fafafa', minHeight: '100vh' }}>
      
      {/* Back Button Box */}
      <Box sx={{ mb: 4 }}>
        <Button 
          component={Link} 
          to="/" 
          startIcon={<ArrowBackIcon />} 
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          Back to Products
        </Button>
      </Box>

      {/* TWO COLUMNS CONTAINER BOX: Flex direction switches from column (mobile) to row (desktop) */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: { xs: 4, md: 8 },
          alignItems: 'flex-start'
        }}
      >
        
        {/* LEFT COLUMN BOX: Product Image Container */}
        <Box sx={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box 
            component="img" // Turning the Box into an HTML <img> element
            src={product.images[0] || product.thumbnail}
            alt={product.title}
            sx={{
              width: '100%',
              maxWidth: '500px',
              maxHeight: '450px',
              objectFit: 'contain',
              bgcolor: 'white',
              borderRadius: '24px',
              p: 3,
              boxShadow: '0px 10px 30px rgba(0,0,0,0.06)'
            }}
          />
        </Box>

        {/* RIGHT COLUMN BOX: Product Information Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          
          {/* Category & Title */}
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold', letterSpacing: 1.5 }}>
              {product.category.toUpperCase()}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1A2027', fontSize: { xs: '2rem', md: '3rem' } }}>
              {product.title}
            </Typography>
          </Box>

          {/* Rating Box */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ fontWeight: '600', color: 'text.secondary' }}>
              {product.rating} / 5
            </Typography>
          </Box>

          {/* Price & Stock Badges Box */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, my: 1 }}>
            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
              ${product.price}
            </Typography>
            {product.stock === 0 ? (
              <Chip label="Out Of Stock" color="error" sx={{ fontWeight: 'bold' }} />
            ) : (
              <Chip label={`In Stock (${product.stock} available)`} color="success" sx={{ fontWeight: 'bold' }} />
            )}
          </Box>

          {/* Divider Line */}
          <Divider sx={{ my: 1 }} />

          {/* Product Description Box */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: '1.7' }}>
              {product.description}
            </Typography>
          </Box>

          {/* Add to Cart Action Box */}
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{ 
                py: 1.8, 
                borderRadius: '12px', 
                fontWeight: 'bold', 
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0px 4px 14px rgba(25, 118, 210, 0.4)'
              }}
            >
              Add To Shopping Cart
            </Button>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}