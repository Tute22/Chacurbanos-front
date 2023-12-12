import { render, screen } from '@testing-library/react'
import React from 'react'
import Login from '@/app/login/page'

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
        render(<Login />)
        const loginElement = screen.getByText(/Iniciar Sesión/i)
        expect(loginElement).toBeInTheDocument()
    })
})
