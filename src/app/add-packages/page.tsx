'use client';
import { LeftArrowIcon } from '@/commons/icons';
import { Navbar } from '@/components/Navbar';
import { poppins400, poppins700 } from '@/commons/fonts';
import { useState } from 'react';

export default function GetPackages() {
    const [address, setAddress] = useState('');
    const [recipentName, setRecipientName] = useState('');
    const [packageWeight, setpackageWeight] = useState('');
    const [deliveryDate, setDeliveryDate ] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault()
        localStorage.setItem('package', JSON.stringify({address, recipentName, packageWeight, deliveryDate}))
        console.log('Paquete agregado!');
        const storedPackage = localStorage.getItem('package');
    
        if (storedPackage !== null) {
            console.log(JSON.parse(storedPackage));
        } else {
            console.log('No hay paquete');
        }
    }


    const handleValidation = {
        handleAddress: (value: string) => {
            if (/^[A-Za-z0-9\s]*$/.test(value)) {
                return;
            } else {
                alert('Dirección solo caracteres alfanumericos');
                setAddress("")
            }
        },
        handleName: (value: string) => {
            if (/^[A-Za-z]+$/.test(value)) {
                return;
            } else {
                alert('Nombre solo con letras');
                setRecipientName("")
            }
        },
        handlePackage: (value: number) => {
            const stringValue = value.toString()
            if (/^[0-9]+$/.test(stringValue)) {
                return;
            } else {
                alert('Peso solo con numero');
                setpackageWeight("")
            }
        },
    };    

    return (
        <main className={`bg-[#AEE3EF] h-screen ${poppins400.className}`}>
            <Navbar />
            <section className="flex items-center flex-col h-[82%] mt-7">
                <div className="bg-[#55BBD1] rounded-lg p-4 w-80 h-[80px] text-white flex flex-wrap justify-between shadow-md">
                    <LeftArrowIcon className="w-8 ml-[3px] absolute mx-auto" />
                    <div className="w-fit mx-auto">
                        <h3 className={`text-lg ${poppins700.className} h-[32px] flex items-center`}>Agregar Paquetes</h3>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 w-80 mt-[-20px] h-[600px] flex flex-col shadow-md justify-center">
                    <form className="rounded-xl flex justify-center flex-col p-4" onSubmit={handleSubmit}>
                        <input className="pl-2 border border-solid border-black mb-4 rounded-lg p-2" placeholder="Dirección" value={address} onChange={(e)=> setAddress(e.currentTarget.value)} onBlur={(e) => handleValidation.handleAddress(e.currentTarget.value)} required />
                        <input className="pl-2 border border-solid border-black mb-4 rounded-lg p-2" placeholder="Nombre de quien recibe" value={recipentName} onChange={(e)=> setRecipientName(e.currentTarget.value)} onBlur={(e) => handleValidation.handleName(e.currentTarget.value)} required />
                        <input className="pl-2 border border-solid border-black rounded-lg p-2" placeholder="Peso del paquete (Kg)" value={packageWeight} onChange={(e)=> setpackageWeight(e.currentTarget.value)} onBlur={(e) => handleValidation.handlePackage(parseInt(e.currentTarget.value))} required />

                        <p className="mt-3">Fecha de entrega</p>
                        <p className="mt-2 border-t border-1 border-dashed border-black"></p>
                        <input
                            type="date"
                            className="pl-2 mt-3 border border-solid border-black rounded-lg p-2"
                            value={deliveryDate}
                            onChange={(e) => {
                                const packageDate = e.currentTarget.value;
                                setDeliveryDate(packageDate);
                            }}
                            placeholder="00/00/00"
                            required
                        />

                        <div className="mb-4 absolute right-12 bottom-[110px] flex justify-center">
                            <button type="submit" className={`w-72 py-1 font-bold bg-[#F4C455] rounded-full ${poppins400.className}`}>
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
