import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_INPUTS,
  DEFAULT_PERSONA,
  PERSONAS,
  calculateFootprint,
  buildAssistant,
  buildAlerts,
  buildGoals,
  buildRecommendations,
  formatCategory,
} from "../engine.mjs";

test("calculateFootprint returns a valid result", () => {
  const result = calculateFootprint(DEFAULT_INPUTS, DEFAULT_PERSONA);

  assert.ok(result.total > 0);
  assert.ok(result.score >= 0 && result.score <= 100);
  assert.equal(typeof result.biggestCategory, "string");
  assert.equal(result.recommendations.length, 3);
  assert.equal(result.goals.length, 4);
  assert.equal(result.badges.length, 5);
});

test("persona changes assistant guidance", () => {
  const commuterResult = calculateFootprint(DEFAULT_INPUTS, "student-commuter");
  const remoteResult = calculateFootprint(DEFAULT_INPUTS, "remote-worker");

  const commuterAssistant = buildAssistant(commuterResult, "student-commuter");
  const remoteAssistant = buildAssistant(remoteResult, "remote-worker");

  assert.match(commuterAssistant.summary, /college commuter|student/i);
  assert.match(remoteAssistant.summary, /remote worker/i);
  assert.notEqual(commuterAssistant.summary, remoteAssistant.summary);
});

test("persona changes recommendations and goals", () => {
  const result = calculateFootprint(DEFAULT_INPUTS, "family-home");
  const recommendationTitles = result.recommendations.map((item) => item.title.toLowerCase());
  const goalTitles = result.goals.map((item) => item.title.toLowerCase());

  assert.ok(recommendationTitles.some((title) => title.includes("family") || title.includes("carpool")));
  assert.ok(goalTitles.some((title) => title.includes("school") || title.includes("home")));
});

test("alerts and categories stay readable", () => {
  const result = calculateFootprint(DEFAULT_INPUTS, DEFAULT_PERSONA);
  const alerts = buildAlerts(result, DEFAULT_PERSONA);

  assert.equal(alerts.length, 3);
  assert.match(formatCategory("commute"), /Commute/);
  assert.ok(PERSONAS[DEFAULT_PERSONA]);
  assert.ok(buildGoals(DEFAULT_INPUTS, DEFAULT_PERSONA).every((goal) => goal.progress >= 0 && goal.progress <= 100));
  assert.ok(buildRecommendations(DEFAULT_INPUTS, result.breakdown, DEFAULT_PERSONA).every((item) => item.savings >= 0));
});
