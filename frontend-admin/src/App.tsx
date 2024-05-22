import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AddItem from './pages/AddItem';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Register from './pages/Register';
import Table from './pages/Table';
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
        <Route path={routes.home} element={<PrivateRoute element={<Menu />} />} />
        <Route path={routes.menu} element={<PrivateRoute element={<Menu />} />} />
        <Route path={routes.table} element={<PrivateRoute element={<Table />} />} />
        <Route path={routes.addItem} element={<PrivateRoute element={<AddItem />} />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
