export const DEFAULT_INPUTS = {
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

export const DEFAULT_PERSONA = "student-commuter";

export const PERSONAS = {
  "student-commuter": {
    label: "College commuter",
    summary: "Best for students balancing campus travel, meals, and shared housing.",
    focus: "campus transit, meal planning, and dorm energy",
    bullets: [
      "Use transit, biking, or carpooling for campus travel.",
      "Trim dorm or apartment electricity with smaller daily habits.",
      "Swap a few convenience meals for lower-carbon lunches.",
    ],
    goals: {
      commute: {
        title: "Campus Transit",
        detail: "Replace a couple of car-heavy days with transit, walking, or biking.",
      },
      energy: {
        title: "Dorm Power Saver",
        detail: "Keep lighting, chargers, and standby loads under control.",
      },
      food: {
        title: "Meal Plan Pivot",
        detail: "Move one or two takeout meals toward plant-based choices each week.",
      },
      waste: {
        title: "Recycle and Refill",
        detail: "Use campus recycling, refill stations, and compost points more often.",
      },
    },
    recommendations: {
      commute: {
        title: "Swap two campus driving days for transit",
        detail: "Short campus loops are ideal for the bus, rail, biking, or a shared ride.",
      },
      home: {
        title: "Trim dorm or apartment electricity by 10%",
        detail: "Charging habits, lights, and standby devices matter a lot in student housing.",
      },
      food: {
        title: "Turn one takeout day into a plant-based lunch",
        detail: "A small lunch swap keeps the budget steady and lowers the weekly footprint.",
      },
      waste: {
        title: "Use campus recycling and refill points",
        detail: "Sorting paper, plastic, and containers better keeps useful material in circulation.",
      },
      fallback: {
        title: "Track one campus eco win",
        detail: "Log one travel, meal, or energy habit so the weekly trend becomes easier to improve.",
      },
    },
    alerts: {
      commute: "Campus travel is the quickest lever for this persona.",
      home: "Dorm or apartment power habits can lower the monthly curve.",
      food: "Meal planning can unlock easy savings without a big lifestyle change.",
    },
  },
  "remote-worker": {
    label: "Remote worker",
    summary: "Best for people working from home and optimizing errands, food, and electricity.",
    focus: "home energy, trip bundling, and meal prep",
    bullets: [
      "Batch errands so short car trips happen less often.",
      "Cut home office electricity with lights, devices, and thermostat habits.",
      "Prep meals that lean plant-forward during the work week.",
    ],
    goals: {
      commute: {
        title: "Errand Bundler",
        detail: "Consolidate trips and replace one solo drive with a lower-carbon option.",
      },
      energy: {
        title: "Home Office Saver",
        detail: "Reduce home electricity with efficient lighting and smarter device use.",
      },
      food: {
        title: "Workweek Meal Prep",
        detail: "Build a repeatable set of plant-forward lunches and dinners.",
      },
      waste: {
        title: "Compacting Routine",
        detail: "Keep packaging, compost, and recycling sorted as part of the daily rhythm.",
      },
    },
    recommendations: {
      commute: {
        title: "Bundle errands into one low-carbon trip",
        detail: "Remote work often creates scattered trips; grouping them saves time and emissions.",
      },
      home: {
        title: "Reduce home office electricity by 10%",
        detail: "A few efficiency tweaks in the workspace can cut a visible share of monthly energy.",
      },
      food: {
        title: "Prep plant-rich lunches for the week",
        detail: "Simple meal prep reduces last-minute high-impact food choices.",
      },
      waste: {
        title: "Add a compost and recycling routine",
        detail: "Clear sorting habits make home waste more circular and easier to track.",
      },
      fallback: {
        title: "Track one work-from-home habit",
        detail: "Log one travel, meal, or energy action so the assistant can keep learning.",
      },
    },
    alerts: {
      commute: "Bundling errands is a strong way to lower solo trips.",
      home: "Home energy matters more for this profile, so keep an eye on electricity use.",
      food: "Meal prep and plant-forward lunches can drop the weekly curve.",
    },
  },
  "family-home": {
    label: "Family home",
    summary: "Best for households managing school runs, shared meals, and home utilities.",
    focus: "school runs, shared meals, and home utilities",
    bullets: [
      "Coordinate school runs or carpool days to reduce repeated driving.",
      "Keep household energy efficient with lights and thermostat routines.",
      "Make a couple of family dinners more plant-forward each week.",
    ],
    goals: {
      commute: {
        title: "School Run Switch",
        detail: "Replace a few repeat car trips with carpooling, transit, or active travel.",
      },
      energy: {
        title: "Whole-Home Saver",
        detail: "Bring the household electricity curve down with better daily routines.",
      },
      food: {
        title: "Family Dinner Shift",
        detail: "Move two dinners a week toward plant-forward recipes everyone can share.",
      },
      waste: {
        title: "Household Circularity",
        detail: "Sort waste more carefully and keep recycling or composting on a steady routine.",
      },
    },
    recommendations: {
      commute: {
        title: "Carpool one school-run or commute day",
        detail: "Shared travel can reduce the biggest household transport spikes quickly.",
      },
      home: {
        title: "Cut household electricity by 10%",
        detail: "Simple lighting and thermostat habits can move a family bill and footprint together.",
      },
      food: {
        title: "Make two family dinners plant-forward",
        detail: "A couple of shared meals can change the footprint without a full kitchen reset.",
      },
      waste: {
        title: "Tighten recycling and compost sorting",
        detail: "Clear household sorting keeps useful material from landing in the bin.",
      },
      fallback: {
        title: "Log one household win",
        detail: "Track a shared travel, meal, or energy habit so the whole family sees progress.",
      },
    },
    alerts: {
      commute: "School runs and shared travel usually create the biggest savings opportunity.",
      home: "Home utilities can be a major lever for family households.",
      food: "Shared meal planning can create a visible drop without extra complexity.",
    },
  },
};

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function formatCategory(category) {
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

export function getPersonaProfile(persona) {
  return PERSONAS[persona] || PERSONAS[DEFAULT_PERSONA];
}

export function buildRecommendations(inputs, breakdown, persona = DEFAULT_PERSONA) {
  const profile = getPersonaProfile(persona);
  const categoryOrder = Object.entries(breakdown).sort((left, right) => right[1] - left[1]);
  const recommendations = [];

  for (const [category, value] of categoryOrder.slice(0, 3)) {
    if (category === "commute") {
      recommendations.push({ ...profile.recommendations.commute, savings: value * 0.18 });
    }

    if (category === "home") {
      recommendations.push({ ...profile.recommendations.home, savings: value * 0.1 });
    }

    if (category === "food") {
      const weeklySwitch = Math.max(2, Math.round(inputs.meatMeals * 0.3));
      recommendations.push({
        ...profile.recommendations.food,
        detail: `${profile.recommendations.food.detail} Replacing about ${weeklySwitch} meat-based meals each week makes the change visible.`,
        savings: weeklySwitch * (4.8 - 1.1) * 4.33,
      });
    }

    if (category === "waste") {
      recommendations.push({ ...profile.recommendations.waste, savings: value * 0.22 });
    }
  }

  if (recommendations.length < 3) {
    recommendations.push({ ...profile.recommendations.fallback, savings: 10 });
  }

  return recommendations.slice(0, 3);
}

export function buildGoals(inputs, persona = DEFAULT_PERSONA) {
  const profile = getPersonaProfile(persona);
  const travelTotal = inputs.carKm + inputs.transitKm;
  const transitProgress = travelTotal === 0 ? 100 : clamp((inputs.transitKm / travelTotal) * 100, 0, 100);
  const energyProgress = clamp(((240 - inputs.electricityKwh) / 120) * 100, 0, 100);
  const foodProgress = clamp((inputs.plantMeals / Math.max(inputs.meatMeals + inputs.plantMeals, 1)) * 100, 0, 100);
  const wasteProgress = clamp(inputs.recyclingRate * 0.7 + (10 - inputs.wasteBags) * 5, 0, 100);

  return [
    {
      title: profile.goals.commute.title,
      detail: profile.goals.commute.detail,
      progress: transitProgress,
      reward: "Mobility badge",
    },
    {
      title: profile.goals.energy.title,
      detail: profile.goals.energy.detail,
      progress: energyProgress,
      reward: "Energy badge",
    },
    {
      title: profile.goals.food.title,
      detail: profile.goals.food.detail,
      progress: foodProgress,
      reward: "Food badge",
    },
    {
      title: profile.goals.waste.title,
      detail: profile.goals.waste.detail,
      progress: wasteProgress,
      reward: "Waste badge",
    },
  ];
}

export function buildBadges(inputs, total, goals, persona = DEFAULT_PERSONA) {
  const profile = getPersonaProfile(persona);
  const transitShare = inputs.carKm + inputs.transitKm === 0 ? 0 : inputs.transitKm / (inputs.carKm + inputs.transitKm);
  const foodShare = inputs.meatMeals + inputs.plantMeals === 0 ? 0 : inputs.plantMeals / (inputs.meatMeals + inputs.plantMeals);

  return [
    {
      name: "Climate Starter",
      active: total <= 650,
      detail: `Monthly footprint under 650 kg CO2e for the ${profile.label.toLowerCase()} profile.`,
    },
    {
      name: "Low Carbon Hero",
      active: total <= 300,
      detail: `Monthly footprint under the target range for the ${profile.label.toLowerCase()} profile.`,
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

export function buildAssistant(result, persona = DEFAULT_PERSONA) {
  const profile = getPersonaProfile(persona);
  const bestRecommendation = result.recommendations[0];
  const targetPhrase =
    result.targetGap > 0
      ? `close the remaining ${Math.round(result.targetGap)} kg gap to the 300 kg target`
      : "stay below the 300 kg target";
  const summary =
    result.score >= 80
      ? `You're in a strong climate lane for a ${profile.label.toLowerCase()} setup. Protect the momentum by focusing on ${profile.focus} and helping the team ${targetPhrase}.`
      : result.score >= 60
        ? `Good foundation for a ${profile.label.toLowerCase()} profile. Your fastest win is ${bestRecommendation.title.toLowerCase()}, then hold a steady snapshot rhythm to make the trend visible.`
        : `There is a lot of upside for a ${profile.label.toLowerCase()} profile. Start with ${bestRecommendation.title.toLowerCase()} and one simple journal habit so the next week looks different.`;

  const plan = [
    {
      title: `Lead with ${profile.label}`,
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

export function buildAlerts(result, persona = DEFAULT_PERSONA) {
  const profile = getPersonaProfile(persona);
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
      detail: `${profile.alerts.commute} A transit swap or one shared ride day can change the chart quickly.`,
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
      detail: `${profile.alerts.home} Lighting, thermostat behavior, and standby loads can unlock an easy reduction.`,
    });
  } else if (foodShare >= 0.3) {
    alerts.push({
      tone: "medium",
      title: "Food choices are shaping the curve",
      detail: `${profile.alerts.food} A few plant-based swaps can create visible monthly savings.`,
    });
  }

  if (alerts.length < 3) {
    alerts.push({
      tone: "good",
      title: "Journal streak opportunity",
      detail: `Log one eco win today so the ${profile.label.toLowerCase()} assistant has a stronger weekly story to work with.`,
    });
  }

  return alerts.slice(0, 3);
}

export function buildLocations(result) {
  const pools = {
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
  return (pools[result.biggestCategory] || pools.commute).slice(0, 3);
}

export function calculateFootprint(inputs, persona = DEFAULT_PERSONA) {
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

  const recommendations = buildRecommendations(inputs, breakdown, persona);
  const potentialSavings = recommendations.reduce((sum, item) => sum + item.savings, 0);
  const goals = buildGoals(inputs, persona);
  const badges = buildBadges(inputs, total, goals, persona);

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
    persona,
  };
}
