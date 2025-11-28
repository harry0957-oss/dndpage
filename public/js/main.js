const store = {
  config: null,
  names: null,
  professions: null,
  traits: null,
  towns: null,
  ages: null,
  npc: null,
};

async function loadData() {
  const endpoints = ['config', 'names', 'professions', 'traits', 'towns', 'ages'];
  const responses = await Promise.all(
    endpoints.map((key) => fetch(`/data/${key}.json`).then((res) => res.json()))
  );

  [store.config, store.names, store.professions, store.traits, store.towns, store.ages] = responses;
}

function populateDropdowns() {
  const raceSelect = document.getElementById('raceSelect');
  const genderSelect = document.getElementById('genderSelect');
  const aestheticSelect = document.getElementById('aestheticSelect');
  const townSelect = document.getElementById('townSelect');
  const professionSelect = document.getElementById('professionSelect');

  raceSelect.innerHTML = store.config.races
    .map((race) => `<option value="${race.id}">${race.label}</option>`)
    .join('');

  genderSelect.innerHTML = store.config.genders
    .map((gender) => `<option value="${gender.id}">${gender.label}</option>`)
    .join('');

  aestheticSelect.innerHTML = store.config.aesthetics
    .map((aesthetic) => `<option value="${aesthetic.id}">${aesthetic.label}</option>`)
    .join('');

  const townOptions = store.towns.towns
    .map((town) => `<option value="${town.id}">${town.label}</option>`)
    .join('');
  townSelect.innerHTML = `<option value="random">Random</option>${townOptions}`;

  const professionOptions = store.professions.professions
    .map((profession) => `<option value="${profession.id}">${profession.label}</option>`)
    .join('');
  professionSelect.innerHTML = `<option value="random">Random</option>${professionOptions}`;
}

function renderNpc(npc) {
  document.getElementById('identity').innerHTML = `
    <div><strong>Name:</strong> ${npc.name}</div>
    <div><strong>Race:</strong> ${npc.race}</div>
    <div><strong>Gender:</strong> ${npc.gender}</div>
    <div><strong>Age:</strong> ${npc.age}</div>
    <div><strong>Town:</strong> ${npc.town}</div>
    <div><strong>Profession:</strong> ${npc.professionLabel}</div>
  `;

  document.getElementById('physical').textContent = npc.physical || 'No description available.';
  document.getElementById('backstory').textContent = npc.backstory || 'No backstory available.';

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

function currentConfig() {
  return {
    race: document.getElementById('raceSelect').value,
    gender: document.getElementById('genderSelect').value,
    age: Number(document.getElementById('ageInput').value || 0),
    townId: document.getElementById('townSelect').value,
    professionId: document.getElementById('professionSelect').value,
    aesthetic: document.getElementById('aestheticSelect').value,
  };
}

function attachHandlers() {
  document.getElementById('generateBtn').addEventListener('click', () => {
    const npc = generateNpc(currentConfig(), store);
    store.npc = npc;
    renderNpc(npc);
  });

  document.getElementById('copyBtn').addEventListener('click', async () => {
    if (!store.npc) return;
    const summaryLines = [
      `${store.npc.name} (${store.npc.race} ${store.npc.professionLabel}, ${store.npc.gender}, age ${store.npc.age}) from ${store.npc.town}.`,
      `Physical: ${store.npc.physical}`,
      `Backstory: ${store.npc.backstory}`,
      `Motivations: ${store.npc.motivations.join('; ')}`,
      `Hook: ${store.npc.hook}`,
      `Voice: ${store.npc.voice}`,
      `Visual: ${store.npc.visual}`,
    ];
    const text = summaryLines.join('\n');
    await navigator.clipboard.writeText(text);
  });
}

async function init() {
  await loadData();
  populateDropdowns();
  attachHandlers();
  const npc = generateNpc(currentConfig(), store);
  store.npc = npc;
  renderNpc(npc);
}

document.addEventListener('DOMContentLoaded', init);
