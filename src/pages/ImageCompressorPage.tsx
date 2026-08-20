import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ImageUploader from '../components/ImageUploader'
import {
    compressImage,
    type CompressionResult,
} from '../services/imageCompressor'

function ImageCompressorPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [result, setResult] = useState<CompressionResult | null>(null)
    const [isCompressing, setIsCompressing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const [quality, setQuality] = useState(75)

    const handleimageSelected = async (file: File) => {
        setSelectedFile(file)
        setResult(null)
        setError(null)
        setIsCompressing(true)

        try {
            const compressionResult = await compressImage(
                file, 
                quality / 100,
            )

            setResult(compressionResult)
        } catch {
            setError('Could not compress this image.')
        } finally {
            setIsCompressing(false)
        }
    }

    const handleDownload = () => {
        if (!result || !selectedFile) {
            return
        }

        const url = URL.createObjectURL(result.blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `brivela-${selectedFile.name.replace(/\.[^/.]+$/, '')}.jpg`

        link.click()

        URL.revokeObjectURL(url)
    }

    const handleCompress = async () => {
        if (!selectedFile) {
            return
        }

        setResult(null)
        setError(null)
        setIsCompressing(true)

        try {
            const compressionResult = await compressImage(
                selectedFile,
                quality / 100,
            )

            setResult(compressionResult)
        } catch {
            setError('Could not compress this image.')
        } finally {
            setIsCompressing(false)
        }
    }

    return(
        <>
            <Helmet>
                <title>
                    Free Image Compressor - Compress JPG, PNG & WebP | Brivela
                </title>

                <meta
                    name="description"
                    content="Compress JPG, PNG and WebP images online for free. Reduce image file size directly in your browser without uploading your files."
                />

                <link
                    rel="canonical"
                    href="https://brivela.com/image-compressor"
                />
            </Helmet>

            <main>
                <section className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-16">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Compress Images
                    </h1>

                    <p className="mx-auto mt-4 max-2-2xl text-lg text-gray-600">
                        Reduce image files size without uploading your files.
                    </p>

                    <div className="mt-10">
                        <ImageUploader onImageSelected={handleimageSelected} />
                    </div>

                    {selectedFile && (
                        <div className="mx-auto mt-8 max-w-xl rounded-xl border border-gray-200 p-6 text-left">
                            <p className="font-medium">
                                {selectedFile.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {formatBytes(selectedFile.size)}
                            </p>

                            <div className="mt-6">
                                <div className="flex justify-between text-sm">
                                    <label htmlFor="quality">
                                        Quality
                                    </label>

                                    <span>{quality}%</span>
                                </div>

                                <input
                                    id="quality"
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={quality}
                                    onChange={(event) => {
                                        setQuality(Number(event.target.value))
                                    }}
                                    className="mt-3 w-full"
                                />
                            </div>

                            <button
                                onClick={handleCompress}
                                disabled={isCompressing}
                                className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isCompressing ? 'Compressing...' : 'Compress image'}
                            </button>
                        </div>
                    )}

                    {error && (
                        <p className="mt-4 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {result && (
                        <div className="mx-auto mt-8 max-w-xl rounded-xl border border-gray-200 p-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Original
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {formatBytes(result.originalSize)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Compressed
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {formatBytes(result.compressedSize)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Saved
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {calculateSavings(
                                            result.originalSize,
                                            result.compressedSize,
                                        ).toFixed(1)}%
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="mt-6 w-full rounded-lg border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50"
                            >
                                Download Image
                            </button>
                        </div>
                    )}
                
                    <p className="mt-8 text-sm text-gray-500">
                        🔒 Your files never leave your device.
                    </p>

                    <section className="mx-auto mt-20 max-w-3xl text-left">
                        <h2 className="text-2xl font-semibold">
                            How to compress an image
                        </h2>

                        <div className="mt-8 grid gap-8 sm:grid-cols-3">
                            <div>
                                <h3 className="font-medium">
                                    1. Choose an image
                                </h3>

                                <p className="mt-2 text-sm leading-6 tdext-gray-600">
                                    Select a JPG, PNG, or WebP image from your device.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium">
                                    2. Choose the quality
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    Adjust the compression quality to find the right
                                    balance between file size and image quality.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium">
                                    3. Download
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    Download your compressed image instantly
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="mx-auto mt-16 max-w-3xl rounded-2xl border border-gray-200 p-6 text-left">
                        <h2 className="text-xl font-semibold">
                            Your images stay on your device
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Brivela compresses images directly in your browser.
                            Your files do not need to be uploaded to a server, 
                            which means your images remain on your device while
                            you use the compressor.
                        </p>
                    </section>
                </section>
            </main>
        </>
    )
}

function formatBytes(bytes: number): string {
    if (bytes == 0) {
        return '0 Bytes'
    }

    const units = ['Bytes', 'KB', 'MB', 'GB']
    const index = Math. floor(Math.log(bytes) / Math.log(1024))

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`
}

function calculateSavings(original: number, compressed: number): number {
    if (original === 0) {
        return 0
    }

    return ((original - compressed) / original) * 100
}

export default ImageCompressorPage