import { useRef, useState } from 'react'

interface ImageUploaderProps {
    onImageSelected: (file: File) => void
}

const supportedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
]

function ImageUploader({ onImageSelected }: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const validateFile = (file: File): boolean => {
        if (!supportedTypes.includes(file.type)) {
            setError('Please select a JPG, PNG, or WebP Image.')
            return false
        }

        setError(null)
        return true
    }

    const handleFile = (file: File) => {
        if (validateFile(file)) {
            onImageSelected(file)
        }
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0]

        if (file) {
            handleFile(file)
        }
    }

    const handleDragOver = (
        event: React.DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (
        event: React.DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault()
        setIsDragging(false)

        const file = event.dataTransfer.files[0]

        if (file) {
            handleFile(file)
        }
    }

    const handleChooseClick = () => {
        inputRef.current?.click()
    }

    return (
        <div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleChooseClick}
                className={`
                    cursor-pointer rounded-2xl border-2 border-dashed
                    p-12 transition
                    ${
                        isDragging
                        ? 'border-gray-900 bg-gray-100'
                        : 'border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                    }
                `}
            >
                <div className="flex flex-col items-center">
                    <div className="mb-4 text-4-xl">
                        ^^^^^
                    </div>

                    <p className="text-lg font-medium">
                        {isDragging
                            ? 'Drop your image here'
                            : 'Drop your image here'}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        or
                    </p>

                    <button
                        type="button"
                        onClick={(event) =>{
                            event.stopPropagation()
                            handleChooseClick()
                        }}
                        className="mt-3 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        Choose image
                    </button>

                    <p className="mt-4 text-xs text-gray-400">
                        JPG * PNG * WebP
                    </p>
                </div>
            </div>

            {error && (
                <p className="mt-3 text-sm text-red-600">
                    {error}
                </p>
            )}


            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleInputChange}
                className="hidden"
            />
        </div>
    )
}

export default ImageUploader