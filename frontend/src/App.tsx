import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import ProtectedRoute from "./components/protectedRoute"
import PublicRoute from "./components/publicRoute"
import SelectRole from "./pages/SelectRole"
import NavBar from "./components/navbar"
import Account from "./pages/Account"

const App = () => {
  return (
    <div className="text-red-500">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />  {/* add this */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div >
  )
}

export default App