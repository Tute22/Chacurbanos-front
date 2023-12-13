import { render, screen } from '@testing-library/react'
import React from 'react'
import Packages from '@/app/packages/page'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<Packages/>', () => {
    test('renders the Packages component', () => {
        render(<Packages />)
        const packagesElement = screen.getByText(/Paquetes/)
        expect(packagesElement).toBeInTheDocument()
    })
})
