import { render, screen } from '@testing-library/react'
import React from 'react'
import GetPackages from '@/app/get-packages/page'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<GetPackages/>', () => {
    test('renders the GetPackages component', () => {
        render(<GetPackages />)
        const getPackagesElement = screen.getByText(/Obtener Paquetes/)
        expect(getPackagesElement).toBeInTheDocument()
    })
})
