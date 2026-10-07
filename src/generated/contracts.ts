// Generated from openapi/reelscore.openapi.json. Do not edit manually.
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
    FixtureLeague: components['schemas']['LeagueBase'] & {
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
    OperationStatus: string;
    OperationError: unknown;
    OperationResponse: {
      status: components['schemas']['OperationStatus'];
      /** Format: date-time */
      time: Date;
      documents: unknown[];
      errors: components['schemas']['OperationError'];
    };
    /** @enum {string} */
    SearchType: 'fixtures' | 'competitions' | 'teams';
    FixtureSearchResult: {
      id: string | number;
      /** @enum {string} */
      type: 'fixtures';
      data: {
        fixture: components['schemas']['Fixture'];
        league: components['schemas']['FixtureLeague'];
        teams: components['schemas']['MatchTeams'];
      };
    };
    CompetitionSearchResult: {
      id: string | number;
      /** @enum {string} */
      type: 'competitions';
      data: {
        league: components['schemas']['FixtureLeague'];
      };
    };
    TeamSearchResult: {
      id: string | number;
      /** @enum {string} */
      type: 'teams';
      data: {
        team: components['schemas']['TeamDetails'];
      };
    };
    TeamDTO: {
      _id: components['schemas']['MongoDbId'];
      team: components['schemas']['TeamDetails'];
      venue: components['schemas']['TeamVenue'];
      /** Format: date-time */
      createdAt: Date;
      /** Format: date-time */
      updatedAt: Date;
    };
    TeamDetails: {
      id: components['schemas']['TeamId'];
      name: components['schemas']['TeamName'];
      code: string;
      country: string;
      founded: number;
      national: boolean;
      logo: components['schemas']['TeamLogo'];
    };
    TeamVenue: {
      id: components['schemas']['VenueId'];
      name: string;
      address: string;
      city: string;
      capacity: number;
      surface: string;
      image: string;
    };
    SearchResult:
      | components['schemas']['FixtureSearchResult']
      | components['schemas']['CompetitionSearchResult']
      | components['schemas']['TeamSearchResult'];
    SearchResultGroup: {
      type: components['schemas']['SearchType'];
      label: string;
      results: components['schemas']['SearchResult'][];
    };
    BaseParameters: {
      fixture: components['schemas']['FixtureId'];
    };
    BasePaging: {
      current: number;
      total: number;
    };
    RapidDTO: {
      parameters: components['schemas']['BaseParameters'];
      errors: unknown[];
      paging: components['schemas']['BasePaging'];
      response: unknown[];
    };
    RapidEventsDTO: {
      parameters: components['schemas']['BaseParameters'];
      errors: unknown[];
      paging: components['schemas']['BasePaging'];
      response: components['schemas']['EventDTO'][];
    };
    RapidStatisticsDTO: {
      parameters: components['schemas']['BaseParameters'];
      errors: unknown[];
      paging: components['schemas']['BasePaging'];
      response: components['schemas']['StatisticDTO'][];
    };
    StatisticDTO: {
      team: components['schemas']['StatisticsTeamDetails'];
      statistics: components['schemas']['TeamStatistics'];
    };
    StatisticsTeamDetails: {
      id: components['schemas']['TeamId'];
      name: components['schemas']['TeamName'];
      logo: components['schemas']['TeamLogo'];
    };
    TeamStatistics: components['schemas']['StatisticItem'][];
    StatisticItem: {
      type: components['schemas']['StatisticItemType'];
      value: components['schemas']['StatisticItemValue'];
    };
    /** @enum {string} */
    StatisticItemType:
      | 'Ball Possession'
      | 'Total Shots'
      | 'Shots on Goal'
      | 'Shots off Goal'
      | 'Corner Kicks'
      | 'Fouls'
      | 'Goalkeeper Saves'
      | 'Offsides'
      | 'Yellow Cards'
      | 'Red Cards'
      | 'Total passes'
      | 'Passes %';
    StatisticItemValue: string | number | null;
    StandingsPlayed: {
      played: number;
      win: number;
      draw: number;
      lose: number;
      goals: {
        for: number;
        against: number;
      };
    };
    StandingRanks: {
      rank: number;
      team: components['schemas']['Team'];
      points: number;
      goalsDiff: number;
      group: string;
      form: string | null;
      status: string;
      description: string | null;
      all: components['schemas']['StandingsPlayed'];
      home: components['schemas']['StandingsPlayed'];
      away: components['schemas']['StandingsPlayed'];
      update: string;
    };
    /** @enum {string} */
    LeagueType: 'League' | 'Cup' | 'Friendly' | 'International';
    CompetitionUrl: string;
    CompetitionNameTranslated: string;
    CompetitionRoundTranslated: string;
    CompetitionRoundIndex: number;
    CompetitionRounds: {
      [key: number]: components['schemas']['CompetitionRound'];
    };
    CompetitionRoundsData: {
      [key: number]: components['schemas']['CompetitionRounds'];
    };
    CompetitionRoundsSeasons: {
      [key: number]: components['schemas']['CompetitionRoundsData'];
    };
    StandingsLeague: components['schemas']['LeagueBase'] & {
      standings: components['schemas']['StandingRanks'][][];
    };
    LeagueBase: {
      id: components['schemas']['CompetitionId'];
      name: components['schemas']['CompetitionName'];
      country: string;
      logo: string;
      flag: string | null;
      season: components['schemas']['CompetitionSeason'];
    };
    CompetitionLeague: {
      id: components['schemas']['CompetitionId'];
      name: string;
      type: components['schemas']['LeagueType'];
      logo: string;
    };
    Country: {
      name: string;
      code: string;
      flag: string;
    };
    CoverageFixtures: {
      events: boolean;
      lineups: boolean;
      statistics_fixtures: boolean;
      statistics_players: boolean;
    };
    SeasonCoverage: {
      fixtures: components['schemas']['CoverageFixtures'];
      standings: boolean;
      players: boolean;
      top_scorers: boolean;
      top_assists: boolean;
      top_cards: boolean;
      injuries: boolean;
      predictions: boolean;
      odds: boolean;
    };
    Season: {
      year: number;
      start: string;
      end: string;
      current: boolean;
      coverage: components['schemas']['SeasonCoverage'];
    };
    CompetitionDTO: {
      _id: components['schemas']['MongoDbId'];
      league: components['schemas']['CompetitionLeague'];
      country: components['schemas']['Country'];
      seasons: components['schemas']['Season'][];
    };
    StatusTypeScheduled: string;
    /** @enum {string} */
    StatusValueHalftime: 'HT';
    StatusTypePlaying: string;
    StatusTypeFinished: string;
    /** @enum {string} */
    StatusTypePostponed: 'PST';
    /** @enum {string} */
    StatusTypeCancelled: 'CANC';
    /** @enum {string} */
    StatusTypeAbandoned: 'ABD';
    StatusTypeNotPlayed: string;
    FixturePlayersWithStreak: {
      home: components['schemas']['GoalScorers'];
      away: components['schemas']['GoalScorers'];
    };
    GoalScorers: components['schemas']['PlayerName'][];
    FixtureHomeOrAwayStrong: {
      home: boolean;
      away: boolean;
    };
    AnalysesDTO: {
      playersWithStreak: components['schemas']['FixturePlayersWithStreak'];
      homeOrAwayStrong: components['schemas']['FixtureHomeOrAwayStrong'] | null;
    };
    StatisticKey:
      | components['schemas']['RequiredStatisticKey']
      | components['schemas']['OptionalStatisticKey'];
    /** @enum {string} */
    RequiredStatisticKey:
      | 'ballPossession'
      | 'shotsTotal'
      | 'shotsOnGoal'
      | 'shotsOffGoal'
      | 'cornerKicks'
      | 'fouls'
      | 'goalkeeperSaves'
      | 'offsides'
      | 'yellowCards'
      | 'redCards';
    /** @enum {string} */
    OptionalStatisticKey: 'passesTotal' | 'passAccuracy';
    /** @enum {string} */
    FixturePerformance:
      | 'MATCH_NOT_STARTED'
      | 'MATCH_POSTPONED'
      | 'NO_STATISTICS_AVAILABLE'
      | 'LOW'
      | 'MIDDLE'
      | 'HIGH';
    EvaluationTeam: {
      performances: components['schemas']['FixturePerformance'][];
      results: components['schemas']['FixtureResult'][];
    };
    EvaluationTeams: {
      home: components['schemas']['EvaluationTeam'];
      away: components['schemas']['EvaluationTeam'];
    };
    EvaluationDTO: {
      fixture: components['schemas']['FixtureId'];
      teams: components['schemas']['EvaluationTeams'];
    };
    EventResult: {
      home: number;
      away: number;
    };
    EventWithResult: components['schemas']['EventDTO'] & {
      result: components['schemas']['EventResult'];
    };
    HighlightEvent: components['schemas']['EventWithResult'] & {
      /** @enum {string} */
      kind: 'event';
    };
    HighlightItem:
      | components['schemas']['HighlightEvent']
      | components['schemas']['HighlightSpacer'];
    HighlightSpacer: {
      /** @enum {string} */
      kind: 'spacer';
      type: components['schemas']['HighlightSpacerType'];
      label: string;
    };
    /** @enum {string} */
    HighlightSpacerType: 'halftime' | 'penalty-shootout';
    PlayerBirth: {
      date: string;
      place: string;
      country: string;
    };
    PlayerDetails: {
      id: number;
      name: string;
      firstname: string;
      lastname: string;
      age: number;
      birth: components['schemas']['PlayerBirth'];
      nationality: string;
      height: string;
      weight: string;
      injured: boolean;
      photo: string;
    };
    TopScorer: {
      player: components['schemas']['PlayerDetails'];
      statistics: components['schemas']['PlayerStatistic'][];
    };
    PlayerStatistic: {
      team: components['schemas']['StatisticTeam'];
      league: components['schemas']['StatisticLeague'];
      games: components['schemas']['StatisticGames'];
      substitutes: components['schemas']['StatisticSubstitutes'];
      shots: components['schemas']['StatisticShots'];
      goals: components['schemas']['StatisticGoals'];
      passes: components['schemas']['StatisticPasses'];
      tackles: components['schemas']['StatisticTackles'];
      duels: components['schemas']['StatisticDuels'];
      dribbles: components['schemas']['StatisticDribbles'];
      fouls: components['schemas']['StatisticFouls'];
      cards: components['schemas']['StatisticCards'];
      penalty: components['schemas']['StatisticPenalty'];
    };
    StatisticTeam: {
      id: number;
      name: string;
      logo: string;
    };
    StatisticLeague: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string | null;
      season: number;
    };
    StatisticGames: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: number | null;
      position: string;
      rating: number | null;
      captain: boolean;
    };
    StatisticSubstitutes: {
      in: number;
      out: number;
      bench: number;
    };
    StatisticShots: {
      total: number | null;
      on: number | null;
    };
    StatisticGoals: {
      total: number | null;
      conceded: number | null;
      assists: number | null;
      saves: number | null;
    };
    StatisticPasses: {
      total: number | null;
      key: number | null;
      accuracy: number | null;
    };
    StatisticTackles: {
      total: number | null;
      blocks: number | null;
      interceptions: number | null;
    };
    StatisticDuels: {
      total: number | null;
      won: number | null;
    };
    StatisticDribbles: {
      attempts: number | null;
      success: number | null;
      past: number | null;
    };
    StatisticFouls: {
      drawn: number | null;
      committed: number | null;
    };
    StatisticCards: {
      yellow: number | null;
      yellowred: number | null;
      red: number | null;
    };
    StatisticPenalty: {
      won: number | null;
      commited: number | null;
      scored: number | null;
      missed: number | null;
      saved: number | null;
    };
    TopScorersDTO: {
      _id: components['schemas']['MongoDbId'];
      parameters: {
        league: string;
        season: string;
      };
      response: components['schemas']['TopScorer'][];
      /** Format: date-time */
      createdAt: Date;
      /** Format: date-time */
      updatedAt: Date;
    };
    TopAssistsDTO: {
      _id: components['schemas']['MongoDbId'];
      parameters: {
        league: string;
        season: string;
      };
      response: components['schemas']['TopScorer'][];
      /** Format: date-time */
      createdAt: Date;
      /** Format: date-time */
      updatedAt: Date;
    };
    FixturesWeekData: components['schemas']['ExtendedFixtureDTO'][][];
    StandingsWeekData: components['schemas']['StandingsDTO'][][];
    StandingsDTO: {
      _id: components['schemas']['MongoDbId'];
      league: components['schemas']['StandingsLeague'];
      /** Format: date-time */
      createdAt: Date;
      /** Format: date-time */
      updatedAt: Date;
    };
    StandingsFilter: {
      'league.id': components['schemas']['CompetitionId'];
      'league.season': number;
    };
    TeamCoachDTO: {
      id: number;
      name: string;
      firstname: string;
      lastname: string;
      age: number;
      birth: components['schemas']['CoachBirth'];
      nationality: string;
      height: string;
      weight: string;
      photo: string;
      team: components['schemas']['CoachTeam'];
      career: components['schemas']['CareerItem'][];
    };
    CoachBirth: {
      date: string;
      place: string;
      country: string;
    };
    CoachTeam: {
      id: number;
      name: string;
      logo: string;
    };
    CareerItem: {
      team: components['schemas']['CareerTeam'];
      start: string;
      end: string | null;
    };
    CareerTeam: {
      id: number;
      name: string;
      logo: string;
    };
    GetAllTeamCoachesDTO: {
      data: components['schemas']['TeamCoachesDocumentDTO'][];
      length: number;
    };
    TeamCoachesDocumentDTO: {
      _id: string;
      parameters: {
        team: string;
      };
      response: components['schemas']['TeamCoachDTO'][];
      /** Format: date-time */
      lastFetchedAt?: string;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
      __v: number;
    };
    LiveFixtureUpdateDTO: {
      fixtureId: components['schemas']['FixtureId'];
      operation: {
        status: components['schemas']['OperationStatus'];
        /** Format: date-time */
        time: Date;
        documents: components['schemas']['FixtureDTO'][];
        errors: components['schemas']['OperationError'];
      };
    };
    LiveFixturesUpdateDTO: {
      updates: components['schemas']['LiveFixtureUpdateDTO'][];
    };
    LiveFixtureEventsUpdateDTO: {
      fixtureId: components['schemas']['FixtureId'];
      operation: {
        status: components['schemas']['OperationStatus'];
        /** Format: date-time */
        time: Date;
        documents: components['schemas']['RapidEventsDTO'][];
        errors: components['schemas']['OperationError'];
      };
    };
    LiveFixtureEventsBatchUpdateDTO: {
      updates: components['schemas']['LiveFixtureEventsUpdateDTO'][];
    };
    GetAllTeamsDTO: {
      data: components['schemas']['TeamDTO'][];
      length: number;
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
