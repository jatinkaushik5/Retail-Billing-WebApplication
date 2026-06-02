import React from 'react'
import Login from './Pages/Login'
import Dashboard from './Pages/DashBoard/Dashboard'
import View from './Pages/View'
import { Navigate, Route,Routes, useNavigate } from 'react-router-dom'
import Users from './Pages/User/Users'
import { Toaster } from 'react-hot-toast'
import Inventory from './Pages/Inventory/Inventory'
import Billing from './Pages/Billing/Billing'
import Invoice from './Pages/Billing/Invoice'
import { jwtDecode } from "jwt-decode";


const App = () => {

  const token=localStorage.getItem("token")
  const roles=localStorage.getItem("roles")

   function isLoggedIN(element){
    if(token){
     return  <Navigate to={'/view'}/>
    }
    else{
      return element
    }
  }


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);

    // Token expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/" />;
    }

    return children;

  } catch (error) {
    // Invalid token
    localStorage.clear();
    return <Navigate to="/" />; 
  }
};


  const AdminRoute = ({ children }) => {
  const roles = localStorage.getItem("roles") || "";

  if (!roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/view" />;
  }

  return children;
};
  return (
    <>


    
    <div><Toaster/></div>

    {/* <Invoice/> */}

    <Routes>
      <Route  path={'/'} element={isLoggedIN(<Login/>)}/>
      <Route path='/view'   element={ <ProtectedRoute><View/></ProtectedRoute>}>
      <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path='dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path='users' element={<ProtectedRoute><AdminRoute><Users/></AdminRoute></ProtectedRoute>} />
      <Route path='inventory' element={<ProtectedRoute><AdminRoute><Inventory/></AdminRoute></ProtectedRoute>} />
      <Route path='billing' element={<ProtectedRoute><Billing/></ProtectedRoute>}/>
      </Route>
      <Route path='invoice' element={<ProtectedRoute><Invoice/></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/view" replace />} />
    </Routes>
    </>
  )
}

export default App