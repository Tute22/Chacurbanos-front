import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import { NextResponse } from 'next/server'

interface CloudinaryResponse {
    secure_url: string
}

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET,
    secure: true,
})

export const POST = async (req: any) => {
    const data = await req.formData()
    const image = await data.get('userImage')

    if (!image) {
        return NextResponse.json('no se ha subido ninguna imagen.', { status: 400 })
    }

    const fileBuffer = await image.arrayBuffer()

    const mime = image.type
    const encoding = 'base64'
    const base64Data = Buffer.from(fileBuffer).toString('base64')
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data

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
            .end(fileUri)
    })

    return NextResponse.json({ message: 'IMAGEN SUBIDA', url: response.secure_url })
}
