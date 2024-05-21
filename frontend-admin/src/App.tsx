import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddItem from './pages/AddItem'
import { checkUserLoggedIn, routes } from './routes';

interface PrivateRouteProps {
  element: React.ReactNode;
}

// Check user login chưa
function PrivateRoute({ element }: PrivateRouteProps) {
  return checkUserLoggedIn() ? element : <Navigate to={routes.login} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<PrivateRoute element={<Home />} />} />
        <Route path={routes.addItem} element={<PrivateRoute element={<AddItem />} />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
