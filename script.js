const npcData = {
  human: {
    label: 'Human',
    ageRange: [16, 80],
    first: {
      male: ['Garrick', 'Baldric', 'Leoric', 'Thom', 'Edran', 'Mateo', 'Darius', 'Kellan'],
      female: ['Maris', 'Elowen', 'Talia', 'Brigid', 'Seraphine', 'Ilyana', 'Kara', 'Rowan'],
      neutral: ['Avery', 'Quinn', 'Reese', 'Sage', 'Eden', 'Riven', 'Lyre', 'Ash']
    },
    last: ['Harth', 'Blackwater', 'Thorne', 'Kessel', 'Dunlow', 'Trask', 'Hallow', 'Crowe']
  },
  elf: {
    label: 'Elf',
    ageRange: [60, 380],
    first: {
      male: ['Theren', 'Erevan', 'Aelar', 'Syllin', 'Varis', 'Laureth', 'Saevel'],
      female: ['Aeris', 'Lethari', 'Shava', 'Tessara', 'Miriell', 'Syndra', 'Valyn'],
      neutral: ['Cael', 'Ielenia', 'Rynn', 'Saeya', 'Liora', 'Naeris', 'Thala']
    },
    last: ['Siannodel', 'Amastacia', 'Galanodel', 'Holimion', 'Xiloscient', 'Iliathor', 'Firahel']
  },
  dwarf: {
    label: 'Dwarf',
    ageRange: [40, 320],
    first: {
      male: ['Bruen', 'Dain', 'Rurik', 'Torbin', 'Kargrom', 'Fargrim', 'Harbek'],
      female: ['Hlin', 'Sannl', 'Vistra', 'Yorbera', 'Eldeth', 'Audhild', 'Thora'],
      neutral: ['Khurra', 'Darrin', 'Rys', 'Grenda', 'Lora', 'Kessa', 'Torra']
    },
    last: ['Ironfist', 'Stonehelm', 'Runehall', 'Battlehammer', 'Deepdelver', 'Coalbraid', 'Graniteheart']
  },
  halfling: {
    label: 'Halfling',
    ageRange: [20, 120],
    first: {
      male: ['Finnan', 'Milo', 'Corby', 'Perrin', 'Lyle', 'Tobyn', 'Wes'],
      female: ['Cora', 'Lidda', 'Marigold', 'Seraphy', 'Tegan', 'Mira', 'Eliya'],
      neutral: ['Pip', 'Quill', 'Lark', 'Maple', 'Bran', 'Rue', 'Tansy']
    },
    last: ['Brushgather', 'Tealeaf', 'Goodbarrel', 'Underbough', 'Appleblossom', 'Hilltopple', 'Greenbottle']
  },
  tiefling: {
    label: 'Tiefling',
    ageRange: [18, 110],
    first: {
      male: ['Azazel', 'Damian', 'Morthos', 'Severin', 'Zoren', 'Kairon', 'Lucien'],
      female: ['Nyssa', 'Lilith', 'Zera', 'Ariadne', 'Vexia', 'Seris', 'Phaedra'],
      neutral: ['Zeph', 'Nox', 'Verin', 'Cym', 'Rael', 'Aven', 'Iris']
    },
    last: ['Voruc', 'Myrth', 'Kallazar', 'Ashfall', 'Avernos', 'Zaruun', 'Raviran']
  },
  dragonborn: {
    label: 'Dragonborn',
    ageRange: [12, 80],
    first: {
      male: ['Arjhan', 'Balasar', 'Ghesh', 'Kriv', 'Medrash', 'Torinn', 'Rhogar'],
      female: ['Akra', 'Mishann', 'Nala', 'Sora', 'Surina', 'Vezera', 'Raiann'],
      neutral: ['Drax', 'Myastan', 'Nadarr', 'Ryv', 'Parra', 'Kava', 'Zuri']
    },
    last: ['Clethtinthiallor', 'Fenkenkabradon', 'Yrjixtilex', 'Myastan', 'Crathuum', 'Delmirev', 'Kepeshkmolik']
  },
  orc: {
    label: 'Orc',
    ageRange: [14, 70],
    first: {
      male: ['Grom', 'Hrak', 'Thokk', 'Drogan', 'Urgoth', 'Mogrin', 'Brug'],
      female: ['Shaundra', 'Rutha', 'Ogra', 'Drenna', 'Sulra', 'Mazra', 'Yurga'],
      neutral: ['Grakka', 'Vor', 'Rusk', 'Nura', 'Barg', 'Shura', 'Krell']
    },
    last: ['Skullcleaver', 'Bonecarver', 'Bloodtusk', 'Stonehide', 'Ironspear', 'Grimfang', 'Ashbreaker']
  }
};

