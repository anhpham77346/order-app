import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Menu from './pages/Menu';
import Login from './pages/Login'
import Register from './pages/Register'
import AddItem from './pages/AddItem'
import { checkUserLoggedIn, routes } from './routes';
import Table from './pages/Table';

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
        <Route path={routes.home} element={<PrivateRoute element={<Table />} />} />
        <Route path={routes.talbe} element={<PrivateRoute element={<Table />} />} />
        <Route path={routes.menu} element={<PrivateRoute element={<Menu />} />} />
        <Route path={routes.addItem} element={<PrivateRoute element={<AddItem />} />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
