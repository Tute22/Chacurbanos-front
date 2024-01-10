import { render, screen } from '@testing-library/react'
import React from 'react'
import Deliveries from '@/app/deliveries/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<Deliveries/>', () => {
    it('renders the Deliveries component', () => {
        render(
            <Providers>
                <Deliveries />
            </Providers>
        )
        const deliveriesElement = screen.getByText(/Repartidores/)
        expect(deliveriesElement).toBeInTheDocument()
    })
})
