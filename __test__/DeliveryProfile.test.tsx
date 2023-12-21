import { render, screen } from '@testing-library/react'
import React from 'react'
import DeliveryProfile from '@/app/delivery-profile/[id]/[id]'

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
        render(<DeliveryProfile />)
        const deliveryProfileElement = screen.getByText(/Perfil del repartidor/)
        expect(deliveryProfileElement).toBeInTheDocument()
    })
})
