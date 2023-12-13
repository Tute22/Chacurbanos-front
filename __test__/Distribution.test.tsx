import { render, screen } from '@testing-library/react'
import React from 'react'
import Distribution from '@/app/distribution/page'

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
        render(<Distribution />)
        const distributionElement = screen.getByText(/Reparto en curso/)
        expect(distributionElement).toBeInTheDocument()
    })
})
