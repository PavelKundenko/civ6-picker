import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Players } from './Players'

describe('Players', () => {
  const onNextStep = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render total players input with default value', () => {
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)
    const input = screen.getByLabelText('Total Players')
    expect(input).toHaveValue(1)
  })

  it('should render civs per player input with default value', () => {
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)
    const input = screen.getByLabelText('Number of Civs per Player')
    expect(input).toHaveValue(3)
  })

  it('should render player name input for default player', () => {
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)
    expect(screen.getByLabelText('Player 1')).toBeInTheDocument()
  })

  it('should add player name inputs when players number increases', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)

    const playersInput = screen.getByLabelText('Total Players')
    await user.clear(playersInput)
    await user.type(playersInput, '3')

    expect(screen.getByLabelText('Player 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Player 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Player 3')).toBeInTheDocument()
  })

  it('should preserve player names when adding more players', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)

    const player1Input = screen.getByLabelText('Player 1')
    await user.clear(player1Input)
    await user.type(player1Input, 'Alice')

    const playersInput = screen.getByLabelText('Total Players')
    await user.clear(playersInput)
    await user.type(playersInput, '2')

    expect(screen.getByLabelText('Player 1')).toHaveValue('Alice')
  })

  it('should allow editing player names', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)

    const player1Input = screen.getByLabelText('Player 1')
    await user.clear(player1Input)
    await user.type(player1Input, 'CustomName')

    expect(player1Input).toHaveValue('CustomName')
  })

  it('should show error when total civs needed exceeds available', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={5} onNextStep={onNextStep} />)

    const playersInput = screen.getByLabelText('Total Players')
    await user.clear(playersInput)
    await user.type(playersInput, '3')

    expect(screen.getByText('Maximum civs is 5')).toBeInTheDocument()
  })

  it('should disable submit button when there is an error', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={5} onNextStep={onNextStep} />)

    const playersInput = screen.getByLabelText('Total Players')
    await user.clear(playersInput)
    await user.type(playersInput, '3')

    const submitButton = screen.getByRole('button', { name: 'Check Draft Results' })
    expect(submitButton).toBeDisabled()
  })

  it('should disable submit button when players number is empty', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)

    const playersInput = screen.getByLabelText('Total Players')
    await user.clear(playersInput)

    const submitButton = screen.getByRole('button', { name: 'Check Draft Results' })
    expect(submitButton).toBeDisabled()
  })

  it('should disable submit button when civs per player is empty', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)

    const civsInput = screen.getByLabelText('Number of Civs per Player')
    await user.clear(civsInput)

    const submitButton = screen.getByRole('button', { name: 'Check Draft Results' })
    expect(submitButton).toBeDisabled()
  })

  it('should call onNextStep with player names and civs per player on submit', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={20} onNextStep={onNextStep} />)

    const playersInput = screen.getByLabelText('Total Players')
    await user.clear(playersInput)
    await user.type(playersInput, '2')

    const player1Input = screen.getByLabelText('Player 1')
    await user.clear(player1Input)
    await user.type(player1Input, 'Alice')

    const player2Input = screen.getByLabelText('Player 2')
    await user.clear(player2Input)
    await user.type(player2Input, 'Bob')

    await user.click(screen.getByRole('button', { name: 'Check Draft Results' }))

    expect(onNextStep).toHaveBeenCalledWith(['Alice', 'Bob'], 3)
  })

  it('should not call onNextStep when form has errors', async () => {
    const user = userEvent.setup()
    render(<Players civsTotalNumber={5} onNextStep={onNextStep} />)

    const playersInput = screen.getByLabelText('Total Players')
    await user.clear(playersInput)
    await user.type(playersInput, '10')

    await user.click(screen.getByRole('button', { name: 'Check Draft Results' }))

    expect(onNextStep).not.toHaveBeenCalled()
  })
})
