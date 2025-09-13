import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SpinnnerFullPage from "./Components/SpinnerFullPage";

import { CitiesProvider } from "./contexts/CitiesProvider";
import { AuthProvider } from "./contexts/AuthProvider";

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from './pages/HomePage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './Pages/AppLayout'
import Login from './Pages/Login'

// const HomePage = lazy(() => import("./pages/Homepage"));
// const Product = lazy(() => import("./pages/Product"));
// const Pricing = lazy(() => import("./pages/Pricing"));
// const PageNotFound = lazy(() => import("./pages/PageNotFound"));
// const AppLayout = lazy(() => import("./pages/AppLayout"));
// const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
