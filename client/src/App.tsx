import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>Home Page</Layout>} />
        <Route path="/search" element={<Layout>Search Page</Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App