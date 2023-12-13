import { render, screen } from '@testing-library/react'
import React from 'react'
import WorkingDay from '@/app/working-day/page'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<WorkingDay/>', () => {
    test('renders the WorkingDay component', () => {
        render(<WorkingDay />)
        const workingDayElement = screen.getByText(/Repartos pendientes/)
        expect(workingDayElement).toBeInTheDocument()
    })
})
