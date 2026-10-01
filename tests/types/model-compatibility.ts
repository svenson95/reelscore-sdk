import type {
  CompetitionRoundsData,
  EventDTO,
  ExtendedFixtureDTO,
  FixtureDTO,
  FixturesWeekData,
  HighlightItem,
  OperationError,
  OperationResponse,
  RapidDTO,
  RapidEventsDTO,
  StatisticDTO,
  StatusTypePlaying,
  TeamCoachDTO,
  TeamDetails,
  TeamDTO,
  TeamSearchResult,
  StandingsDTO,
  TopScorersDTO,
} from '../../src/models/index.js';

type Equal<Actual, Expected> = (<Value>() => Value extends Actual
  ? 1
  : 2) extends <Value>() => Value extends Expected ? 1 : 2
  ? true
  : false;
type Assert<Condition extends true> = Condition;

// These preserve the consumer contracts that ordinary schema generation would widen.
export type TeamDatesRemainDates = Assert<Equal<TeamDTO['createdAt'], Date>>;
export type StandingDatesRemainDates = Assert<
  Equal<StandingsDTO['updatedAt'], Date>
>;
export type TopScorerDatesRemainDates = Assert<
  Equal<TopScorersDTO['createdAt'], Date>
>;
export type OperationDatesRemainDates = Assert<
  Equal<OperationResponse<FixtureDTO>['time'], Date>
>;
export type OperationsKeepPayloadGenerics = Assert<
  Equal<OperationResponse<FixtureDTO>['documents'], FixtureDTO[]>
>;
export type ProvidersKeepPayloadGenerics = Assert<
  Equal<RapidDTO<StatisticDTO>['response'], StatisticDTO[]>
>;
export type EventsKeepConcreteProviderPayloads = Assert<
  Equal<RapidEventsDTO['response'], EventDTO[]>
>;
export type UnknownErrorsRemainUnknown = Assert<Equal<OperationError, unknown>>;
export type CoachCareerRemainsSingleEntry = Assert<
  Equal<TeamCoachDTO['career']['length'], 1>
>;
export type RoundMapsKeepNumericKeys = Assert<
  Equal<keyof CompetitionRoundsData, number>
>;
export type SearchResultsKeepTeamPayloads = Assert<
  Equal<TeamSearchResult['data']['team'], TeamDetails>
>;
export type WeekDataKeepsNestedArrays = Assert<
  Equal<FixturesWeekData, ExtendedFixtureDTO[][]>
>;
export type HighlightsKeepTheirDiscriminant = Assert<
  Equal<HighlightItem['kind'], 'event' | 'spacer'>
>;
export type StatusGroupsKeepExistingStringTypes = Assert<
  Equal<StatusTypePlaying, string>
>;
