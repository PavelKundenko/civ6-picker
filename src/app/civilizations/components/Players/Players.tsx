'use client';

import { FC, useCallback, useState } from 'react';

import { Toolbar } from '@/ui-components/Toolbar';
import { Button } from '@/ui-components/Button';
import { Input } from '@/ui-components/Input';

interface IPlayersProps {
  civsTotalNumber : number;
  onNextStep      : (playersNumber: number, civsToPlayerNumber: number) => void;
}

export const Players: FC<IPlayersProps> = ({
  civsTotalNumber,
  onNextStep,
}) => {
  const [playersNumber, setPlayersNumber] = useState<number | null>(1);
  const [civsToPlayerNumber, setCivsToPlayerNumber] = useState<number | null>(3);
  
  console.log('civsTotalNumber', civsTotalNumber);

  const totalCivsNeeded = (playersNumber && civsToPlayerNumber) ? (playersNumber * civsToPlayerNumber) : 0;
  const hasError = totalCivsNeeded > civsTotalNumber;
  const errorMessage = hasError ? `Maximum civs is ${civsTotalNumber}` : undefined;

  const handleSubmit = useCallback(
    () => {
      if (!playersNumber || !civsToPlayerNumber || hasError) {
        return;
      }

      onNextStep(playersNumber, civsToPlayerNumber);
    },
    [playersNumber, civsToPlayerNumber, onNextStep, hasError],
  );

  return (
    <Toolbar>
      <div className='flex gap-4'>
        <Input
          label    = 'Total Players'
          type     = 'number'
          max      = {12}
          value    = {playersNumber ?? ''}
          onChange = {(e) => setPlayersNumber(e.target.value === '' ? null : Number(e.target.value))}
          error    = {hasError ? errorMessage : undefined}
        />

        <Input
          label    = 'Number of Civs per Player'
          type     = 'number'
          value    = {civsToPlayerNumber ?? ''}
          onChange = {(e) => setCivsToPlayerNumber(e.target.value === '' ? null : Number(e.target.value))}
        />
      </div>

      <Button
        onClick = {handleSubmit}
        disabled = {!playersNumber || !civsToPlayerNumber || hasError}
      >
        Draft
      </Button>
    </Toolbar>
  );
};
