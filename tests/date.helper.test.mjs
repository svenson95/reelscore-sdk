import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  addDays,
  formatCalendarWeekKey,
  formatDateToYearMonthDay,
  formatFixtureTime,
  getWeekdayIndex,
  getWeekStartFromKey,
  startOfWeek,
} from 'reelscore-sdk/helpers';

test('calendar dates follow Berlin across the UTC day boundary', () => {
  const timestamp = '2026-09-30T22:30:00.000Z';

  assert.equal(formatDateToYearMonthDay(timestamp), '2026-10-01');
  assert.equal(formatDateToYearMonthDay(new Date(timestamp)), '2026-10-01');
});

test('ISO week keys and Mondays round-trip across a year boundary', () => {
  assert.equal(formatCalendarWeekKey('2021-01-01T12:00:00Z'), '2020-W53');
  assert.equal(getWeekStartFromKey('2020-W53'), '2020-12-28');
  assert.equal(getWeekStartFromKey('2021-W01'), '2021-01-04');
  assert.equal(startOfWeek('2021-01-01').format('YYYY-MM-DD'), '2020-12-28');
  assert.throws(
    () => getWeekStartFromKey('2021-01'),
    /Invalid calendar week key/
  );
});

test('adding calendar days preserves dates across both daylight saving changes', () => {
  assert.equal(addDays('2026-03-28', 2), '2026-03-30');
  assert.equal(addDays('2026-10-24', 2), '2026-10-26');
  assert.equal(addDays('2026-03-30', -2), '2026-03-28');
  assert.equal(getWeekdayIndex('2026-03-30'), 0);
  assert.equal(getWeekdayIndex('2026-03-29'), 6);
});

test('kickoff times interpret Unix seconds in Berlin winter and summer time', () => {
  const winter = Date.parse('2026-01-01T18:30:00Z') / 1000;
  const summer = Date.parse('2026-07-01T18:30:00Z') / 1000;

  assert.equal(formatFixtureTime(winter), '19:30');
  assert.equal(formatFixtureTime(summer), '20:30');
  assert.equal(formatFixtureTime(null), '');
  assert.equal(formatFixtureTime(undefined), '');
  assert.equal(formatFixtureTime(Number.NaN), '');
});
