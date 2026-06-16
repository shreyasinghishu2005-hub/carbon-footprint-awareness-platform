const STORAGE_KEYS = {
  settings: "greenpulse-settings",
  history: "greenpulse-history",
  journal: "greenpulse-journal",
};

const DEFAULT_INPUTS = {
  carKm: 120,
  transitKm: 35,
  shortFlights: 1,
  electricityKwh: 220,
  gasTherms: 18,
  meatMeals: 8,
  plantMeals: 10,
  wasteBags: 2,
  recyclingRate: 45,
};

const COMMUNITY = [
  { name: "Ava", score: 91, note: "City transit regular" },
  { name: "Mila", score: 86, note: "Home efficiency fan" },
  { name: "Noah", score: 81, note: "Low-waste routine" },
  { name: "Aria", score: 77, note: "Plant-first meals" },
  { name: "Kai", score: 74, note: "Weekend cyclist" },
];

const JOURNAL_ACTIONS = {
  walk: {
    title: "Walked instead of driving",
    detail: "Replaced a short car trip with a low-carbon walk.",
    impact: 3.4,
  },
  bike: {
    title: "Logged a bike ride",
    detail: "Used active transport for a cleaner commute.",
    impact: 5.1,
  },
  plant: {
    title: "Picked a plant-based meal",
    detail: "Swapped one meal toward a lighter food footprint.",
    impact: 4.4,
  },
  save: {
    title: "Saved household energy",
    detail: "Kept lights, screens, or heating use in check.",
    impact: 2.8,
  },
};

const OFFSET_OFFERS = [
  {
    title: "Urban tree bundle",
    detail: "Support native tree planting in compact city corridors.",
    price: "$12",
    impact: "120 kg CO2e",
  },
  {
    title: "Solar credit share",
    detail: "Back verified renewable energy for a stronger grid mix.",
    price: "$18",
    impact: "180 kg CO2e",
  },
  {
    title: "Climate resilience fund",
    detail: "Fund water, soil, and restoration projects in local regions.",
    price: "$24",
    impact: "250 kg CO2e",
  },
];

const LOCATION_POOLS = {
  commute: [
    { title: "EV charging hub", detail: "1.2 km away for cleaner car trips." },
    { title: "Metro station", detail: "Fast public transport for city travel." },
    { title: "Bike share dock", detail: "Quick pickup for short local rides." },
  ],
  home: [
    { title: "Energy audit center", detail: "Find efficient upgrades and rebates." },
    { title: "Appliance repair shop", detail: "Repair before replacing to cut waste." },
    { title: "Solar co-op", detail: "Compare rooftop clean energy plans." },
  ],
  food: [
    { title: "Plant-forward cafe", detail: "Easy lower-carbon meal swaps nearby." },
    { title: "Farmers market", detail: "Seasonal produce with a smaller footprint." },
    { title: "Compost drop-off", detail: "Keep organic waste out of landfill." },
  ],
  waste: [
    { title: "Recycling center", detail: "Drop off paper, metal, and plastics." },
    { title: "Refill station", detail: "Reuse containers and cut packaging waste." },
    { title: "Zero-waste store", detail: "Buy essentials with less single-use waste." },
  ],
};

const QUIZ = {
  question: "Which action usually saves the most emissions?",
  answers: [
    {
      label: "Swap one beef meal for a plant-based meal",
      correct: true,
      response: "Correct. Diet shifts can deliver a surprisingly large reduction with low effort.",
    },
    {
      label: "Turn off one lamp for an hour",
      correct: false,
      response: "A helpful habit, but it usually saves less than food or travel changes.",
    },
    {
      label: "Use a reusable water bottle",
      correct: false,
      response: "Great for waste reduction, but the carbon savings are usually smaller than meal swaps.",
    },
  ],
};

function ensureNavigationMarkup() {
  const topbar = document.querySelector(".topbar");
  const topnav = document.querySelector(".topnav");

  if (!topbar || !topnav) {
    return;
  }

  topnav.id = topnav.id || "primaryNav";

  if (!document.getElementById("navToggle")) {
    const navToggle = document.createElement("button");
    navToggle.id = "navToggle";
    navToggle.type = "button";
    navToggle.className = "nav-toggle";
    navToggle.setAttribute("aria-controls", "primaryNav");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    navToggle.innerHTML = `
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    `;
    topbar.insertBefore(navToggle, topnav);
  }

  if (!document.getElementById("navOverlay")) {
    const navOverlay = document.createElement("button");
    navOverlay.id = "navOverlay";
    navOverlay.type = "button";
    navOverlay.className = "nav-overlay";
    navOverlay.setAttribute("aria-label", "Close menu");
    topbar.insertAdjacentElement("afterend", navOverlay);
  }

  const saveSnapshot = document.getElementById("saveSnapshot");
  if (saveSnapshot && saveSnapshot.parentElement !== topnav) {
    saveSnapshot.classList.add("topnav__action");
    topnav.appendChild(saveSnapshot);
  }
}

ensureNavigationMarkup();

