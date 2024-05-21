import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddItem from './pages/AddItem'
import { checkUserLoggedIn, routes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={checkUserLoggedIn() ? <Home /> : <Navigate to={routes.login} />} />
        <Route path={routes.addItem} element={checkUserLoggedIn() ? <AddItem /> : <Navigate to={routes.login} />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
