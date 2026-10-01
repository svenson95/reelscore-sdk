import type { CompetitionId, CompetitionRound } from '../../models/index.js';
import { COMPETITION_ID } from './competition-id.constant.js';

export const TWO_LEGGED_COMPETITION_ROUNDS: Partial<
  Record<CompetitionId, readonly CompetitionRound[]>
> = {
  [COMPETITION_ID.EUROPA_UEFA_CHAMPIONS_LEAGUE]: [
    '1st Qualifying Round',
    '2nd Qualifying Round',
    '3rd Qualifying Round',
    'Play-offs',
    'Round of 16',
    'Quarter-finals',
    'Semi-finals',
  ],
  [COMPETITION_ID.EUROPA_UEFA_EURO_LEAGUE]: [
    '1st Qualifying Round',
    '2nd Qualifying Round',
    '3rd Qualifying Round',
    'Play-offs',
    'Round of 16',
    'Quarter-finals',
    'Semi-finals',
  ],
  [COMPETITION_ID.INTERNATIONAL_UEFA_NATIONS_LEAGUE]: [
    'Play-offs A/B',
    'Play-offs B/C',
    'Quarter-finals',
    'Play-offs C/D',
  ],
  [COMPETITION_ID.ENGLAND_LEAGUE_CUP]: ['Semi-finals'],
  [COMPETITION_ID.ITALY_COPPA_ITALIA]: ['Semi-finals'],
  [COMPETITION_ID.SPAIN_COPA_DEL_REY]: ['Semi-finals'],
};