const refs = {
  main: document.querySelector("main"),
  form: document.getElementById("carbonForm"),
  saveSnapshot: document.getElementById("saveSnapshot"),
  navToggle: document.getElementById("navToggle"),
  navOverlay: document.getElementById("navOverlay"),
  topnav: document.querySelector(".topnav"),
  resetDemo: document.getElementById("resetDemo"),
  commandCenter: document.getElementById("commandCenter"),
  assistantScore: document.getElementById("assistantScore"),
  assistantSummary: document.getElementById("assistantSummary"),
  assistantPlan: document.getElementById("assistantPlan"),
  alertList: document.getElementById("alertList"),
  marketList: document.getElementById("marketList"),
  locationList: document.getElementById("locationList"),
  journalList: document.getElementById("journalList"),
  journalSummary: document.getElementById("journalSummary"),
  exportReport: document.getElementById("exportReport"),
  breakdownBars: document.getElementById("breakdownBars"),
  trendChart: document.getElementById("trendChart"),
  goalGrid: document.getElementById("goalGrid"),
  badgeStrip: document.getElementById("badgeStrip"),
  badgeHint: document.getElementById("badgeHint"),
  recommendationList: document.getElementById("recommendationList"),
  quizOptions: document.getElementById("quizOptions"),
  quizResult: document.getElementById("quizResult"),
  leaderboardList: document.getElementById("leaderboardList"),
  snapshotList: document.getElementById("snapshotList"),
  toast: document.getElementById("toast"),
  heroStats: document.querySelectorAll("[data-hero-stat]"),
  metricValues: document.querySelectorAll("[data-metric]"),
  forecastValues: document.querySelectorAll("[data-forecast]"),
  breakdownTop: document.querySelector("[data-breakdown-top]"),
  trendLabel: document.querySelector("[data-trend-label]"),
  communityRank: document.querySelector('[data-community="rank"]'),
  communityAverage: document.querySelector('[data-community="average"]'),
  inputOutputs: document.querySelectorAll("[data-value-for]"),
};

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const decimalFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

const state = {
  inputs: loadJson(STORAGE_KEYS.settings, DEFAULT_INPUTS),
  history: loadJson(STORAGE_KEYS.history, []),
  journal: loadJson(STORAGE_KEYS.journal, []),
};

let toastTimer = null;

const inputConfig = {
  carKm: { unit: "km/week" },
  transitKm: { unit: "km/week" },
  shortFlights: { unit: "flights/mo" },
  electricityKwh: { unit: "kWh/mo" },
  gasTherms: { unit: "therms/mo" },
  meatMeals: { unit: "meals/week" },
  plantMeals: { unit: "meals/week" },
  wasteBags: { unit: "bags/week" },
  recyclingRate: { unit: "%" },
};

function cloneValue(value) {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return cloneValue(fallback);
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) ? parsed : cloneValue(fallback);
    }
    return { ...fallback, ...parsed };
  } catch {
    return cloneValue(fallback);
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local storage is optional for this prototype.
  }
}

function formatCarbon(value) {
  if (value >= 1000) {
    return `${decimalFormatter.format(value / 1000)} t CO2e`;
  }
  return `${numberFormatter.format(value)} kg CO2e`;
}

function formatShortCarbon(value) {
  return value >= 1000 ? `${decimalFormatter.format(value / 1000)} t` : `${numberFormatter.format(value)} kg`;
}

function formatPercent(value) {
  return `${Math.round(value)}%`;
}

function readInputs() {
  if (!refs.form) {
    return cloneValue(state.inputs);
  }

  const inputs = {};
  for (const [key, config] of Object.entries(inputConfig)) {
    const element = refs.form.querySelector(`[data-input="${key}"]`);
    const rawValue = Number(element.value);
    inputs[key] = Number.isFinite(rawValue) ? rawValue : DEFAULT_INPUTS[key];
    if (config.unit === "%") {
      inputs[key] = clamp(inputs[key], 0, 100);
    }
  }
  return inputs;
}

function applyInputs(inputs) {
  if (!refs.form) {
    return;
  }

  for (const [key, value] of Object.entries(inputs)) {
    const element = refs.form.querySelector(`[data-input="${key}"]`);
    if (element) {
      element.value = value;
    }
  }
  updateInputLabels(inputs);
}

function updateInputLabels(inputs) {
  if (!refs.form) {
    return;
  }

  for (const [key, value] of Object.entries(inputs)) {
    const label = refs.form.querySelector(`[data-value-for="${key}"]`);
    if (!label) {
      continue;
    }
    switch (key) {
      case "carKm":
      case "transitKm":
        label.textContent = `${numberFormatter.format(value)} km/week`;
        break;
      case "shortFlights":
        label.textContent = `${numberFormatter.format(value)} flights/mo`;
        break;
      case "electricityKwh":
        label.textContent = `${numberFormatter.format(value)} kWh/mo`;
        break;
      case "gasTherms":
        label.textContent = `${numberFormatter.format(value)} therms/mo`;
        break;
      case "meatMeals":
      case "plantMeals":
        label.textContent = `${numberFormatter.format(value)} meals/week`;
        break;
      case "wasteBags":
        label.textContent = `${numberFormatter.format(value)} bags/week`;
        break;
      case "recyclingRate":
        label.textContent = `${numberFormatter.format(value)}%`;
        break;
      default:
        label.textContent = String(value);
        break;
    }
  }
}

