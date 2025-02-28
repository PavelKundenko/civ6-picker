'use client';

import {
  useCallback,
  useMemo,
  useState,
  type FC,
} from 'react';
import { type ICiv } from '@/app/civilizations/models/civ';
import { CivCard } from '@/app/civilizations/components/CivCard/CivCard';
import { searchCivs } from '@/app/helpers/utils';
import { Toolbar } from '@/ui-components/Toolbar';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';

interface ICivListProps {
  data       : ICiv[];
  onNextStep : (activeCivIds: number[]) => void;
}

export const CivList: FC<ICivListProps> = ({
  data,
  onNextStep,
}) => {
  const [search, setSearch] = useState('');
  const [bannedIds, setBannedIds] = useState<number[]>([]);

  const toggleBan = (id: number, isBanned: boolean) => {
    if (isBanned) {
      setBannedIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setBannedIds((prev) => [...prev, id]);
    }
  };

  const [activeCivs, bannedCivs] = useMemo(
    () => {
      const activeCivs = data.filter((civ) => !bannedIds.includes(civ.id));
      const bannedCivs = data.filter((civ) => bannedIds.includes(civ.id));

      return [activeCivs, bannedCivs];
    },
    [data, bannedIds],
  );

  const [searchedActiveCivs, searchedBannedCivs] = useMemo(
    () => {
      const searchedActiveCivs = searchCivs(activeCivs, search);
      const searchedBannedCivs = searchCivs(bannedCivs, search);

      return [searchedActiveCivs, searchedBannedCivs];
    },
    [activeCivs, bannedCivs, search],
  );

  const handleSubmit = useCallback(
    () => {
      const activeCivIds = activeCivs.map((civ) => civ.id);

      onNextStep(activeCivIds);
    },
    [activeCivs, onNextStep],
  );

  return (
    <>
      <Toolbar>
        <div className='md:w-1/2'>
          <Input
            type='text'
            placeholder='Search civilizations...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='flex gap-2'>
          <Button
            variant='danger'
            onClick={() => setBannedIds([])}
          >
            Clear Bans
          </Button>

          <Button
            variant='primary'
            onClick={handleSubmit}
          >
            Next Step
          </Button>
        </div>
      </Toolbar>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {searchedActiveCivs.map((civ) => (
          <CivCard
            key={civ.id}
            isBanned={bannedIds.includes(civ.id)}
            toggleBan={toggleBan}
            {...civ}
          />
        ))}

        {searchedBannedCivs.map((civ) => (
          <CivCard
            key={civ.id}
            isBanned={bannedIds.includes(civ.id)}
            toggleBan={toggleBan}
            {...civ}
          />
        ))}
      </div>
    </>
  );
};
