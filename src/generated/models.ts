// Generated from openapi/reelscore.openapi.json. Do not edit manually.
import type { components } from './contracts.js';

export type MongoDbId = components['schemas']['MongoDbId'];
export type TeamId = components['schemas']['TeamId'];
export type TeamName = components['schemas']['TeamName'];
export type TeamLogo = components['schemas']['TeamLogo'];
export type PlayerId = components['schemas']['PlayerId'];
export type PlayerName = components['schemas']['PlayerName'];
export type CompetitionId = components['schemas']['CompetitionId'];
export type CompetitionName = components['schemas']['CompetitionName'];
export type CompetitionSeason = components['schemas']['CompetitionSeason'];
export type CompetitionRound = components['schemas']['CompetitionRound'];
export type Team = components['schemas']['Team'];
export type FixtureLeague = components['schemas']['FixtureLeague'];
export type StatusLong = components['schemas']['StatusLong'];
export type StatusShort = components['schemas']['StatusShort'];
export type EventTime = components['schemas']['EventTime'];
export type EventTeam = components['schemas']['EventTeam'];
export type EventPlayer = components['schemas']['EventPlayer'];
export type EventAssist = components['schemas']['EventAssist'];
export type EventType = components['schemas']['EventType'];
export type EventDetail = components['schemas']['EventDetail'];
export type EventDTO = components['schemas']['EventDTO'];
export type FixtureDetail = components['schemas']['FixtureDetail'];
export type FixtureId = components['schemas']['FixtureId'];
export type FixtureIdParameter = components['schemas']['FixtureIdParameter'];
export type FixtureDateString = components['schemas']['FixtureDateString'];
export type FixturePeriods = components['schemas']['FixturePeriods'];
export type VenueId = components['schemas']['VenueId'];
export type FixtureVenue = components['schemas']['FixtureVenue'];
export type FixtureStatus = components['schemas']['FixtureStatus'];
export type FixtureResult = components['schemas']['FixtureResult'];
export type Fixture = components['schemas']['Fixture'];
export type FixtureTeam = components['schemas']['FixtureTeam'];
export type MatchTeams = components['schemas']['MatchTeams'];
export type Goals = components['schemas']['Goals'];
export type Score = components['schemas']['Score'];
export type FixtureFinal = components['schemas']['FixtureFinal'];
export type FixtureDTO = components['schemas']['FixtureDTO'];
export type ExtendedFixtureDTO = components['schemas']['ExtendedFixtureDTO'];
export type PredictionProbability =
  components['schemas']['PredictionProbability'];
export type PredictionCorrectValue =
  components['schemas']['PredictionCorrectValue'];
export type FixturePrediction = components['schemas']['FixturePrediction'];
export type AnalysisLevel = components['schemas']['AnalysisLevel'];
export type AnalysisType = components['schemas']['AnalysisType'];
export type EvaluationAnalyses = components['schemas']['EvaluationAnalyses'];
export type EvaluationPerformance =
  components['schemas']['EvaluationPerformance'];
export type FixtureEvaluation = components['schemas']['FixtureEvaluation'];
export type FixtureEvaluations = components['schemas']['FixtureEvaluations'];
export type LatestFixturesDTO = components['schemas']['LatestFixturesDTO'];
export type FixtureHighlights = components['schemas']['FixtureHighlights'];
export type GetFixtureDTO = components['schemas']['GetFixtureDTO'];
export type OperationStatus = components['schemas']['OperationStatus'];
export type OperationError = components['schemas']['OperationError'];
export type OperationResponse<T> = Omit<
  components['schemas']['OperationResponse'],
  'documents'
> & { documents: T[] };
export type SearchType = components['schemas']['SearchType'];
export type FixtureSearchResult = components['schemas']['FixtureSearchResult'];
export type CompetitionSearchResult =
  components['schemas']['CompetitionSearchResult'];
export type TeamSearchResult = components['schemas']['TeamSearchResult'];
export type TeamDTO = components['schemas']['TeamDTO'];
export type TeamDetails = components['schemas']['TeamDetails'];
export type TeamVenue = components['schemas']['TeamVenue'];
export type SearchResult = components['schemas']['SearchResult'];
export type SearchResultGroup = components['schemas']['SearchResultGroup'];
export type BaseParameters = components['schemas']['BaseParameters'];
export type BasePaging = components['schemas']['BasePaging'];
export type RapidDTO<T> = Omit<
  components['schemas']['RapidDTO'],
  'response'
> & { response: T[] };
export type RapidEventsDTO = components['schemas']['RapidEventsDTO'];
export type RapidStatisticsDTO = components['schemas']['RapidStatisticsDTO'];
export type StatisticDTO = components['schemas']['StatisticDTO'];
export type StatisticsTeamDetails =
  components['schemas']['StatisticsTeamDetails'];
export type TeamStatistics = components['schemas']['TeamStatistics'];
export type StatisticItem = components['schemas']['StatisticItem'];
export type StatisticItemType = components['schemas']['StatisticItemType'];
export type StatisticItemValue = components['schemas']['StatisticItemValue'];
export type StandingsPlayed = components['schemas']['StandingsPlayed'];
export type StandingRanks = components['schemas']['StandingRanks'];
export type LeagueType = components['schemas']['LeagueType'];
export type CompetitionUrl = components['schemas']['CompetitionUrl'];
export type CompetitionNameTranslated =
  components['schemas']['CompetitionNameTranslated'];