function calculateFootprint(inputs) {
  const commute = (inputs.carKm * 0.21 + inputs.transitKm * 0.08) * 4.33 + inputs.shortFlights * 220;
  const home = inputs.electricityKwh * 0.82 + inputs.gasTherms * 5.3;
  const food = (inputs.meatMeals * 4.8 + inputs.plantMeals * 1.1) * 4.33;
  const waste = inputs.wasteBags * 1.5 * 4.33 * (1 - clamp(inputs.recyclingRate, 0, 100) * 0.0035);

  const breakdown = { commute, home, food, waste };
  const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
  const weekly = total / 4.33;
  const annual = total * 12;
  const target = 300;
  const targetGap = total - target;
  const score = clamp(Math.round(130 - total / 5), 0, 100);
  const trees = annual / 21;
  const biggestCategory = Object.entries(breakdown).sort((left, right) => right[1] - left[1])[0][0];
  const percentages = Object.fromEntries(
    Object.entries(breakdown).map(([key, value]) => [key, total === 0 ? 0 : (value / total) * 100]),
  );

  const recommendations = buildRecommendations(inputs, breakdown);
  const potentialSavings = recommendations.reduce((sum, item) => sum + item.savings, 0);
  const goals = buildGoals(inputs);
  const badges = buildBadges(inputs, total, goals);

  return {
    breakdown,
    percentages,
    total,
    weekly,
    annual,
    target,
    targetGap,
    score,
    trees,
    biggestCategory,
    recommendations,
    potentialSavings,
    goals,
    badges,
  };
}

function buildRecommendations(inputs, breakdown) {
  const categoryOrder = Object.entries(breakdown).sort((left, right) => right[1] - left[1]);
  const recommendations = [];

  for (const [category, value] of categoryOrder.slice(0, 3)) {
    if (category === "commute") {
      recommendations.push({
        title: "Shift two car days to transit",
        detail: `Commute is your largest source. Replacing a couple of driving days can lower emissions quickly.`,
        savings: value * 0.18,
      });
    }

    if (category === "home") {
      recommendations.push({
        title: "Trim electricity use by 10%",
        detail: "LED lighting, smart strips, and better thermostat habits make this a low-friction win.",
        savings: value * 0.1,
      });
    }

    if (category === "food") {
      const weeklySwitch = Math.max(2, Math.round(inputs.meatMeals * 0.3));
      recommendations.push({
        title: "Swap several meat meals for plants",
        detail: `Replacing ${weeklySwitch} meat-based meals each week with plant-based meals creates a meaningful drop.`,
        savings: weeklySwitch * (4.8 - 1.1) * 4.33,
      });
    }

    if (category === "waste") {
      recommendations.push({
        title: "Raise recycling and composting rates",
        detail: "A cleaner waste stream lowers landfill emissions and keeps useful material in circulation.",
        savings: value * 0.22,
      });
    }
  }

  if (recommendations.length < 3) {
    recommendations.push({
      title: "Track one saved day each week",
      detail: "Log changes consistently to turn awareness into a habit loop.",
      savings: 10,
    });
  }

  return recommendations.slice(0, 3);
}

function buildGoals(inputs) {
  const travelTotal = inputs.carKm + inputs.transitKm;
  const transitProgress = travelTotal === 0 ? 100 : clamp((inputs.transitKm / travelTotal) * 100, 0, 100);
  const energyProgress = clamp(((240 - inputs.electricityKwh) / 120) * 100, 0, 100);
  const foodProgress = clamp((inputs.plantMeals / Math.max(inputs.meatMeals + inputs.plantMeals, 1)) * 100, 0, 100);
  const wasteProgress = clamp(inputs.recyclingRate * 0.7 + (10 - inputs.wasteBags) * 5, 0, 100);

  return [
    {
      title: "Transit Tuesday",
      detail: "Make public transport your default for at least two commuting days per week.",
      progress: transitProgress,
      reward: "Mobility badge",
    },
    {
      title: "Power Saver",
      detail: "Bring household electricity below the 160 kWh monthly benchmark.",
      progress: energyProgress,
      reward: "Energy badge",
    },
    {
      title: "Plant Forward",
      detail: "Move toward more plant-based meals than meat-heavy meals each week.",
      progress: foodProgress,
      reward: "Food badge",
    },
    {
      title: "Circular Home",
      detail: "Raise recycling rates and cut waste bags to reduce landfill impact.",
      progress: wasteProgress,
      reward: "Waste badge",
    },
  ];
}

function buildBadges(inputs, total, goals) {
  const transitShare = inputs.carKm + inputs.transitKm === 0 ? 0 : inputs.transitKm / (inputs.carKm + inputs.transitKm);
  const foodShare = inputs.meatMeals + inputs.plantMeals === 0 ? 0 : inputs.plantMeals / (inputs.meatMeals + inputs.plantMeals);

  return [
    {
      name: "Climate Starter",
      active: total <= 650,
      detail: "Monthly footprint under 650 kg CO2e.",
    },
    {
      name: "Low Carbon Hero",
      active: total <= 300,
      detail: "Monthly footprint under the target range.",
    },
    {
      name: "Transit Champion",
      active: transitShare >= 0.5,
      detail: "Transit covers at least half of your commute distance.",
    },
    {
      name: "Plant Forward",
      active: foodShare >= 0.6,
      detail: "Plant-based meals make up most of the week.",
    },
    {
      name: "Circular Home",
      active: goals[3].progress >= 70,
      detail: "Recycling and waste habits are on a strong track.",
    },
  ];
}

