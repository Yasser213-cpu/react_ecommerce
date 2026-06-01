import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cart';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading spinner
const dispatch =useDispatch()
  useEffect(() => {
    // Fetch products data from API
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false); // Turn off loading once data is fetched
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Render loading spinner while fetching data
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={50} thickness={4} />
      </Box>
    );
  }

  return (
    // Main container with padding to avoid navbar overlapping
    <Box sx={{ flexGrow: 1, pt: 5, pb: 5, px: { xs: 2, md: 4 } }}>
      
      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#1A2027' }}>
        Discover Our Products
      </Typography>

      {/* Responsive Grid System */}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 2, sm: 4, md: 3 }} style={{ display: 'flex' }}>
            
            {/* Product Card with hover animations and fixed height alignment */}
            <Card 
              component={Link}
              to={`/product/${product.id}`}
              sx={{ 
                position: 'relative', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between',
    width: '100%',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
    borderRadius: '12px',
    
    textDecoration: 'none !important', 
    '& *': { textDecoration: 'none' }, 
    
    color: 'inherit',       
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
      cursor: 'pointer'
                }
              }}
            >
              {/* Absolute positioned Box to overlay Stock Badge on top of the image */}
              <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 10 }}>
                {product.stock === 0 ? (
                  <Chip label="Out Of Stock" color="error" size="small" sx={{ fontWeight: 'bold' }} />
                ) : (
                  <Chip label="In Stock" color="success" size="small" sx={{ fontWeight: 'bold' }} />
                )}
              </Box>
              
              {/* Product Thumbnail Media */}
              <CardMedia
                component="img"
                alt={product.title}
                height="200"
                image={product.thumbnail}
                sx={{ objectFit: 'contain', bgcolor: '#fcfcfc', p: 2, borderBottom: '1px solid #f0f0f0' }}
              />
              
              {/* Card Content with flexGrow to ensure uniform height and ellipsis for long titles */}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="subtitle1" 
                  component="div" 
                  sx={{ 
                    fontWeight: '700', 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: '48px', // Fixed height for 2 lines of text
                    lineHeight: '24px'
                  }}
                >
                  {product.title}
                </Typography>

                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  ${product.price}
                </Typography>
              </CardContent>

              {/* Card Action Buttons */}
              <CardActions sx={{ p: 2, pt: 0 }}>

                <Button 
                  
                  size="medium" 
                  
                  variant="contained" 
                  
                  fullWidth 
                  
    // The Magic Line: Here we catch the click event 'e' and stop it from reaching the Card Link
                  onClick={(e) => {
                    dispatch(addToCart(product))
                    e.preventDefault()
                    e.stopPropagation()
                  }

                  }
                  sx={{ borderRadius: '8px', fontWeight: 'bold', textTransform: 'none',textDecoration:'none' }}
                  
  >
                  Add to Cart
                  
                </Button>
                
              </CardActions>

              
            </Card>

            
          </Grid>

        ))}

      </Grid>
      
    </Box>
  );
}