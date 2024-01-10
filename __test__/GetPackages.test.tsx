import { render, screen } from '@testing-library/react'
import React from 'react'
import GetPackages from '@/app/get-packages/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<GetPackages/>', () => {
    it('renders the GetPackages component', () => {
        render(
            <Providers>
                <GetPackages />
            </Providers>
        )
        const getPackagesElement = screen.getByText(/Obtener Paquetes/)
        expect(getPackagesElement).toBeInTheDocument()
    })
})
