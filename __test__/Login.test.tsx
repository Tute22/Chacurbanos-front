import { render, screen } from '@testing-library/react'
import Login from '@/app/login/page'

it('should render "Iniciar"', () => {
    render(<Login />)
    const el = screen.getByText('Iniciar')
    expect(el).toBeInTheDocument()
})
