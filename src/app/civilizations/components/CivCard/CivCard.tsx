import { type FC } from 'react';
import Image from 'next/image';
import { type ICiv } from '@/app/civilizations/models/civ';

interface ICivCardProps extends ICiv {
  isBanned   : boolean;
  toggleBan? : (id: number, isBanned: boolean) => void;
}

export const CivCard: FC<ICivCardProps> = ({
  id,
  leader,
  civilization,
  avatar,
  isBanned,
  toggleBan,
}) => {
  const cardClasses = `relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
    isBanned ? 'opacity-50 grayscale' : ''
  }`;

  return (
    <section className={cardClasses}>
      {!!toggleBan && (
        <button
          title={isBanned ? 'Unban civilization' : 'Ban civilization'}
          className='block absolute top-2 right-2 p-1 rounded-md transition-all hover:bg-red-600 text-gray-400'
          onClick={() => toggleBan(id, isBanned)}
        >
          {isBanned ? 'Restore' : 'Ban'}
        </button>
      )}

      <div className='relative space-y-4'>
        <div>
          <h3 className='text-2xl font-bold text-white'>{civilization}</h3>
          <div className='mt-1 h-1 w-12 rounded-full bg-amber-500' />
        </div>

        <div className='flex items-center gap-2'>
          <Image
            src={`/avatars/${avatar}`}
            alt={leader}
            width={48}
            height={48}
            className='rounded-full object-cover'
          />

          <div>
            <p className='text-xs text-slate-400'>Leader</p>
            <p className='font-medium text-slate-200'>{leader}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
