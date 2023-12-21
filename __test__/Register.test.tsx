import { render, screen } from '@testing-library/react'
import React from 'react'
import Register from '@/app/register/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<Register/>', () => {
    test('renders the Register component', () => {
        render(
            <Providers>
                <Register />
            </Providers>
        )
        const registerElement = screen.getByText(/Creá tu cuenta/)
        expect(registerElement).toBeInTheDocument()
    })
})