export type CompetitionRoundTranslated =
  components['schemas']['CompetitionRoundTranslated'];
export type CompetitionRoundIndex =
  components['schemas']['CompetitionRoundIndex'];
export type CompetitionRounds = components['schemas']['CompetitionRounds'];
export type CompetitionRoundsData =
  components['schemas']['CompetitionRoundsData'];
export type CompetitionRoundsSeasons =
  components['schemas']['CompetitionRoundsSeasons'];
export type StandingsLeague = components['schemas']['StandingsLeague'];
export type LeagueBase = components['schemas']['LeagueBase'];
export type CompetitionLeague = components['schemas']['CompetitionLeague'];
export type Country = components['schemas']['Country'];
export type CoverageFixtures = components['schemas']['CoverageFixtures'];
export type SeasonCoverage = components['schemas']['SeasonCoverage'];
export type Season = components['schemas']['Season'];
export type CompetitionDTO = components['schemas']['CompetitionDTO'];
export type StatusTypeScheduled = components['schemas']['StatusTypeScheduled'];
export type StatusValueHalftime = components['schemas']['StatusValueHalftime'];
export type StatusTypePlaying = components['schemas']['StatusTypePlaying'];
export type StatusTypeFinished = components['schemas']['StatusTypeFinished'];
export type StatusTypePostponed = components['schemas']['StatusTypePostponed'];
export type StatusTypeCancelled = components['schemas']['StatusTypeCancelled'];
export type StatusTypeAbandoned = components['schemas']['StatusTypeAbandoned'];
export type StatusTypeNotPlayed = components['schemas']['StatusTypeNotPlayed'];
export type FixturePlayersWithStreak =
  components['schemas']['FixturePlayersWithStreak'];
export type GoalScorers = components['schemas']['GoalScorers'];
export type FixtureHomeOrAwayStrong =
  components['schemas']['FixtureHomeOrAwayStrong'];
export type AnalysesDTO = components['schemas']['AnalysesDTO'];
export type StatisticKey = components['schemas']['StatisticKey'];
export type RequiredStatisticKey =
  components['schemas']['RequiredStatisticKey'];
export type OptionalStatisticKey =
  components['schemas']['OptionalStatisticKey'];
export type FixturePerformance = components['schemas']['FixturePerformance'];
export type EvaluationTeam = components['schemas']['EvaluationTeam'];
export type EvaluationTeams = components['schemas']['EvaluationTeams'];
export type EvaluationDTO = components['schemas']['EvaluationDTO'];
export type EventResult = components['schemas']['EventResult'];
export type EventWithResult = components['schemas']['EventWithResult'];
export type HighlightEvent = components['schemas']['HighlightEvent'];
export type HighlightItem = components['schemas']['HighlightItem'];
export type HighlightSpacer = components['schemas']['HighlightSpacer'];
export type HighlightSpacerType = components['schemas']['HighlightSpacerType'];
export type PlayerBirth = components['schemas']['PlayerBirth'];
export type PlayerDetails = components['schemas']['PlayerDetails'];
export type TopScorer = components['schemas']['TopScorer'];
export type PlayerStatistic = components['schemas']['PlayerStatistic'];
export type StatisticTeam = components['schemas']['StatisticTeam'];
export type StatisticLeague = components['schemas']['StatisticLeague'];
export type StatisticGames = components['schemas']['StatisticGames'];
export type StatisticSubstitutes =
  components['schemas']['StatisticSubstitutes'];
export type StatisticShots = components['schemas']['StatisticShots'];
export type StatisticGoals = components['schemas']['StatisticGoals'];
export type StatisticPasses = components['schemas']['StatisticPasses'];
export type StatisticTackles = components['schemas']['StatisticTackles'];
export type StatisticDuels = components['schemas']['StatisticDuels'];
export type StatisticDribbles = components['schemas']['StatisticDribbles'];
export type StatisticFouls = components['schemas']['StatisticFouls'];
export type StatisticCards = components['schemas']['StatisticCards'];
export type StatisticPenalty = components['schemas']['StatisticPenalty'];
export type TopScorersDTO = components['schemas']['TopScorersDTO'];
export type FixturesWeekData = components['schemas']['FixturesWeekData'];
export type StandingsWeekData = components['schemas']['StandingsWeekData'];
export type StandingsDTO = components['schemas']['StandingsDTO'];
export type StandingsFilter = components['schemas']['StandingsFilter'];
export type TeamCoachDTO = components['schemas']['TeamCoachDTO'];
export type CoachBirth = components['schemas']['CoachBirth'];
export type CoachTeam = components['schemas']['CoachTeam'];
export type CareerItem = components['schemas']['CareerItem'];
export type CareerTeam = components['schemas']['CareerTeam'];
export type GetAllTeamCoachesDTO =
  components['schemas']['GetAllTeamCoachesDTO'];
export type LiveFixtureUpdateDTO =
  components['schemas']['LiveFixtureUpdateDTO'];
export type LiveFixturesUpdateDTO =
  components['schemas']['LiveFixturesUpdateDTO'];
export type LiveFixtureEventsUpdateDTO =
  components['schemas']['LiveFixtureEventsUpdateDTO'];
export type LiveFixtureEventsBatchUpdateDTO =
  components['schemas']['LiveFixtureEventsBatchUpdateDTO'];
export type GetAllTeamsDTO = components['schemas']['GetAllTeamsDTO'];