function buildAssistant(result) {
  const bestRecommendation = result.recommendations[0];
  const targetPhrase =
    result.targetGap > 0
      ? `close the remaining ${Math.round(result.targetGap)} kg gap to the 300 kg target`
      : "stay below the 300 kg target";
  const summary =
    result.score >= 80
      ? `You're in a strong climate lane. Protect the momentum by focusing on ${formatCategory(result.biggestCategory).toLowerCase()} and helping the team ${targetPhrase}.`
      : result.score >= 60
        ? `Good foundation. Your fastest win is ${bestRecommendation.title.toLowerCase()}, then hold a steady snapshot rhythm to make the trend visible.`
        : `There is a lot of upside here. Start with ${bestRecommendation.title.toLowerCase()} and one simple journal habit so the next week looks different.`;

  const plan = [
    {
      title: `Lead with ${formatCategory(result.biggestCategory)}`,
      text: bestRecommendation.detail,
    },
    {
      title: "Lock a weekly snapshot",
      text: "Save the current reading once a week to prove progress and create a trend line.",
    },
    {
      title: "Stack one daily win",
      text: "Use the journal buttons to keep movement, meals, and energy habits visible.",
    },
  ];

  return {
    scoreLabel: `${result.score}/100`,
    summary,
    plan,
  };
}

function buildAlerts(result) {
  const alerts = [];
  const commuteShare = result.total === 0 ? 0 : result.breakdown.commute / result.total;
  const homeShare = result.total === 0 ? 0 : result.breakdown.home / result.total;
  const foodShare = result.total === 0 ? 0 : result.breakdown.food / result.total;

  if (result.targetGap > 0) {
    alerts.push({
      tone: "high",
      title: "Above monthly target",
      detail: `You're about ${Math.round(result.targetGap)} kg CO2e above the 300 kg target. The quickest move is your biggest lever.`,
    });
  } else {
    alerts.push({
      tone: "good",
      title: "Inside the target band",
      detail: `You're about ${Math.abs(Math.round(result.targetGap))} kg CO2e below the 300 kg target. Nice consistency.`,
    });
  }

  if (commuteShare >= 0.4) {
    alerts.push({
      tone: "high",
      title: "Commute is still dominant",
      detail: "A transit swap or one shared ride day can change the chart quickly.",
    });
  } else {
    alerts.push({
      tone: "good",
      title: "Travel mix is balanced",
      detail: "Your commute profile is not dominating the footprint right now.",
    });
  }

  if (homeShare >= 0.3) {
    alerts.push({
      tone: "medium",
      title: "Home energy matters",
      detail: "Lighting, thermostat behavior, and standby loads can unlock an easy reduction.",
    });
  } else if (foodShare >= 0.3) {
    alerts.push({
      tone: "medium",
      title: "Food choices are shaping the curve",
      detail: "A few plant-based swaps can create visible monthly savings.",
    });
  }

  if (alerts.length < 3) {
    alerts.push({
      tone: "good",
      title: "Journal streak opportunity",
      detail: "Log one eco win today so your sustainability story is easier to show and share.",
    });
  }

  return alerts.slice(0, 3);
}

function buildLocations(result) {
  const pools = LOCATION_POOLS[result.biggestCategory] || LOCATION_POOLS.commute;
  return pools.slice(0, 3);
}

function formatJournalDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Today";
  }

  const dayDifference = Math.round((Date.now() - date.getTime()) / 86400000);
  if (dayDifference <= 0) {
    return "Today";
  }

  if (dayDifference === 1) {
    return "Yesterday";
  }

  return dateFormatter.format(date);
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}

function downloadReport(result) {
  const lines = [
    "GreenPulse Sustainability Report",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    `Monthly footprint: ${formatCarbon(result.total)}`,
    `Weekly average: ${formatCarbon(result.weekly)}`,
    `Eco score: ${result.score}/100`,
    `Top lever: ${formatCategory(result.biggestCategory)}`,
    `Target gap: ${Math.abs(Math.round(result.targetGap))} kg CO2e ${result.targetGap > 0 ? "above" : "below"} target`,
    "",
    "Breakdown:",
    ...Object.entries(result.breakdown).map(([key, value]) => `- ${formatCategory(key)}: ${formatCarbon(value)}`),
    "",
    "Recommendations:",
    ...result.recommendations.map((item) => `- ${item.title} (${formatCarbon(item.savings)} potential savings)`),
    "",
    `Snapshots saved: ${state.history.length}`,
    `Journal entries: ${state.journal.length}`,
  ];

  downloadTextFile("greenpulse-report.txt", lines.join("\n"));
}

