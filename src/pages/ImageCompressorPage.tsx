import { useState } from 'react'
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
    
    const handleimageSelected = async (file: File) => {
        setSelectedFile(file)
        setResult(null)
        setError(null)
        setIsCompressing(true)

        try {
            const compressionResult = await compressImage(file, 0.75)

            setResult(compressionResult)
        } catch {
            setError('Could not compress this image.')
        } finally {
            setIsCompressing(false)
        }
    }


    return(
        <main>
            <h1>Image Compressor</h1>

            <p>
                Compress your image directly in your browser.
            </p>

            <ImageUploader onImageSelected={handleimageSelected} />

            {selectedFile && (
                <p>
                    Selected: {selectedFile.name}
                </p>
            )}

            {isCompressing && (
                <p>Compressing...</p>
            )}
            
            {error && (
                <p>{error}</p>
            )}

            {result && (
                <div>
                    <p>Original: {formatBytes(result.originalSize)}</p>
                    <p>Compressed: {formatBytes(result.compressedSize)}</p>
                </div>
            )}
        </main>
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

export default ImageCompressorPage