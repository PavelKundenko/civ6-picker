import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Result } from './Result'
import { IPlayerDraft } from '@/models/civiliations/step'

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

const mockDraftResults: IPlayerDraft[] = [
  {
    playerId: 1,
    playerName: 'Alice',
    civs: [
      { id: 1, civilization: 'Rome', leader: 'Trajan', avatar: 'Trajan.webp' },
      { id: 2, civilization: 'Greece', leader: 'Pericles', avatar: 'Pericles.webp' },
    ],
  },
  {
    playerId: 2,
    playerName: 'Bob',
    civs: [
      { id: 3, civilization: 'Egypt', leader: 'Cleopatra', avatar: 'Cleopatra.webp' },
    ],
  },
]

describe('Result', () => {
  const redraft = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render player names', () => {
    render(<Result draftResults={mockDraftResults} redraft={redraft} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('should render all civilizations for each player', () => {
    render(<Result draftResults={mockDraftResults} redraft={redraft} />)
    expect(screen.getByText('Rome')).toBeInTheDocument()
    expect(screen.getByText('Greece')).toBeInTheDocument()
    expect(screen.getByText('Egypt')).toBeInTheDocument()
  })

  it('should render all leader names', () => {
    render(<Result draftResults={mockDraftResults} redraft={redraft} />)
    expect(screen.getByText('Trajan')).toBeInTheDocument()
    expect(screen.getByText('Pericles')).toBeInTheDocument()
    expect(screen.getByText('Cleopatra')).toBeInTheDocument()
  })

  it('should render redraft button', () => {
    render(<Result draftResults={mockDraftResults} redraft={redraft} />)
    expect(screen.getByRole('button', { name: 'Redraft' })).toBeInTheDocument()
  })

  it('should call redraft when redraft button is clicked', async () => {
    const user = userEvent.setup()
    render(<Result draftResults={mockDraftResults} redraft={redraft} />)

    await user.click(screen.getByRole('button', { name: 'Redraft' }))

    expect(redraft).toHaveBeenCalledTimes(1)
  })

  it('should render civ cards without ban button', () => {
    render(<Result draftResults={mockDraftResults} redraft={redraft} />)
    expect(screen.queryByRole('button', { name: 'Ban' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Restore' })).not.toBeInTheDocument()
  })

  it('should render correct number of player sections', () => {
    render(<Result draftResults={mockDraftResults} redraft={redraft} />)
    const aliceHeading = screen.getByRole('heading', { level: 3, name: 'Alice' })
    const bobHeading = screen.getByRole('heading', { level: 3, name: 'Bob' })
    expect(aliceHeading).toBeInTheDocument()
    expect(bobHeading).toBeInTheDocument()
  })

  it('should handle empty draft results', () => {
    render(<Result draftResults={[]} redraft={redraft} />)
    expect(screen.getByRole('button', { name: 'Redraft' })).toBeInTheDocument()
  })
})