function downloadCertificate(result) {
  const lines = [
    "GreenPulse Sustainability Certificate",
    "",
    "This certifies a visible commitment to lower-carbon habits.",
    "",
    `Footprint: ${formatCarbon(result.total)}`,
    `Score: ${result.score}/100`,
    `Best lever: ${formatCategory(result.biggestCategory)}`,
    `Community rank: ${refs.communityRank?.textContent || "Pending"}`,
    "",
    "Issued by GreenPulse",
  ];

  downloadTextFile("greenpulse-certificate.txt", lines.join("\n"));
}

function render() {
  const inputs = refs.form ? readInputs() : state.inputs;
  if (refs.form) {
    state.inputs = inputs;
    saveJson(STORAGE_KEYS.settings, inputs);
  }

  const result = calculateFootprint(inputs);

  updateInputLabels(inputs);
  updateHero(result);
  updateMetrics(result);
  renderCommandCenter(result);
  renderBreakdown(result);
  renderTrend(result);
  renderGoals(result);
  renderBadges(result);
  renderRecommendations(result);
  renderLeaderboard(result);
  renderSnapshots(result);
  updateForecast(result);
  updateCommunitySummary(result);
}

function renderCommandCenter(result) {
  if (!refs.commandCenter) {
    return;
  }

  renderAssistant(result);
  renderAlerts(result);
  renderMarketplace(result);
  renderLocations(result);
  renderJournal(result);
}

function renderAssistant(result) {
  if (!refs.assistantScore || !refs.assistantSummary || !refs.assistantPlan) {
    return;
  }

  const assistant = buildAssistant(result);
  refs.assistantScore.textContent = assistant.scoreLabel;
  refs.assistantSummary.textContent = assistant.summary;

  refs.assistantPlan.innerHTML = assistant.plan
    .map(
      (item) => `
        <li>
          <strong>${item.title}</strong>
          <div>${item.text}</div>
        </li>
      `,
    )
    .join("");
}

function renderAlerts(result) {
  if (!refs.alertList) {
    return;
  }

  const alerts = buildAlerts(result);
  refs.alertList.innerHTML = alerts
    .map(
      (alert) => `
        <article class="alert-item alert-item--${alert.tone}">
          <strong>${alert.title}</strong>
          <p>${alert.detail}</p>
        </article>
      `,
    )
    .join("");
}

function renderMarketplace(result) {
  if (!refs.marketList) {
    return;
  }

  const topRecommendation = result.recommendations[0];
  refs.marketList.innerHTML = OFFSET_OFFERS.map((offer, index) => {
    const isPrimary = index === 0;
    const estimate = isPrimary && topRecommendation ? `${formatCarbon(topRecommendation.savings)} of your footprint` : offer.impact;
    return `
      <article class="market-item">
        <div>
          <strong>${offer.title}</strong>
          <p>${offer.detail}</p>
          <div class="market-meta">
            <span class="pill">${offer.price}</span>
            <span class="pill">${estimate}</span>
          </div>
        </div>
        <button class="pill" type="button" data-market="${offer.title}">Support</button>
      </article>
    `;
  }).join("");
}

function renderLocations(result) {
  if (!refs.locationList) {
    return;
  }

  const locations = buildLocations(result);
  refs.locationList.innerHTML = locations
    .map(
      (location) => `
        <article class="location-item">
          <div>
            <strong>${location.title}</strong>
            <p>${location.detail}</p>
          </div>
          <span class="pill">Nearby</span>
        </article>
      `,
    )
    .join("");
}

function renderJournal(result) {
  if (!refs.journalList || !refs.journalSummary) {
    return;
  }

  const saved = state.journal.reduce((sum, entry) => sum + (Number(entry.impact) || 0), 0);
  refs.journalSummary.textContent = `${state.journal.length} logs · ${formatShortCarbon(saved)} saved`;

  if (state.journal.length === 0) {
    refs.journalList.innerHTML = `
      <article class="journal-item">
        <div>
          <strong>No journal entries yet</strong>
          <p>Use the buttons above to record a walk, bike ride, plant meal, or energy win.</p>
        </div>
        <span class="pill">Start here</span>
      </article>
    `;
    return;
  }

  refs.journalList.innerHTML = state.journal.slice(0, 4).map((entry) => `
    <article class="journal-item">
      <div>
        <strong>${entry.title}</strong>
        <p>${entry.detail}</p>
        <div class="journal-meta">
          <span class="pill">${formatShortCarbon(Number(entry.impact) || 0)} saved</span>
          <span class="pill">${formatJournalDate(entry.date)}</span>
        </div>
      </div>
      <span class="pill">Logged</span>
    </article>
  `).join("");
}

function updateHero(result) {
  refs.heroStats.forEach((node) => {
    const key = node.dataset.heroStat;
    if (key === "total") {
      node.textContent = formatCarbon(result.total);
    }
    if (key === "score") {
      node.textContent = `${result.score}/100`;
    }
    if (key === "lever") {
      node.textContent = formatCategory(result.biggestCategory);
    }
    if (key === "savings") {
      node.textContent = `${formatCarbon(result.potentialSavings)} / mo`;
    }
    if (key === "target") {
      const gap = result.targetGap;
      const direction = gap > 0 ? "above" : "below";
      node.textContent = `${Math.abs(Math.round(gap))} kg CO2e ${direction} the 300 kg monthly target.`;
    }
  });
}

