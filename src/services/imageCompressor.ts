export interface CompressionResult {
    originalSize: number
    compressedSize: number
    blob: Blob
}

export async function compressImage(
    file: File,
    quality: number,
): Promise<CompressionResult> {
    const image = await loadImage(file)

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
        throw new Error('Could not create canvas context')
    }

    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    context.drawImage(image, 0, 0)

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(new Error('Could not compress image'))
                }
            },
            'image/jpeg',
            quality,
        )
    })

    return {
        originalSize: file.size,
        compressedSize: blob.size,
        blob,
    }
}

function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = () => {
            URL.revokeObjectURL(image.src)
            resolve(image)
        }

        image.onerror = () => {
            URL.revokeObjectURL(image.src)
            reject(new Error('Could not load image'))
        }

        image.src = URL.createObjectURL(file)
    })
}
