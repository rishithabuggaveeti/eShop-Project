import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Header from './common/header/Header';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import Products from './components/products/Products';
import Product from './components/products/product/Product';
import { useEffect } from 'react';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import HorizontalLinearStepper from './components/OrderPage/OrderPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' exact element={<SignIn/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Products' element={<Products/>}/>
        <Route path='/Products/:id' element={<Product/>}/>
        <Route path='/productDetailPage/:id' element={<ProductDetailPage/>}/>
        <Route path='/OrderPage/:id' element={<HorizontalLinearStepper/>}/>
      </Routes>
    </div>
  );
}

export default App;
