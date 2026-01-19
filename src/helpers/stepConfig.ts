import { EStep, IStepConfig } from '@/models/civiliations/step';

export const TOTAL_STEPS = 3;

export const STEP_CONFIG: Record<EStep, IStepConfig> = {
  [EStep.List]: {
    stepNumber: 1,
    title: 'Select Civilizations',
    instructions: 'Click "Ban" on any civilization you want to exclude from the draft. Banned civilizations will not appear in the results.',
  },
  [EStep.PlayersNumber]: {
    stepNumber: 2,
    title: 'Configure Draft Settings',
    instructions: 'Enter the number of players and how many civilizations each player should receive.',
  },
  [EStep.Result]: {
    stepNumber: 3,
    title: 'Draft Results',
    instructions: 'Each player has been assigned random civilizations.',
  },
};
