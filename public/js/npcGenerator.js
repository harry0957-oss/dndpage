// NPC generation utilities. The functions below read from the JSON files that the
// app loads into the global `store` object (see main.js). The JSON files can be
// updated without touching this code—new races, towns, professions, and traits
// are automatically picked up because the functions look up data by id and slot.

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickName(raceId, genderId, names) {
  const raceNames = names.races[raceId] || {};
  const exactList = raceNames[genderId] || [];
  if (exactList.length) return randomFrom(exactList);

  const neutralList = raceNames['neutral'] || [];
  if (neutralList.length) return randomFrom(neutralList);

  const fallbackLists = Object.values(raceNames).filter((list) => Array.isArray(list) && list.length);
  if (fallbackLists.length) return randomFrom(randomFrom(fallbackLists));

  // If we somehow have no names for the chosen race, pick any name from the dataset.
  const allNames = Object.values(names.races)
    .flatMap((genderMap) => Object.values(genderMap))
    .flat();
  return randomFrom(allNames);
}

function pickProfession(raceId, chosenId, professions) {
  if (chosenId && chosenId !== 'random') {
    return professions.professions.find((prof) => prof.id === chosenId);
  }

  // Weighted random pick by race
  const weighted = professions.professions.map((prof) => {
    const weight = prof.weightsByRace?.[raceId] ?? 1;
    return { ...prof, weight };
  });
  const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const item of weighted) {
    if (roll < item.weight) return item;
    roll -= item.weight;
  }
  return weighted[0];
}

function pickTown(chosenId, towns) {
  if (chosenId && chosenId !== 'random') {
    return towns.towns.find((town) => town.id === chosenId);
  }
  return randomFrom(towns.towns);
}

function pickTrait(slot, tags, traits) {
  const matches = traits.traits.filter(
    (trait) => trait.slot === slot && trait.tags.some((tag) => tags.includes(tag))
  );
  const pool = matches.length ? matches : traits.traits.filter((trait) => trait.slot === slot);
  if (!pool.length) return null;
  return randomFrom(pool).text;
}

function generateNpc(config, store) {
  const { race, gender, age, aesthetic, professionId, townId } = config;
  const raceLabel = store.config.races.find((r) => r.id === race)?.label || race;
  const genderLabel = store.config.genders.find((g) => g.id === gender)?.label || gender;
  const aestheticLabel = store.config.aesthetics.find((a) => a.id === aesthetic)?.label || aesthetic;

  const name = pickName(race, gender, store.names);
  const profession = pickProfession(race, professionId, store.professions);
  const town = pickTown(townId, store.towns);

  const tags = [race, gender, profession.id, town.id, aesthetic];

  const motivationsCount = Math.random() > 0.5 ? 3 : 2;
  const motivations = [];
  for (let i = 0; i < motivationsCount; i++) {
    const motivation = pickTrait('motivation', tags, store.traits);
    if (motivation) motivations.push(motivation);
  }

  return {
    name,
    race: raceLabel,
    gender: genderLabel,
    age,
    town: town.label,
    professionLabel: profession.label,
    physical: pickTrait('physical', tags, store.traits),
    backstory: pickTrait('backstory', tags, store.traits),
    motivations,
    hook: pickTrait('hook', tags, store.traits),
    voice: pickTrait('voice', tags, store.traits),
    visual: pickTrait('visual', tags, store.traits),
    tags: {
      race,
      gender,
      profession: profession.id,
      town: town.id,
      aesthetic: aestheticLabel,
    },
  };
}

// Export to window for use in main.js
window.randomFrom = randomFrom;
window.pickName = pickName;
window.pickProfession = pickProfession;
window.pickTown = pickTown;
window.pickTrait = pickTrait;
window.generateNpc = generateNpc;
