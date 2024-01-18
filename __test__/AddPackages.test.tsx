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
    it('renders the AddPackages component', () => {
        render(
            <Providers>
                <AddPackages />
            </Providers>
        )
        const addPackagesElement = screen.getByText(/Agregar paquetes/)
        expect(addPackagesElement).toBeInTheDocument()
    })

    it('does not render the AddPackages component with incorrect text', () => {
        render(
            <Providers>
                <AddPackages />
            </Providers>
        )

        // Intenta buscar un texto que no debería estar presente
        const addPackagesElement = screen.queryByText(/Texto incorrecto/)

        // Verifica que el elemento no esté presente
        expect(addPackagesElement).not.toBeInTheDocument()
    })
})
