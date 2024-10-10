import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>Home</Layout>} />
        <Route path="/search" element={<Layout>Search</Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App