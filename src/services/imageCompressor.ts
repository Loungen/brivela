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

    const outputType = getOutputType(file.type)

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(new Error('Could not compress image'))
                }
            },
            outputType,
            quality,
        )
    })

    return {
        originalSize: file.size,
        compressedSize: blob.size,
        blob,
    }
}

function getOutputType(type: string): string {
    switch(type) {
        case 'image/png':
            return 'image/png'
        
        case 'image/webp':
            return 'image/webp'
        
        case 'image/jpeg':
            return 'image/jpeg'
        
        default:
            throw new Error('Unsupported image format')
    }
}

function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image()
        const url = URL.createObjectURL(file)

        image.onload = () => {
            URL.revokeObjectURL(url)
            resolve(image)
        }

        image.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('Could not load image'))
        }

        image.src = url
    })
}
