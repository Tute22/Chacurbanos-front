import { render, screen } from '@testing-library/react'
import React from 'react'
import ManageOrders from '@/app/manage-orders/page'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<ManageOrders/>', () => {
    test('renders the ManageOrders component', () => {
        render(<ManageOrders />)
        const manageOrdersElement = screen.getByText(/Gestionar pedidos/)
        expect(manageOrdersElement).toBeInTheDocument()
    })
})
