import ResponsiveAppBar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router'
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';

const Cart = () => <h2>💳 عربة التسوق (قريباً)</h2>;
const NotFound = () => <h2>⚠️ الصفحة غير موجودة</h2>;
function App() {

  return (
    
    <BrowserRouter>
      <>
      <ResponsiveAppBar />
      
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </>
      </BrowserRouter>
      
  )
}

export default App
