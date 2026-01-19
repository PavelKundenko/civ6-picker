import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CivList } from './CivList'
import { ICiv } from '@/models/civiliations/civ'

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

const mockCivs: ICiv[] = [
  { id: 1, civilization: 'Rome', leader: 'Trajan', avatar: 'Trajan.webp' },
  { id: 2, civilization: 'Greece', leader: 'Pericles', avatar: 'Pericles.webp' },
  { id: 3, civilization: 'Egypt', leader: 'Cleopatra', avatar: 'Cleopatra.webp', isBannedByDefault: true },
]

describe('CivList', () => {
  const onNextStep = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all civilizations', () => {
    render(<CivList data={mockCivs} onNextStep={onNextStep} />)

    expect(screen.getByText('Rome')).toBeInTheDocument()
    expect(screen.getByText('Greece')).toBeInTheDocument()
    expect(screen.getByText('Egypt')).toBeInTheDocument()
  })

  it('should filter civs by search term', async () => {
    const user = userEvent.setup()
    render(<CivList data={mockCivs} onNextStep={onNextStep} />)

    const searchInput = screen.getByPlaceholderText('Search civilizations...')
    await user.type(searchInput, 'Rome')

    expect(screen.getByText('Rome')).toBeInTheDocument()
    expect(screen.queryByText('Greece')).not.toBeInTheDocument()
    expect(screen.queryByText('Egypt')).not.toBeInTheDocument()
  })

  it('should filter civs by leader name', async () => {
    const user = userEvent.setup()
    render(<CivList data={mockCivs} onNextStep={onNextStep} />)

    const searchInput = screen.getByPlaceholderText('Search civilizations...')
    await user.type(searchInput, 'Trajan')

    expect(screen.getByText('Rome')).toBeInTheDocument()
    expect(screen.queryByText('Greece')).not.toBeInTheDocument()
  })

  it('should ban civ when ban button is clicked', async () => {
    const user = userEvent.setup()
    render(<CivList data={mockCivs} onNextStep={onNextStep} />)

    const banButtons = screen.getAllByRole('button', { name: 'Ban' })
    await user.click(banButtons[0])

    const romeCard = screen.getByText('Rome').closest('section')
    expect(romeCard).toHaveClass('opacity-50', 'grayscale')
  })

  it('should restore banned civ when restore button is clicked', async () => {
    const user = userEvent.setup()
    render(<CivList data={mockCivs} onNextStep={onNextStep} />)

    const restoreButton = screen.getByRole('button', { name: 'Restore' })
    await user.click(restoreButton)

    const egyptCard = screen.getByText('Egypt').closest('section')
    expect(egyptCard).not.toHaveClass('opacity-50')
  })

  it('should clear all bans when Clear Bans button is clicked', async () => {
    const user = userEvent.setup()
    render(<CivList data={mockCivs} onNextStep={onNextStep} />)

    await user.click(screen.getByRole('button', { name: 'Clear Bans' }))

    const restoreButtons = screen.queryAllByRole('button', { name: 'Restore' })
    expect(restoreButtons).toHaveLength(0)
  })

  it('should call onNextStep with active civ ids when Next Step is clicked', async () => {
    const user = userEvent.setup()
    render(<CivList data={mockCivs} onNextStep={onNextStep} />)

    await user.click(screen.getByRole('button', { name: 'Next Step' }))

    expect(onNextStep).toHaveBeenCalledWith([1, 2])
  })

  it('should pre-ban civs with isBannedByDefault', () => {
    render(<CivList data={mockCivs} onNextStep={onNextStep} />)

    const egyptCard = screen.getByText('Egypt').closest('section')
    expect(egyptCard).toHaveClass('opacity-50', 'grayscale')
  })
})
