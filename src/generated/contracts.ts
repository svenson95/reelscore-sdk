// Generated from openapi/fixtures.openapi.json. Do not edit manually.
export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    MongoDbId: string;
    TeamId: number;
    TeamName: string;
    TeamLogo: string;
    PlayerId: number;
    PlayerName: string;
    CompetitionId: number;
    CompetitionName: string;
    CompetitionSeason: number;
    CompetitionRound: string;
    Team: {
      id: components['schemas']['TeamId'];
      name: components['schemas']['TeamName'];
      logo: components['schemas']['TeamLogo'];
    };
    FixtureLeague: {
      id: components['schemas']['CompetitionId'];
      name: components['schemas']['CompetitionName'];
      country: string;
      logo: string;
      flag: string | null;
      season: components['schemas']['CompetitionSeason'];
      standings?: boolean;
      round: components['schemas']['CompetitionRound'];
    };
    /** @enum {string} */
    StatusLong:
      | 'Time To Be Defined'
      | 'Not Started'
      | 'First Half, Kick Off'
      | 'Halftime'
      | 'Second Half, 2nd Half Started'
      | 'Extra Time'
      | 'Break Time'
      | 'Penalty in Progress'
      | 'Match Suspended'
      | 'Match Interrupted'
      | 'Match Finished'
      | 'Match Postponed'
      | 'Match Cancelled'
      | 'Match Abandoned'
      | 'Technical Loss'
      | 'WalkOver'
      | 'In Progress';
    /** @description Kept open for compatibility: the existing status arrays are typed as string[], so StatusShort currently accepts any string. Narrowing to an enum is a separate contract change. */
    StatusShort: string;
    EventTime: {
      elapsed: number;
      extra: number | null;
    };
    EventTeam: {
      id: number;
      name: string;
      logo: string;
      goals: number;
    };
    EventPlayer: {
      id: components['schemas']['PlayerId'];
      name: components['schemas']['PlayerName'];
    };
    EventAssist: {
      id: components['schemas']['PlayerId'] | null;
      name: components['schemas']['PlayerName'] | null;
    };
    /** @enum {string} */
    EventType: 'Goal' | 'Card' | 'subst' | 'Var';
    /** @enum {string} */
    EventDetail:
      | 'Normal Goal'
      | 'Own Goal'
      | 'Penalty'
      | 'Missed Penalty'
      | 'Yellow Card'
      | 'Red Card'
      | 'Tripping'
      | 'Roughing'
      | 'Argument'
      | 'Holding'
      | 'Delay of game'
      | 'Elbowing'
      | 'Unsportsmanlike conduct'
      | 'Serious foul'
      | 'Goal cancelled'
      | 'Goal Disallowed - handball'
      | 'Goal Disallowed - offside'
      | 'Diving'
      | 'Penalty confirmed'
      | 'Substitution'
      | 'Substitution 1'
      | 'Substitution 2'
      | 'Substitution 3'
      | 'Substitution 4'
      | 'Substitution 5'
      | 'Substitution 6'
      | 'Substitution 7'
      | 'Substitution 8'
      | 'Substitution 9'
      | 'Substitution 10';
    EventDTO: {
      time: components['schemas']['EventTime'];
      team: components['schemas']['EventTeam'];
      player: components['schemas']['EventPlayer'];
      assist: components['schemas']['EventAssist'];
      type: components['schemas']['EventType'];
      detail: components['schemas']['EventDetail'];
      comments: string;
    };
    /** @enum {string} */
    FixtureDetail:
      | 'lineups'
      | 'fixture-statistics'
      | 'players-statistics'
      | 'events';
    FixtureId: number | string;
    FixtureIdParameter: string;
    /** @description Existing fixture date string; no new format constraint is introduced by this migration. */
    FixtureDateString: string;
    FixturePeriods: {
      first: number;
      second: number;
    };
    VenueId: number;
    FixtureVenue: {
      id: components['schemas']['VenueId'] | null;
      name: string;
      city: string;
    };
    FixtureStatus: {
      long: components['schemas']['StatusLong'];
      short: components['schemas']['StatusShort'];
      elapsed: number | null;
      extra: number | null;
    };
    /** @enum {string} */
    FixtureResult: 'NO_RESULT_AVAILABLE' | 'WIN' | 'DRAW' | 'LOSS';
    Fixture: {
      id: components['schemas']['FixtureId'];
      referee: string;
      timezone: string;
      date: components['schemas']['FixtureDateString'];
      /** @description Unix timestamp in seconds. */
      timestamp: number;
      periods: components['schemas']['FixturePeriods'];
      venue: components['schemas']['FixtureVenue'];
      status: components['schemas']['FixtureStatus'];
    };
    FixtureTeam: components['schemas']['Team'] & {
      winner: boolean;
    };
    MatchTeams: {
      home: components['schemas']['FixtureTeam'];
      away: components['schemas']['FixtureTeam'];
    };
    Goals: {
      home: number | null;
      away: number | null;
    };
    Score: {
      halftime: components['schemas']['Goals'];
      fulltime: components['schemas']['Goals'];
      extratime: components['schemas']['Goals'];
      penalty: components['schemas']['Goals'];
    };
    FixtureFinal: {
      firstLegResult: components['schemas']['Goals'] | null;
      winnerOfFinal: components['schemas']['TeamId'] | null;
    };
    FixtureDTO: {
      _id: components['schemas']['MongoDbId'];
      fixture: components['schemas']['Fixture'];
      league: components['schemas']['FixtureLeague'];
      teams: components['schemas']['MatchTeams'];
      goals: components['schemas']['Goals'];
      score: components['schemas']['Score'];
    };
    ExtendedFixtureDTO: components['schemas']['FixtureDTO'] & {
      final: components['schemas']['FixtureFinal'];
      prediction?: components['schemas']['FixturePrediction'];
      evaluations?: components['schemas']['FixtureEvaluations'];
    };
    /** @enum {number} */
    PredictionProbability: 0.75 | 0.8 | 0.85 | 0.9 | 0.95;
    /** @enum {boolean|null} */
    PredictionCorrectValue: null | false | true;
    FixturePrediction: {
      bet: string;
      /** @description Existing wire field spelling. Renaming to quote would require a separate data migration. */
      qoute: number;
      probability: components['schemas']['PredictionProbability'];
      correct: components['schemas']['PredictionCorrectValue'];
    };
    /** @enum {string} */
    AnalysisLevel: 'LUCKY' | 'UNLUCKY';
    /** @enum {string} */
    AnalysisType:
      | 'GOAL'
      | 'NO_GOAL'
      | 'LAST_MINUTE_GOAL'
      | 'NO_FOUL'
      | 'PENALTY'
      | 'NO_PENALTY'
      | 'RED_CARD'
      | 'NO_RED_CARD'
      | 'KEY_PLAYER_INJURY'
      | 'KEY_PLAYER_YELLOW_CARD_SUSPENSION';
    EvaluationAnalyses: {
      level: components['schemas']['AnalysisLevel'];
      type: components['schemas']['AnalysisType'];
      minute: number | null;
      player: string | null;
      comments: string | null;
    };
    /** @enum {string} */
    EvaluationPerformance: 'LOW' | 'MIDDLE' | 'HIGH';
    FixtureEvaluation: {
      performance: components['schemas']['EvaluationPerformance'];
      analyses: components['schemas']['EvaluationAnalyses'][];
    };
    FixtureEvaluations: {
      home: components['schemas']['FixtureEvaluation'];
      away: components['schemas']['FixtureEvaluation'];
    };
    LatestFixturesDTO: {
      home: components['schemas']['ExtendedFixtureDTO'][];
      away: components['schemas']['ExtendedFixtureDTO'][];
    };
    FixtureHighlights: components['schemas']['EventDTO'][];
    GetFixtureDTO: {
      data: components['schemas']['ExtendedFixtureDTO'];
      highlights: components['schemas']['FixtureHighlights'];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
