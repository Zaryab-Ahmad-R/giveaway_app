import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";
import Home from './pages/Home.jsx';
import Registration from './pages/Registration.jsx';
import ClaimPrize from './pages/ClaimPrize.jsx';
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { SpeedInsights } from "@vercel/speed-insights/react"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/registration',
    element: <Registration />
  },
  {
    path: '/claim',
    element: <ClaimPrize />
  },
  {
    path: '/admin-login',
    element: <AdminLogin />
  },
  {
    path: '/admin',
    element: <AdminDashboard />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <SpeedInsights/>
    <RouterProvider router={router} />
  </StrictMode>,
)
