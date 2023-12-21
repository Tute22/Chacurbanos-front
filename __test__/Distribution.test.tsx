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
    test('renders the Distribution component', () => {
        render(
            <Providers>
                <Distribution />
            </Providers>
        )
        const distributionElement = screen.getByText(/Reparto en curso/)
        expect(distributionElement).toBeInTheDocument()
    })
})
