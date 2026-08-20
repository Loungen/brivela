import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import ImageCompressorPage from "./pages/ImageCompressorPage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-900">
        <header />
        
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/image-compressor"
            element={<ImageCompressorPage />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App