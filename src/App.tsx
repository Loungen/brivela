import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ImageCompressorPage from "./pages/ImageCompressorPage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-900">
        <header className="border-b border-gray-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <a
              href="/"
              className="text-xl font-semibold"
            >
              Brivela
            </a>

            <nav>
              <a
                href="/image-compressor"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Image Compressor
              </a>
            </nav>
          </div>
        </header>
        
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/image-compressor"
                replace
              />
            }
          />

          <Route
            path="/image-compressor"
            element={<ImageCompressorPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App