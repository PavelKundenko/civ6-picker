import { FC } from 'react';
import { CivCard } from '@/app/civilizations/components/CivCard/CivCard';
import { IPlayerDraft } from '@/app/civilizations/models/step';
import { Toolbar } from '@/ui-components/Toolbar';
import { Button } from '@/ui-components/Button';

interface IResultProps {
  draftResults : IPlayerDraft[];
  redraft      : () => void;
}

export const Result: FC<IResultProps> = ({
  draftResults,
  redraft,
}) => {
  return (
    <>
      <Toolbar>
        <Button
          variant='primary'
          onClick={redraft}
        >
          Redraft
        </Button>
      </Toolbar>

      <div className='space-y-4'>
        {draftResults.map((draftResult) => (
          <div key={draftResult.playerId}>
            <h3 className='text-2xl font-bold mb-4' contentEditable suppressContentEditableWarning={true}>Player {draftResult.playerId}</h3>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {draftResult.civs.map((civ) => (
                <CivCard
                  key={civ.id}
                  isBanned={false}
                  {...civ}
                />
              ))}

              <div className='col-span-full my-4 border-t border-gray-300 dark:border-gray-700'></div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
};