import { render, screen } from '@testing-library/react'
import React from 'react'
import WorkingDay from '@/app/working-day/page'
import { Providers } from '@/store/providers'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        }
    },
    usePathname: jest.fn(),
}))

describe('<WorkingDay/>', () => {
    it('renders the WorkingDay component', () => {
        render(
            <Providers>
                <WorkingDay />
            </Providers>
        )
        const workingDayElement = screen.getByText(/Repartos pendientes/)
        expect(workingDayElement).toBeInTheDocument()
    })
})