function updateMetrics(result) {
  const values = {
    monthly: formatCarbon(result.total),
    weekly: formatCarbon(result.weekly),
    score: `${result.score}/100`,
    offset: `${decimalFormatter.format(result.trees)} trees/year`,
  };

  refs.metricValues.forEach((node) => {
    const key = node.dataset.metric;
    node.textContent = values[key] ?? "--";
  });
}

function renderBreakdown(result) {
  if (!refs.breakdownBars || !refs.breakdownTop) {
    return;
  }

  const entries = Object.entries(result.breakdown).sort((left, right) => right[1] - left[1]);
  const topCategory = entries[0]?.[0] ?? "commute";
  refs.breakdownTop.textContent = formatCategory(topCategory);

  refs.breakdownBars.innerHTML = entries
    .map(([key, value]) => {
      const percent = result.total === 0 ? 0 : (value / result.total) * 100;
      return `
        <div class="breakdown-row">
          <div class="breakdown-row__head">
            <span>${formatCategory(key)}</span>
            <strong>${formatCarbon(value)}</strong>
          </div>
          <div class="breakdown-track" aria-hidden="true">
            <span style="width: ${clamp(percent, 0, 100).toFixed(1)}%"></span>
          </div>
          <small>${formatPercent(percent)} of your monthly total</small>
        </div>
      `;
    })
    .join("");
}

function renderTrend(result) {
  if (!refs.trendChart) {
    return;
  }

  const liveHistory = state.history.slice(-5).map((entry) => entry.total);
  const values = liveHistory.length >= 2 ? [...liveHistory, result.total] : syntheticTrend(result.total);
  const labels =
    liveHistory.length >= 2
      ? [...state.history.slice(-5).map((entry) => dateFormatter.format(new Date(entry.date))), "Now"]
      : syntheticLabels(values.length);

  refs.trendLabel.textContent = `${formatShortCarbon(values[values.length - 1])} live`;
  refs.trendChart.innerHTML = buildTrendSvg(values, labels);
}

function syntheticTrend(total) {
  const start = total * 1.18;
  return [start * 0.94, start * 0.97, start * 1.01, start * 0.99, start * 0.95, total].map((value) => Math.max(0, value));
}

function syntheticLabels(count) {
  const labels = [];
  const now = new Date();
  for (let index = count - 1; index >= 0; index -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    labels.push(date.toLocaleDateString("en-US", { month: "short" }));
  }
  return labels;
}

