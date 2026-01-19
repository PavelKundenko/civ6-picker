import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CivCard } from './CivCard'

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

const defaultProps = {
  id: 1,
  civilization: 'Rome',
  leader: 'Trajan',
  avatar: 'Trajan.webp',
  isBanned: false,
}

describe('CivCard', () => {
  it('should render civilization name', () => {
    render(<CivCard {...defaultProps} />)
    expect(screen.getByText('Rome')).toBeInTheDocument()
  })

  it('should render leader name', () => {
    render(<CivCard {...defaultProps} />)
    expect(screen.getByText('Trajan')).toBeInTheDocument()
  })

  it('should render leader avatar', () => {
    render(<CivCard {...defaultProps} />)
    const image = screen.getByAltText('Trajan')
    expect(image).toHaveAttribute('src', '/avatars/Trajan.webp')
  })

  it('should apply banned styles when isBanned is true', () => {
    render(<CivCard {...defaultProps} isBanned={true} />)
    const card = screen.getByText('Rome').closest('section')
    expect(card).toHaveClass('opacity-50', 'grayscale')
  })

  it('should not apply banned styles when isBanned is false', () => {
    render(<CivCard {...defaultProps} isBanned={false} />)
    const card = screen.getByText('Rome').closest('section')
    expect(card).not.toHaveClass('opacity-50')
    expect(card).not.toHaveClass('grayscale')
  })

  it('should not render ban button when toggleBan is not provided', () => {
    render(<CivCard {...defaultProps} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render ban button when toggleBan is provided', () => {
    const toggleBan = vi.fn()
    render(<CivCard {...defaultProps} toggleBan={toggleBan} />)
    expect(screen.getByRole('button', { name: 'Ban' })).toBeInTheDocument()
  })

  it('should render restore button when banned and toggleBan is provided', () => {
    const toggleBan = vi.fn()
    render(<CivCard {...defaultProps} isBanned={true} toggleBan={toggleBan} />)
    expect(screen.getByRole('button', { name: 'Restore' })).toBeInTheDocument()
  })

  it('should call toggleBan with correct arguments when ban button clicked', async () => {
    const toggleBan = vi.fn()
    const user = userEvent.setup()

    render(<CivCard {...defaultProps} toggleBan={toggleBan} />)
    await user.click(screen.getByRole('button'))

    expect(toggleBan).toHaveBeenCalledWith(1, false)
  })

  it('should call toggleBan with isBanned=true when restoring', async () => {
    const toggleBan = vi.fn()
    const user = userEvent.setup()

    render(<CivCard {...defaultProps} isBanned={true} toggleBan={toggleBan} />)
    await user.click(screen.getByRole('button'))

    expect(toggleBan).toHaveBeenCalledWith(1, true)
  })
})