const physicalDetails = {
  build: ['wiry', 'lean', 'lithe', 'broad-shouldered', 'stocky', 'towering', 'compact', 'scarred'],
  height: ['short for their kin', 'average height', 'taller than most', 'noticeably tiny', 'powerfully built'],
  features: ['an intricate braid with beads', 'a nose broken more than once', 'bright, curious eyes', 'ritual tattoos', 'a carefully trimmed beard', 'a collection of ear cuffs', 'soft hands that betray scholarship', 'a cloak that hides most of their face'],
  attire: ['layered travel leathers', 'a patchwork cloak of keepsakes', 'merchant silks with hidden pockets', 'simple linens with utilitarian straps', 'armor maintained with pride', 'robes inked with sigils', 'forest-green garb suited for scouts'],
  accents: ['smelling faintly of campfire smoke', 'with a polished holy symbol', 'carrying a ledger of debts', 'with calloused fingers from smithing', 'that jingle softly from many rings', 'wearing a charm from a loved one']
};

const hooks = [
  'Needs a quick ally to settle a personal score.',
  'Offers a rumor about a hidden shrine nearby.',
  'Is searching for someone matching the party’s description.',
  'Carries a map fragment they cannot decipher.',
  'Knows a shortcut that avoids a dangerous patrol.',
  'Seeks to hire guards for a risky delivery.',
  'Has a lead on a relic connected to a player’s background.'
];

const motivationPool = [
  'Repay an old debt before it comes due.',
  'Secure resources to protect their community.',
  'Prove themselves worthy of a mentor’s teachings.',
  'Obscure their past before it catches up.',
  'Unlock secrets of an ancient site.',
  'Gain influence with a local guild.',
  'Redeem a family name others have tarnished.',
  'Find someone lost during a recent disaster.',
  'Test their skills against worthy opponents.',
  'See the world beyond their isolated home.'
];

const voiceAccents = [
  'soft coastal lilt', 'rounded noble diction', 'rough mining drawl', 'measured scholar cadence',
  'quick streetwise chatter', 'whispered conspiratorial tone', 'booming tavern-call', 'hushed, reverent delivery'
];

const voiceTextures = ['breathy', 'gravelly', 'warm and resonant', 'nasal', 'smooth storyteller vibe', 'clipped and precise'];
const voiceTempos = ['slow and deliberate', 'with sudden emphases', 'measured but playful', 'rapid-fire excitement', 'calm, lingering pauses'];

const backgrounds = [
  'raised among traveling performers',
  'former scribe for a minor noble house',
  'ex-soldier turned caravan guard',
  'hermit scholar who recently returned to town life',
  'guild artisan with a reputation for fair deals',
  'failed apprentice mage seeking purpose',
  'temple caretaker who keeps subtle tabs on visitors',
  'smuggler who swears they have gone honest'
];

const turningPoints = [
  'made a costly promise to a loved one',
  'barely survived an ambush in the wilds',
  'sold the wrong item to the wrong person',
  'witnessed a miracle tied to an old legend',
  'lost their mentor under mysterious circumstances',
  'helped a stranger who later vanished',
  'stole something sacred and regrets it',
  'betrayed their crew and fears retribution'
];

const specialties = [
  'negotiating tense deals', 'reading ancient maps', 'tracking with uncanny focus', 'brewing potent tonics',
  'telling embellished tales', 'sharpening arms and armor', 'finding rare books', 'smuggling small valuables'
];

const genericTonePool = [
  'cautious but kind',
  'boisterous and witty',
  'studious and reserved',
  'stern but fair'
];

const genericProfessionPool = [
  'traveler',
  'scout',
  'merchant',
  'bard'
];

const traitFileMap = {
  elf: {
    female: 'traits/elf_female.json'
  },
  human: {
    female: 'traits/human_female.json',
    male: 'traits/human_male.json'
  }
};

