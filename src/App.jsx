import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Product from './Pages/Product'
import HomePage from './Pages/HomePage'
import './App.css'
import Pricing from './Pages/Pricing'
import PageNotFount from './Pages/PageNotFount'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='*' element={<PageNotFount />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
