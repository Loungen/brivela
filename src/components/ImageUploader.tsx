interface ImageUploaderProps {
    onImageSelected: (file: File) => void
}

function ImageUploader({ onImageSelected }: ImageUploaderProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) {
            return
        }

        onImageSelected(file)
    }

    return (
        <div>
            <label htmlFor="image-upload">
                Choose an image
            </label>

            <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleChange}
            />
        </div>
    )
}

export default ImageUploader