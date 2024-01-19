import { render, screen } from '@testing-library/react'
import React from 'react'
import Distribution from '@/app/distribution/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<Distribution/>', () => {
    it('renders the Distribution component', () => {
        render(
            <Providers>
                <Distribution />
            </Providers>
        )
        const distributionElement = screen.getByText(/Reparto en curso/)
        expect(distributionElement).toBeInTheDocument()
    })

    it('does not render the AddPackages component with incorrect text', () => {
        render(
            <Providers>
                <Distribution />
            </Providers>
        )

        // Intenta buscar un texto que no debería estar presente
        const addPackagesElement = screen.queryByText(/Texto incorrecto/)

        // Verifica que el elemento no esté presente
        expect(addPackagesElement).not.toBeInTheDocument()
    })
})
