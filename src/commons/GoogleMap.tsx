import React from 'react'

interface GoogleMapProps {
    addresses: string[]
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ addresses }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS // Reemplaza con tu clave de API de Google Maps
    const query = addresses.map((address) => `+${encodeURIComponent(address)}`).join('')

    console.log(query)

    const mapSrc = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${query}&zoom=13`

    return (
        <div className="mapouter">
            <div className="gmap_canvas">
                <iframe width="280" height="360" id="gmap_canvas" src={mapSrc} frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0}></iframe>
            </div>
        </div>
    )
}
