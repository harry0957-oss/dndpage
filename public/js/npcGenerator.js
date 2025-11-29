// NPC generation helpers. Extend JSON in /data to add new races, professions, towns, or traits
// without changing this file. Each function pulls from the `store` object populated at runtime.

export const store = {
  config: null,
  names: null,
  professions: null,
  towns: null,
  traits: null,
};

export async function loadData() {
  const [config, names, professions, towns, traits] = await Promise.all([
    fetch('/data/config.json').then((r) => r.json()),
    fetch('/data/names.json').then((r) => r.json()),
    fetch('/data/professions.json').then((r) => r.json()),
    fetch('/data/towns.json').then((r) => r.json()),
    fetch('/data/traits.json').then((r) => r.json()),
  ]);

  store.config = config;
  store.names = names;
  store.professions = professions;
  store.towns = towns;
  store.traits = traits;
}

export function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function pickName(raceId, genderId) {
  const raceBucket = store.names?.races?.[raceId] || {};
  const primary = raceBucket[genderId] || [];
  if (primary.length) return randomFrom(primary);

  const neutral = raceBucket.neutral || [];
  if (neutral.length) return randomFrom(neutral);

  const anyList = Object.values(raceBucket).find((arr) => Array.isArray(arr) && arr.length);
  return anyList ? randomFrom(anyList) : 'Nameless Wanderer';
}

export function pickProfession(raceId, chosenId) {
  const list = store.professions?.professions || [];
  if (chosenId && chosenId !== 'random') {
    return list.find((p) => p.id === chosenId) || list[0];
  }

  const weighted = [];
  list.forEach((prof) => {
    const weight = prof.weightsByRace?.[raceId] ?? 1;
    const count = Math.max(1, Math.round(weight * 10));
    for (let i = 0; i < count; i += 1) {
      weighted.push(prof);
    }
  });
  return weighted.length ? randomFrom(weighted) : null;
}

export function pickTown(chosenId) {
  const list = store.towns?.towns || [];
  if (chosenId && chosenId !== 'random') {
    return list.find((t) => t.id === chosenId) || list[0];
  }
  return list.length ? randomFrom(list) : null;
}

export function pickTrait(slot, tags) {
  const bucket = (store.traits?.traits || []).filter((t) => t.slot === slot);
  if (!bucket.length) return null;

  const tagged = bucket.filter((t) => t.tags?.some((tag) => tags.includes(tag)));
  if (tagged.length) return randomFrom(tagged).text;

  return randomFrom(bucket).text;
}

export function generateNpc(config) {
  const raceId = config.raceId;
  const genderId = config.genderId;
  const aestheticId = config.aestheticId;

  const name = pickName(raceId, genderId);
  const profession = pickProfession(raceId, config.professionId) || { id: 'commoner', label: 'Commoner' };
  const town = pickTown(config.townId) || { id: 'roadside', label: 'The road' };

  const tags = [raceId, genderId, profession.id, town.id, aestheticId].filter(Boolean);

  const physical = pickTrait('physical', tags);
  const backstory = pickTrait('backstory', tags);
  const motivations = [];
  const motivationPool = (store.traits?.traits || []).filter((t) => t.slot === 'motivation' && (t.tags || []).some((tag) => tags.includes(tag)));
  const fallbackPool = (store.traits?.traits || []).filter((t) => t.slot === 'motivation');
  const pool = motivationPool.length ? motivationPool : fallbackPool;
  while (motivations.length < 3 && pool.length) {
    const pick = randomFrom(pool);
    if (!motivations.includes(pick.text)) motivations.push(pick.text);
    if (pool.length === 1) break;
  }

  const hook = pickTrait('hook', tags);
  const voice = pickTrait('voice', tags);
  const visual = pickTrait('visual', tags);

  return {
    name,
    race: raceId,
    gender: genderId,
    age: config.age,
    townLabel: town.label,
    professionLabel: profession.label,
    physical,
    backstory,
    motivations,
    hook,
    voice,
    visual,
  };
}
