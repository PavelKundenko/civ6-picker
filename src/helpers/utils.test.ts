import { describe, it, expect } from 'vitest'
import { searchCivs, suffleCivs } from './utils'
import { ICiv } from '@/models/civiliations/civ'

const mockCivs: ICiv[] = [
  { id: 1, civilization: 'Rome', leader: 'Trajan', avatar: 'trajan.webp' },
  { id: 2, civilization: 'Greece', leader: 'Pericles', avatar: 'pericles.webp' },
  { id: 3, civilization: 'Greece', leader: 'Gorgo', avatar: 'gorgo.webp' },
  { id: 4, civilization: 'Egypt', leader: 'Cleopatra', avatar: 'cleopatra.webp' },
]

describe('searchCivs', () => {
  it('should return all civs when search is empty', () => {
    const result = searchCivs(mockCivs, '')
    expect(result).toHaveLength(4)
  })

  it('should filter by civilization name (case insensitive)', () => {
    const result = searchCivs(mockCivs, 'greece')
    expect(result).toHaveLength(2)
    expect(result.every(civ => civ.civilization === 'Greece')).toBe(true)
  })

  it('should filter by leader name (case insensitive)', () => {
    const result = searchCivs(mockCivs, 'TRAJAN')
    expect(result).toHaveLength(1)
    expect(result[0].leader).toBe('Trajan')
  })

  it('should return empty array when no match found', () => {
    const result = searchCivs(mockCivs, 'nonexistent')
    expect(result).toHaveLength(0)
  })

  it('should match partial strings', () => {
    const result = searchCivs(mockCivs, 'cleo')
    expect(result).toHaveLength(1)
    expect(result[0].leader).toBe('Cleopatra')
  })
})

describe('suffleCivs', () => {
  it('should return correct number of player drafts', () => {
    const playerNames = ['Player 1', 'Player 2']
    const result = suffleCivs(mockCivs, [1, 2, 3, 4], playerNames, 2)

    expect(result).toHaveLength(2)
  })

  it('should assign correct player names and ids', () => {
    const playerNames = ['Alice', 'Bob']
    const result = suffleCivs(mockCivs, [1, 2, 3, 4], playerNames, 2)

    expect(result[0].playerId).toBe(1)
    expect(result[0].playerName).toBe('Alice')
    expect(result[1].playerId).toBe(2)
    expect(result[1].playerName).toBe('Bob')
  })

  it('should assign correct number of civs per player', () => {
    const playerNames = ['Player 1', 'Player 2']
    const civsPerPlayer = 2
    const result = suffleCivs(mockCivs, [1, 2, 3, 4], playerNames, civsPerPlayer)

    result.forEach(draft => {
      expect(draft.civs).toHaveLength(civsPerPlayer)
    })
  })

  it('should only include active civs', () => {
    const playerNames = ['Player 1']
    const activeCivIds = [1, 2]
    const result = suffleCivs(mockCivs, activeCivIds, playerNames, 2)

    const allCivIds = result.flatMap(draft => draft.civs.map(civ => civ.id))
    allCivIds.forEach(civId => {
      expect(activeCivIds).toContain(civId)
    })
  })
})
