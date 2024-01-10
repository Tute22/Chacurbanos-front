import { render, screen } from '@testing-library/react'
import React from 'react'
import ManageOrders from '@/app/manage-orders/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<ManageOrders/>', () => {
    it('renders the ManageOrders component', () => {
        render(
            <Providers>
                <ManageOrders />
            </Providers>
        )
        const manageOrdersElement = screen.getByText(/Gestionar pedidos/)
        expect(manageOrdersElement).toBeInTheDocument()
    })
})
