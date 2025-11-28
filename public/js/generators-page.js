const generatorStore = {
  config: null,
  names: null,
  professions: null,
  towns: null,
  traits: null,
  ages: null,
  npc: null,
};

async function loadGeneratorData() {
  const endpoints = ['config', 'names', 'professions', 'towns', 'traits', 'ages'];
  const responses = await Promise.all(endpoints.map((key) => fetch(`/data/${key}.json`).then((res) => res.json())));
  [generatorStore.config, generatorStore.names, generatorStore.professions, generatorStore.towns, generatorStore.traits, generatorStore.ages] =
    responses;
}

function populateGeneratorDropdowns() {
  const raceSelect = document.getElementById('raceSelect');
  const genderSelect = document.getElementById('genderSelect');
  const aestheticSelect = document.getElementById('aestheticSelect');
  const townSelect = document.getElementById('townSelect');
  const professionSelect = document.getElementById('professionSelect');

  raceSelect.innerHTML = generatorStore.config.races
    .map((race) => `<option value="${race.id}">${race.label}</option>`)
    .join('');

  genderSelect.innerHTML = generatorStore.config.genders
    .map((gender) => `<option value="${gender.id}">${gender.label}</option>`)
    .join('');

  aestheticSelect.innerHTML = generatorStore.config.aesthetics
    .map((aesthetic) => `<option value="${aesthetic.id}">${aesthetic.label}</option>`)
    .join('');

  const townOptions = generatorStore.towns.towns
    .map((town) => `<option value="${town.id}">${town.label}</option>`)
    .join('');
  townSelect.innerHTML = `<option value="random">Random</option>${townOptions}`;

  const professionOptions = generatorStore.professions.professions
    .map((profession) => `<option value="${profession.id}">${profession.label}</option>`)
    .join('');
  professionSelect.innerHTML = `<option value="random">Random</option>${professionOptions}`;
}

function renderNpcOnPage(npc) {
  document.getElementById('identity').innerHTML = `
    <div><strong>Name:</strong> ${npc.name}</div>
    <div><strong>Race:</strong> ${npc.race}</div>
    <div><strong>Gender:</strong> ${npc.gender}</div>
    <div><strong>Age:</strong> ${npc.age}</div>
    <div><strong>Town:</strong> ${npc.townLabel || npc.town}</div>
    <div><strong>Profession:</strong> ${npc.professionLabel}</div>
  `;

  document.getElementById('physical').textContent = npc.physical || 'No description available yet.';
  document.getElementById('backstory').textContent = npc.backstory || 'No backstory available yet.';

  const motivationsEl = document.getElementById('motivations');
  motivationsEl.innerHTML = '';
  npc.motivations.forEach((motivation) => {
    const li = document.createElement('li');
    li.textContent = motivation;
    motivationsEl.appendChild(li);
  });

  document.getElementById('hook').textContent = npc.hook || '';
  document.getElementById('voice').textContent = npc.voice || '';
  document.getElementById('visual').textContent = npc.visual || '';
}

function currentGeneratorConfig() {
  return {
    race: document.getElementById('raceSelect').value,
    gender: document.getElementById('genderSelect').value,
    age: Number(document.getElementById('ageInput').value || 0),
    townId: document.getElementById('townSelect').value,
    professionId: document.getElementById('professionSelect').value,
    aesthetic: document.getElementById('aestheticSelect').value,
  };
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 1600);
}

async function copyNpcSummary() {
  if (!generatorStore.npc) return;
  const npc = generatorStore.npc;
  const lines = [
    `${npc.name} (${npc.race}, ${npc.gender}, age ${npc.age}, ${npc.professionLabel}) from ${npc.townLabel || npc.town}.`,
    `Physical: ${npc.physical}`,
    `Backstory: ${npc.backstory}`,
    'Motivations:',
    ...npc.motivations.map((m) => `- ${m}`),
    `Hook: ${npc.hook}`,
    `How to voice: ${npc.voice}`,
    `Visuals: ${npc.visual}`,
  ];
  await navigator.clipboard.writeText(lines.join('\n'));
  showToast('Summary copied to clipboard');
}

function attachGeneratorHandlers() {
  document.getElementById('generateBtn').addEventListener('click', () => {
    const npc = generateNpc(currentGeneratorConfig(), generatorStore);
    generatorStore.npc = npc;
    renderNpcOnPage(npc);
  });

  document.getElementById('copyBtn').addEventListener('click', copyNpcSummary);
}

async function initGeneratorPage() {
  await loadGeneratorData();
  populateGeneratorDropdowns();
  attachGeneratorHandlers();
  const npc = generateNpc(currentGeneratorConfig(), generatorStore);
  generatorStore.npc = npc;
  renderNpcOnPage(npc);
}

document.addEventListener('DOMContentLoaded', initGeneratorPage);
