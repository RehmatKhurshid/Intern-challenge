import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Navbar from './components/navbar';
import CreatePost from './pages/createPost';
import UserDashboard from './pages/userDashboard'
import Profile from './pages/profile'
import AuthProvider from './context/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <AuthProvider >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
                     path="/userDashboard"
                     element={
                                   <ProtectedRoute>
                               <UserDashboard />
                                     </ProtectedRoute>
              }
            />
            <Route
              path="/createPost"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App;
