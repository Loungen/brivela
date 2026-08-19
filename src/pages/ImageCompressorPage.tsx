import { useState } from 'react'
import ImageUploader from '../components/ImageUploader'

function ImageCompressorPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    return(
        <main>
            <h1>Image Compressor</h1>

            <p>
                Compress your image directly in your browser.
            </p>

            <ImageUploader onImageSelected={setSelectedFile} />

            {selectedFile && (
                <p>
                    Selected: {selectedFile.name}
                </p>
            )}
        </main>
    )
}

export default ImageCompressorPage