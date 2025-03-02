'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { EStep, IPlayerDraft } from '@/models/civiliations/step';
import { CivList } from '@/app/civilizations/components/CivList/CivList';
import { ICiv } from '@/models/civiliations/civ';
import { Players } from '@/app/civilizations/components/Players/Players';
import { Result } from '@/app/civilizations/components/Result/Result';
import { suffleCivs } from '@/helpers/utils';

interface IContainerProps {
  civs: ICiv[];
}

export const Container: FC<IContainerProps> = ({ civs }) => {
  const [step, setStep] = useState<EStep>(EStep.List);
  const [activeCivIds, setActiveCivIds] = useState<number[]>([]);
  const [draftResults, setDraftResults] = useState<IPlayerDraft[]>([]);

  const savedPlayersNumber = useRef<number | null>(null);
  const savedCivsToPlayerNumber = useRef<number | null>(null);

  const handleSubmitList = useCallback(
    (activeCivIds: number[]) => {
      setActiveCivIds(activeCivIds);
      setStep(EStep.PlayersNumber);
    },
    [],
  );

  const handleDraftCivs = useCallback(
    (playersNumber: number, civsToPlayerNumber: number) => {
      savedPlayersNumber.current = playersNumber;
      savedCivsToPlayerNumber.current = civsToPlayerNumber;

      const results = suffleCivs(civs, activeCivIds, playersNumber, civsToPlayerNumber);
      
      setDraftResults(results);
      setStep(EStep.Result);
    },
    [civs, activeCivIds],
  );

  const handleRedraft = useCallback(
    () => {
      const results = suffleCivs(
        civs,
        activeCivIds,
        savedPlayersNumber.current as number,
        savedCivsToPlayerNumber.current as number,
      );

      setDraftResults(results);
    },
    [civs, activeCivIds],
  );

  return (
    <>
      {step === EStep.List && <CivList data={civs} onNextStep={handleSubmitList} />}
      {step === EStep.PlayersNumber && <Players civsTotalNumber={activeCivIds.length} onNextStep={handleDraftCivs} />}
      {step === EStep.Result && <Result draftResults={draftResults} redraft={handleRedraft} />}
    </>
  );
};