function buildTrendSvg(values, labels) {
  const width = 640;
  const height = 260;
  const padding = { top: 24, right: 24, bottom: 46, left: 40 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const max = Math.max(...values) * 1.08;
  const min = Math.min(...values) * 0.92;
  const range = Math.max(1, max - min);

  const points = values.map((value, index) => {
    const x = padding.left + (index / Math.max(values.length - 1, 1)) * innerWidth;
    const y = padding.top + innerHeight - ((value - min) / range) * innerHeight;
    return { x, y, value };
  });

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;
  const gridLines = [0.25, 0.5, 0.75]
    .map((fraction) => {
      const y = padding.top + innerHeight * fraction;
      return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />`;
    })
    .join("");

  const pointDots = points
    .map(
      (point) => `
        <circle cx="${point.x}" cy="${point.y}" r="4.8" />
        <circle cx="${point.x}" cy="${point.y}" r="9" fill="rgba(86, 211, 255, 0.12)" />
      `,
    )
    .join("");

  const labelNodes = points
    .map(
      (point, index) => `
        <text x="${point.x}" y="${height - 16}" text-anchor="middle">${labels[index]}</text>
      `,
    )
    .join("");

  const valueNodes = [
    `<text x="${padding.left}" y="18" text-anchor="start">${formatShortCarbon(max)}</text>`,
    `<text x="${padding.left}" y="${height - padding.bottom + 18}" text-anchor="start">${formatShortCarbon(min)}</text>`,
  ].join("");

  return `
    <defs>
      <linearGradient id="trendStroke" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#56d3ff" />
        <stop offset="100%" stop-color="#7b90ff" />
      </linearGradient>
      <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#56d3ff" stop-opacity="0.34" />
        <stop offset="100%" stop-color="#56d3ff" stop-opacity="0.02" />
      </linearGradient>
    </defs>
    <g class="trend-grid" opacity="0.8">
      ${gridLines}
    </g>
    <path d="${areaPath}" fill="url(#trendFill)" />
    <path d="${linePath}" fill="none" stroke="url(#trendStroke)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <g class="trend-points" fill="#eef8ff" stroke="#06121d" stroke-width="2">
      ${pointDots}
    </g>
    <g class="trend-labels" fill="#b2c5b6">
      ${labelNodes}
      ${valueNodes}
    </g>
  `;
}

function renderGoals(result) {
  if (!refs.goalGrid) {
    return;
  }

  refs.goalGrid.innerHTML = result.goals
    .map((goal) => {
      const progress = clamp(goal.progress, 0, 100);
      const completed = progress >= 100;
      return `
        <article class="goal-card">
          <div class="goal-card__head">
            <h3>${goal.title}</h3>
            <span class="status-chip">${completed ? "Complete" : `${Math.round(progress)}%`}</span>
          </div>
          <p>${goal.detail}</p>
          <div class="progress-track" aria-hidden="true">
            <span style="width: ${progress.toFixed(1)}%"></span>
          </div>
          <div class="goal-card__foot">
            <span>${goal.reward}</span>
            <span>${completed ? "Unlocked" : "Keep going"}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderBadges(result) {
  if (!refs.badgeStrip || !refs.badgeHint) {
    return;
  }

  const activeBadges = result.badges.filter((badge) => badge.active);
  const pendingBadge = result.badges.find((badge) => !badge.active);

  refs.badgeStrip.innerHTML = result.badges
    .map(
      (badge) => `
        <span class="badge ${badge.active ? "is-active" : ""}">
          ${badge.active ? "Unlocked" : "Locked"}: ${badge.name}
        </span>
      `,
    )
    .join("");

  refs.badgeHint.textContent = pendingBadge
    ? `Next badge to unlock: ${pendingBadge.name} - ${pendingBadge.detail}`
    : "All milestone badges are unlocked. Great work keeping your footprint in the target band.";

  if (activeBadges.length === 0) {
    refs.badgeHint.textContent = "No badges unlocked yet. Start by nudging transit, food, or home energy in the right direction.";
  }
}

function renderRecommendations(result) {
  if (!refs.recommendationList) {
    return;
  }

  refs.recommendationList.innerHTML = result.recommendations
    .map(
      (item) => `
        <article class="recommendation-card">
          <div class="recommendation-card__head">
            <h3>${item.title}</h3>
            <strong>${formatCarbon(item.savings)}</strong>
          </div>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");
}

function renderLeaderboard(result) {
  if (!refs.leaderboardList || !refs.communityRank || !refs.communityAverage) {
    return;
  }

  const user = {
    name: "You",
    score: result.score,
    note: result.score >= 75 ? "Ahead of the pack" : "Closing the gap",
    user: true,
  };

  const board = [...COMMUNITY, user].sort((left, right) => right.score - left.score);
  const average = board.reduce((sum, member) => sum + member.score, 0) / board.length;
  const rank = board.findIndex((member) => member.user) + 1;

  refs.communityRank.textContent = `#${rank} of ${board.length}`;
  refs.communityAverage.textContent = `${Math.round(average)}/100`;

  refs.leaderboardList.innerHTML = board
    .map(
      (member, index) => `
        <article class="leaderboard-row ${member.user ? "is-user" : ""}">
          <div class="leaderboard-rank">${index + 1}</div>
          <div>
            <strong>${member.name}</strong>
            <small>${member.note}</small>
          </div>
          <strong>${member.score}/100</strong>
        </article>
      `,
    )
    .join("");
}

function renderSnapshots(result) {
  if (!refs.snapshotList) {
    return;
  }

  const snapshots = [...state.history].slice(-6).reverse();

  if (snapshots.length === 0) {
    refs.snapshotList.innerHTML = `
      <article class="snapshot-item">
        <div>
          <strong>No saved snapshots yet</strong>
          <small>Click "Save snapshot" to start a monthly record.</small>
        </div>
        <strong>${formatCarbon(result.total)}</strong>
      </article>
    `;
    return;
  }

  refs.snapshotList.innerHTML = snapshots
    .map(
      (snapshot, index) => `
        <article class="snapshot-item">
          <div>
            <strong>${dateFormatter.format(new Date(snapshot.date))}</strong>
            <small>Snapshot ${snapshots.length - index}</small>
          </div>
          <strong>${formatCarbon(snapshot.total)}</strong>
        </article>
      `,
    )
    .join("");
}

function updateForecast(result) {
  if (!refs.forecastValues || refs.forecastValues.length === 0) {
    return;
  }

  const savings = result.recommendations.reduce((sum, item) => sum + item.savings, 0);
  const cappedSavings = Math.min(savings, result.total * 0.45);
  const yearly = cappedSavings * 12;
  const daily = result.total / 30;

  const values = {
    monthly: formatCarbon(cappedSavings),
    yearly: formatCarbon(yearly),
    daily: formatCarbon(daily),
    gap: `${Math.abs(Math.round(result.targetGap))} kg ${result.targetGap > 0 ? "above" : "below"} target`,
  };

  refs.forecastValues.forEach((node) => {
    const key = node.dataset.forecast;
    node.textContent = values[key] ?? "--";
  });
}

function updateCommunitySummary(result) {
  if (!refs.trendLabel) {
    return;
  }

  refs.trendLabel.textContent = `${formatShortCarbon(result.total)} live`;
}

function showToast(message) {
  if (!refs.toast) {
    return;
  }

  refs.toast.textContent = message;
  refs.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    refs.toast.classList.remove("is-visible");
  }, 2400);
}

function saveJournalEntry(entry) {
  state.journal = [entry, ...state.journal].slice(0, 12);
  saveJson(STORAGE_KEYS.journal, state.journal);
}

function addJournalEntry(actionKey) {
  const action = JOURNAL_ACTIONS[actionKey];
  if (!action) {
    return;
  }

  saveJournalEntry({
    id: `${Date.now()}-${actionKey}`,
    date: new Date().toISOString(),
    ...action,
  });
  render();
  showToast(`${action.title} added to your eco journal.`);
}

function saveWeeklyPlan(result) {
  saveJournalEntry({
    id: `${Date.now()}-plan`,
    date: new Date().toISOString(),
    title: "Generated weekly plan",
    detail: `Focused on ${formatCategory(result.biggestCategory).toLowerCase()} and the top recommendation.`,
    impact: 0,
  });
  render();
  showToast("Weekly sustainability plan refreshed.");
}

function saveSnapshot() {
  const current = calculateFootprint(readInputs());
  state.history = [...state.history, { date: new Date().toISOString(), total: current.total }].slice(-12);
  saveJson(STORAGE_KEYS.history, state.history);
  render();
  showToast(`Snapshot saved at ${formatCarbon(current.total)}.`);
}

function resetDemo() {
  state.inputs = cloneValue(DEFAULT_INPUTS);
  state.history = [];
  state.journal = [];
  saveJson(STORAGE_KEYS.settings, state.inputs);
  saveJson(STORAGE_KEYS.history, state.history);
  saveJson(STORAGE_KEYS.journal, state.journal);
  applyInputs(state.inputs);
  render();
  showToast("Demo settings restored.");
}

function formatCategory(category) {
  switch (category) {
    case "commute":
      return "Commute";
    case "home":
      return "Home energy";
    case "food":
      return "Food";
    case "waste":
      return "Waste";
    default:
      return category;
  }
}

function setMobileNavOpen(isOpen) {
  if (!refs.navToggle || !refs.navOverlay || !refs.topnav) {
    return;
  }

  refs.topnav.classList.toggle("is-open", isOpen);
  refs.navOverlay.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  if (refs.main) {
    refs.main.toggleAttribute("inert", isOpen);
  }
  refs.navToggle.setAttribute("aria-expanded", String(isOpen));
  refs.navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

function attachEvents() {
  if (refs.navToggle && refs.navOverlay && refs.topnav) {
    refs.navToggle.addEventListener("click", () => {
      setMobileNavOpen(!refs.topnav.classList.contains("is-open"));
    });

    refs.navOverlay.addEventListener("click", () => {
      setMobileNavOpen(false);
    });

    refs.topnav.addEventListener("click", (event) => {
      if (event.target.closest("a,button")) {
        setMobileNavOpen(false);
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        setMobileNavOpen(false);
      }
    });
  }

  if (refs.form) {
    refs.form.addEventListener("input", render);
  }

  if (refs.saveSnapshot) {
    refs.saveSnapshot.addEventListener("click", saveSnapshot);
  }

  if (refs.resetDemo) {
    refs.resetDemo.addEventListener("click", resetDemo);
  }

  if (refs.exportReport) {
    refs.exportReport.addEventListener("click", () => {
      const current = calculateFootprint(readInputs());
      downloadReport(current);
      showToast("Report exported.");
    });
  }

  if (refs.commandCenter) {
    refs.commandCenter.addEventListener("click", (event) => {
      const commandButton = event.target.closest("[data-command]");
      if (commandButton) {
        const current = calculateFootprint(readInputs());
        if (commandButton.dataset.command === "plan") {
          saveWeeklyPlan(current);
        } else if (commandButton.dataset.command === "certificate") {
          downloadCertificate(current);
          showToast("Certificate downloaded.");
        }
        return;
      }

      const journalButton = event.target.closest("[data-journal]");
      if (journalButton) {
        addJournalEntry(journalButton.dataset.journal);
        return;
      }

      const marketButton = event.target.closest("[data-market]");
      if (marketButton) {
        showToast(`${marketButton.dataset.market} opened for support.`);
      }
    });
  }

  if (refs.quizOptions) {
    refs.quizOptions.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-correct]");
      if (!button) {
        return;
    }

    const selected = button.dataset.correct === "true";
    const answer = QUIZ.answers.find((item) => String(item.correct) === button.dataset.correct);

    refs.quizOptions.querySelectorAll("button").forEach((option) => {
      option.classList.remove("is-selected", "is-correct", "is-wrong");
      if (option === button) {
        option.classList.add("is-selected", selected ? "is-correct" : "is-wrong");
      }
    });

      refs.quizResult.textContent = selected ? answer.response : `${answer.response} Try again to spot the bigger climate win.`;
    });
  }
}

function initQuiz() {
  if (!refs.quizOptions || !refs.quizResult) {
    return;
  }

  refs.quizOptions.innerHTML = QUIZ.answers
    .map(
      (answer, index) => `
        <button class="quiz-option" type="button" data-correct="${answer.correct}">
          ${index + 1}. ${answer.label}
        </button>
      `,
    )
    .join("");
  refs.quizResult.textContent = QUIZ.question;
}

function seedInputs() {
  if (!refs.form) {
    return;
  }

  applyInputs(state.inputs);
}

seedInputs();
initQuiz();
attachEvents();
render();
