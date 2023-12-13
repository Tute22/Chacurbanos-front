import { render, screen } from '@testing-library/react'
import React from 'react'
import Deliveries from '@/app/deliveries/page'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<Deliveries/>', () => {
    test('renders the Deliveries component', () => {
        render(<Deliveries />)
        const deliveriesElement = screen.getByText(/Repartidores/)
        expect(deliveriesElement).toBeInTheDocument()
    })
})
