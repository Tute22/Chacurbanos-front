import { NextResponse } from 'next/server'
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'

interface CloudinaryResponse {
    secure_url: string
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET,
})

export async function POST(request: any) {
    const data = await request.formData()
    const image = data.get('userImage')

    if (!image) {
        return NextResponse.json('no se ha subido ninguna imagen.', { status: 400 })
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const response: CloudinaryResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({}, (err: UploadApiErrorResponse | undefined, res: UploadApiResponse | undefined) => {
                if (err) {
                    reject(err)
                }
                if (!res) {
                    reject(new Error('La respuesta de Cloudinary es indefinida.'))
                }
                resolve(res as CloudinaryResponse)
            })
            .end(buffer)
    })

    return NextResponse.json({ message: 'IMAGEN SUBIDA', url: response.secure_url })
}
