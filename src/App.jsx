import ResponsiveAppBar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router'
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Register from './pages/Register';

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
          <Route path='/register' element={<Register />}></Route>
        </Routes>
        </>
      </BrowserRouter>
      
  )
}

export default App
