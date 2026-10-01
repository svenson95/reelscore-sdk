import type { EventDTO } from '../../models/index.js';

export const timeTotal = (event: EventDTO): number =>
  event.time.elapsed + (event.time.extra ?? 0);
