import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="border-b border-gray-200">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                <Link
                    to="/"
                    className="text-xl font-semibold tracking-tight"
                >
                    Brivela
                </Link>

                <nav>
                    <Link
                        to="/image-compressor"
                        className="text-sm text-gray-600 transition hover:text-gray-900"
                    >
                        Image Compressor
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header