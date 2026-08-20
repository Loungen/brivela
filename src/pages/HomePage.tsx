import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function HomePage() {
    return(
        <>
            <Helmet>
                <title>Brivela - Free Online Tools</title>
                <meta
                    name="description"
                    content="Free, simple and private online tools for everyday tasks. No account required."
                />

                <link
                    rel="canonical"
                    href="https://brivela.com/"
                />
            </Helmet>

            <main>
                <section className="mx-auto max-w-6xl px-4 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-medium text-gray-500">
                            Free online tools
                        </p>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                            Simple tools for everyday tasks.
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                            Fast, simple and private online tools. No account required.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Link
                            to="/image-compressor"
                            className="group rounded-2xl border border-gray-200 p-6 transition hover:border-gray-400 hover:shadow-sm"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg">
                                ↓
                            </div>

                            <h2 className="mt-5 text-lg font-semibold">
                                Image Compressor
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Reduce the file size of JPG, PNG and WebP images
                                directly in your browser.
                            </p>

                            <p className="mt-5 text-sm font-medium">
                                Compress images →
                            </p>
                        </Link>

                        <div className="rounded-2xl border border-dashed border-gray-200 p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-lg">
                                ↔
                            </div>

                            <h2 className="mt-5 text-lg font-semibold">
                                Image Resizer
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Resize images to exact dimensions.
                            </p>

                            <p className="mt-5 text-sm text-gray-400">
                                Coming soon
                            </p>
                        </div>

                        <div className="rounded-2xl border border-dashed border-gray-200 p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-lg">
                                ⇄
                            </div>

                            <h2 className="mt-5 text-lg font-semibold">
                                Image Converter
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Convert images between popular formats.
                            </p>

                            <p className="mt-5 text-sm text-gray-400">
                                Coming soon
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomePage