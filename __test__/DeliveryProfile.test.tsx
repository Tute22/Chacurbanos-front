import { render, screen } from '@testing-library/react'
import React from 'react'
import DeliveryProfile from '@/app/delivery-profile/[id]/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<DeliveryProfile/>', () => {
    test('renders the DeliveryProfile component', () => {
        render(
            <Providers>
                <DeliveryProfile />
            </Providers>
        )
        const deliveryProfileElement = screen.getByText(/Perfil del repartidor/)
        expect(deliveryProfileElement).toBeInTheDocument()
    })
})
