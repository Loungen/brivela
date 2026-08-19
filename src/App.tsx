import ImageCompressorPage from "./pages/ImageCompressorPage"

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold">
            Brivela
          </div>

          <nav>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Tools
            </a>
          </nav>
        </div>
      </header>

      <ImageCompressorPage />
    </div>
  )
}

export default App