const traitCache = {};

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function rollGender(preference) {
  if (preference !== 'random') return preference;
  return randomFrom(['male', 'female', 'neutral']);
}

function buildName(race, gender) {
  const data = npcData[race];
  const names = data.first[gender] ?? data.first.neutral;
  const first = randomFrom(names);
  const last = randomFrom(data.last);
  return `${first} ${last}`;
}

function rollAge(race, ageBracket, profile) {
  const raceRange = npcData[race].ageRange;
  const bracket = profile?.ageBrackets?.[ageBracket];
  const [min, max] = bracket?.range ?? raceRange;
  const skew = Math.random() < 0.5 ? 0.6 : 1.2;
  const age = Math.floor(min + (max - min) * Math.random() * skew);
  return Math.max(min, Math.min(age, max));
}

function buildPhysical(race, tone, location, profession, ageDescriptor) {
  const descriptors = [randomFrom(physicalDetails.build), randomFrom(physicalDetails.height), randomFrom(physicalDetails.features)];
  const outfit = randomFrom(physicalDetails.attire);
  const accent = randomFrom(physicalDetails.accents);
  const raceNote = {
    elf: 'moves with graceful economy',
    dwarf: 'stands rooted like carved stone',
    halfling: 'keeps light on their feet and alert',
    human: 'has confident, purposeful strides',
    tiefling: 'flicks their tail when amused',
    dragonborn: 'lets a low rumble accompany their breaths',
    orc: 'favours broad gestures and direct eye contact'
  }[race];

  const locale = location ? ` A few hints of ${location.toLowerCase()} show in their gear.` : '';
  const toneHint = tone ? ` Their style echoes ${tone}.` : '';
  const professionHint = profession ? ` They carry the tools and habits of a ${profession}.` : '';
  const ageHint = ageDescriptor ? ` They ${ageDescriptor}.` : '';

  return `A ${descriptors.join(', ')} figure in ${outfit}, ${accent}. They ${raceNote}.${ageHint}${locale}${toneHint}${professionHint}`;
}

function buildBackstory(race, tone, location, profession, ageDescriptor) {
  const origin = randomFrom(backgrounds);
  const shift = randomFrom(turningPoints);
  const specialty = randomFrom(specialties);
  const place = location ? ` near ${location}` : '';
  const toneTwist = tone ? ` Their outlook is colored by their ${tone} experiences.` : '';
  const professionNote = profession ? ` Profession: ${profession}.` : '';
  const ageNote = ageDescriptor ? ` Lately, they ${ageDescriptor}.` : '';
  return `A ${npcData[race].label.toLowerCase()} ${origin}${place}. They ${shift} and now survive by ${specialty}.${toneTwist}${professionNote}${ageNote}`;
}

function buildMotivations() {
  const shuffled = motivationPool.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function buildVoice(tone) {
  const accent = randomFrom(voiceAccents);
  const texture = randomFrom(voiceTextures);
  const tempo = randomFrom(voiceTempos);
  const toneTag = tone ? ` Lean into ${tone} energy.` : '';
  return `Use a ${accent} with a ${texture} quality, spoken ${tempo}.${toneTag}`;
}

function buildHook() {
  return randomFrom(hooks);
}

function renderMotivations(listEl, motivations) {
  listEl.innerHTML = '';
  motivations.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    listEl.appendChild(li);
  });
}

function setSelectOptions(select, options, placeholder) {
  select.innerHTML = '';
  const base = document.createElement('option');
  base.value = '';
  base.textContent = placeholder;
  select.appendChild(base);

  options.forEach((item) => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
  select.value = '';
}

function populateRaceSelect(select) {
  Object.entries(npcData).forEach(([key, data]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = data.label;
    select.appendChild(option);
  });
}

async function loadTraitProfile(race, gender) {
  const path = traitFileMap[race]?.[gender];
  if (!path) return null;

  const cacheKey = `${race}-${gender}`;
  if (traitCache[cacheKey]) return traitCache[cacheKey];

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Missing profile file');
    const data = await response.json();
    traitCache[cacheKey] = data;
    return data;
  } catch (err) {
    console.warn('Could not load trait profile', cacheKey, err.message);
    return null;
  }
}

