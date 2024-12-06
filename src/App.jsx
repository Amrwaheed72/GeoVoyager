import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './Pages/AppLayout'
import Login from './Pages/Login'
import CityList from './Components/CityList'
import CountryList from './Components/CountryList'
import City from './Components/City'
import Form from './Components/Form'
import { CitiesProvider } from './contexts/CitiesProvider'
import { useState } from 'react'

function App() {

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>

  )

}





export default App


