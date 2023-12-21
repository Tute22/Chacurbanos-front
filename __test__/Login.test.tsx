import { render, screen } from '@testing-library/react'
import React from 'react'
import Login from '@/app/login/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<Login/>', () => {
    test('renders the Login component', () => {
        render(
            <Providers>
                <Login />
            </Providers>
        )
        const loginElement = screen.getByText(/Iniciar Sesión/)
        expect(loginElement).toBeInTheDocument()
    })
})