function assembleSummary(npc) {
  return [
    `${npc.name} — ${npc.raceLabel} ${npc.gender}, ${npc.age} years old`,
    npc.profession ? `Profession: ${npc.profession}` : null,
    npc.tone ? `Tone: ${npc.tone}` : null,
    `Hook: ${npc.hook}`,
    `Look: ${npc.look}`,
    `Backstory: ${npc.backstory}`,
    `Motivations: ${npc.motivations.join('; ')}`,
    `Voice: ${npc.voice}`
  ].filter(Boolean).join('\n');
}

function handleCopy(summary) {
  navigator.clipboard.writeText(summary).then(() => {
    const original = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = original), 1600);
  });
}

const raceSelect = document.getElementById('race');
const genderSelect = document.getElementById('gender');
const toneSelect = document.getElementById('tone');
const professionSelect = document.getElementById('profession');
const ageBracketSelect = document.getElementById('ageBracket');
const locationInput = document.getElementById('location');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const npcNameEl = document.getElementById('npcName');
const npcMetaEl = document.getElementById('npcMeta');
const npcLookEl = document.getElementById('npcLook');
const npcBackstoryEl = document.getElementById('npcBackstory');
const npcMotivationsEl = document.getElementById('npcMotivations');
const npcVoiceEl = document.getElementById('npcVoice');
const npcHookEl = document.getElementById('npcHook');

populateRaceSelect(raceSelect);
raceSelect.value = 'human';

async function refreshTraitControls() {
  const race = raceSelect.value;
  const selectedGender = genderSelect.value;
  const availableGenders = Object.keys(traitFileMap[race] ?? {});
  const effectiveGender = selectedGender === 'random' ? availableGenders[0] : selectedGender;
  const profile = effectiveGender ? await loadTraitProfile(race, effectiveGender) : null;

  const tones = profile?.tones ?? genericTonePool;
  const professions = profile?.professions ?? genericProfessionPool;
  const ageOptions = profile?.ageBrackets ? Object.keys(profile.ageBrackets) : [];

  setSelectOptions(toneSelect, tones, 'Surprise me');
  setSelectOptions(professionSelect, professions, 'Surprise me');
  setSelectOptions(ageBracketSelect, ageOptions, profile ? 'Auto (random bracket)' : 'Auto (race range)');
}

async function generateNPC() {
  const race = raceSelect.value;
  const gender = rollGender(genderSelect.value);
  const profile = await loadTraitProfile(race, gender);

  const tonePool = profile?.tones ?? genericTonePool;
  const tone = toneSelect.value || randomFrom(tonePool);

  const professionPool = profile?.professions ?? genericProfessionPool;
  const profession = professionSelect.value || randomFrom(professionPool);

  const availableBrackets = profile?.ageBrackets ? Object.keys(profile.ageBrackets) : [];
  const bracketChoice = ageBracketSelect.value || (availableBrackets.length ? randomFrom(availableBrackets) : null);
  const ageDescriptor = bracketChoice ? randomFrom(profile?.ageBrackets?.[bracketChoice]?.descriptions ?? []) : '';
  const age = rollAge(race, bracketChoice, profile);
  const location = locationInput.value.trim();

  const name = buildName(race, gender);
  const look = buildPhysical(race, tone, location, profession, ageDescriptor);
  const backstory = buildBackstory(race, tone, location, profession, ageDescriptor);
  const motivations = buildMotivations();
  const voice = buildVoice(tone);
  const hook = buildHook();

  const metaBits = [npcData[race].label, gender, `${age}`];
  if (profession) metaBits.push(profession);

  npcNameEl.textContent = name;
  npcMetaEl.textContent = metaBits.join(' · ');
  npcLookEl.textContent = look;
  npcBackstoryEl.textContent = backstory;
  npcVoiceEl.textContent = voice;
  npcHookEl.textContent = hook;
  renderMotivations(npcMotivationsEl, motivations);

  const summary = assembleSummary({
    name,
    raceLabel: npcData[race].label,
    gender,
    age,
    look,
    backstory,
    motivations,
    voice,
    hook,
    tone,
    profession
  });
  copyBtn.onclick = () => handleCopy(summary);
}

generateBtn.addEventListener('click', generateNPC);
document.addEventListener('DOMContentLoaded', async () => {
  await refreshTraitControls();
  generateNPC();
});

raceSelect.addEventListener('change', refreshTraitControls);
genderSelect.addEventListener('change', refreshTraitControls);
