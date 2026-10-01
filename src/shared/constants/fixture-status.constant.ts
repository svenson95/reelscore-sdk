export const STATUS_TYPES_SCHEDULED: string[] = ['TBD', 'NS'] as const;

export const STATUS_VALUE_HALFTIME = 'HT' as const;

export const STATUS_TYPES_PLAYING: string[] = [
  '1H',
  STATUS_VALUE_HALFTIME,
  '2H',
  'ET', // Extra time in play
  'BT', // Break during extra time
  'P', // Penaly played after extra time
  'SUSP', // Suspended by referee's decision, may be rescheduled another day
  'INT', // Interrupted by referee's decision, should resume in a few minutes
  'LIVE', // indicates a fixture in progress but the data indicating the half-time or elapsed time are not available
] as const;

export const STATUS_TYPES_PLAYING_ACTIVE: string[] = [
  '1H',
  '2H',
  'ET',
  'P',
] as const;

export const STATUS_TYPES_FINISHED: string[] = ['FT', 'AET', 'PEN'] as const;

export const STATUS_VALUE_POSTPONED = 'PST' as const;

export const STATUS_VALUE_CANCELLED = 'CANC' as const;

export const STATUS_VALUE_ABANDONED = 'ABD' as const;

export const STATUS_TYPES_NOT_PLAYED: string[] = [
  'AWD', // Technical Loss
  'WO', // WalkOver, victory by forfeit or absence of competitor
] as const;
