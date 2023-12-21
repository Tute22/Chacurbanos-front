import { render, screen } from '@testing-library/react'
import React from 'react'
import AddPackages from '@/app/add-packages/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<AddPackages/>', () => {
    test('renders the AddPackages component', () => {
        render(
            <Providers>
                <AddPackages />
            </Providers>
        )
        const addPackagesElement = screen.getByText(/Agregar paquetes/)
        expect(addPackagesElement).toBeInTheDocument()
    })
})
