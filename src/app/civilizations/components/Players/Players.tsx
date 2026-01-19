'use client';

import { FC, useCallback, useState } from 'react';

import { Toolbar } from '@/ui-components/Toolbar';
import { Button } from '@/ui-components/Button';
import { Input } from '@/ui-components/Input';

interface IPlayersProps {
  civsTotalNumber : number;
  onNextStep      : (playerNames: string[], civsToPlayerNumber: number) => void;
}

const generateDefaultPlayerNames = (count: number): string[] => {
  return Array.from({ length: count }, (_, index) => `Player ${index + 1}`);
};

export const Players: FC<IPlayersProps> = ({
  civsTotalNumber,
  onNextStep,
}) => {
  const [playersNumber, setPlayersNumber] = useState<number | null>(1);
  const [civsToPlayerNumber, setCivsToPlayerNumber] = useState<number | null>(3);
  const [playerNames, setPlayerNames] = useState<string[]>(generateDefaultPlayerNames(1));

  const totalCivsNeeded = (playersNumber && civsToPlayerNumber) ? (playersNumber * civsToPlayerNumber) : 0;
  const hasError = totalCivsNeeded > civsTotalNumber;
  const errorMessage = hasError ? `Maximum civs is ${civsTotalNumber}` : undefined;

  const handlePlayersNumberChange = useCallback(
    (newValue: number | null) => {
      setPlayersNumber(newValue);

      if (newValue !== null && newValue > 0) {
        setPlayerNames((previousNames) => {
          if (newValue > previousNames.length) {
            const additionalNames = generateDefaultPlayerNames(newValue).slice(previousNames.length);
            return [...previousNames, ...additionalNames];
          }
          return previousNames.slice(0, newValue);
        });
      }
    },
    [],
  );

  const handlePlayerNameChange = useCallback(
    (index: number, name: string) => {
      setPlayerNames((previousNames) => {
        const updatedNames = [...previousNames];
        updatedNames[index] = name;
        return updatedNames;
      });
    },
    [],
  );

  const handleSubmit = useCallback(
    () => {
      if (!playersNumber || !civsToPlayerNumber || hasError) {
        return;
      }

      onNextStep(playerNames, civsToPlayerNumber);
    },
    [playerNames, civsToPlayerNumber, onNextStep, hasError, playersNumber],
  );

  return (
    <>
      <Toolbar>
        <div className='flex gap-4'>
          <Input
            label    = 'Total Players'
            type     = 'number'
            max      = {12}
            value    = {playersNumber ?? ''}
            onChange = {(event) => handlePlayersNumberChange(event.target.value === '' ? null : Number(event.target.value))}
            error    = {hasError ? errorMessage : undefined}
          />

          <Input
            label    = 'Number of Civs per Player'
            type     = 'number'
            value    = {civsToPlayerNumber ?? ''}
            onChange = {(event) => setCivsToPlayerNumber(event.target.value === '' ? null : Number(event.target.value))}
          />
        </div>

        <Button
          onClick  = {handleSubmit}
          disabled = {!playersNumber || !civsToPlayerNumber || hasError}
        >
          Check Draft Results
        </Button>
      </Toolbar>

      {playersNumber !== null && playersNumber > 0 && (
        <div className='mt-6 rounded-lg border border-gray-700 bg-gray-800/50 p-4'>
          <h3 className='text-lg font-semibold mb-4'>Player Nicknames</h3>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {playerNames.map((name, index) => (
              <Input
                key={index}
                label={`Player ${index + 1}`}
                type='text'
                value={name}
                onChange={(event) => handlePlayerNameChange(index, event.target.value)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
