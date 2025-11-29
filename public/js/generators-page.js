import { loadData, store, generateNpc } from './npcGenerator.js';

const raceSelect = document.getElementById('raceSelect');
const genderSelect = document.getElementById('genderSelect');
const ageInput = document.getElementById('ageInput');
const townSelect = document.getElementById('townSelect');
const professionSelect = document.getElementById('professionSelect');
const aestheticSelect = document.getElementById('aestheticSelect');
const identityEl = document.getElementById('identity');
const physicalEl = document.getElementById('physical');
const backstoryEl = document.getElementById('backstory');
const motivationsEl = document.getElementById('motivations');
const hookEl = document.getElementById('hook');
const voiceEl = document.getElementById('voice');
const visualEl = document.getElementById('visual');
const toast = document.getElementById('toast');

function option(label, value) {
  const o = document.createElement('option');
  o.value = value;
  o.textContent = label;
  return o;
}

function populateSelects() {
  raceSelect.replaceChildren(...store.config.races.map((r) => option(r.label, r.id)));
  genderSelect.replaceChildren(...store.config.genders.map((g) => option(g.label, g.id)));
  aestheticSelect.replaceChildren(...store.config.aesthetics.map((a) => option(a.label, a.id)));

  const professionOptions = [option('Random', 'random'), ...store.professions.professions.map((p) => option(p.label, p.id))];
  professionSelect.replaceChildren(...professionOptions);

  const townOptions = [option('Random', 'random'), ...store.towns.towns.map((t) => option(t.label, t.id))];
  townSelect.replaceChildren(...townOptions);
}

function renderNpc(npc) {
  identityEl.innerHTML = `
    <div><strong>Name</strong>${npc.name}</div>
    <div><strong>Race</strong>${npc.race}</div>
    <div><strong>Gender</strong>${npc.gender}</div>
    <div><strong>Age</strong>${npc.age}</div>
    <div><strong>Town</strong>${npc.townLabel}</div>
    <div><strong>Profession</strong>${npc.professionLabel}</div>
  `;
  physicalEl.textContent = npc.physical || 'No description available yet.';
  backstoryEl.textContent = npc.backstory || 'Mysteries still to uncover.';
  motivationsEl.replaceChildren(...(npc.motivations || []).map((m) => {
    const li = document.createElement('li');
    li.textContent = m;
    return li;
  }));
  hookEl.textContent = npc.hook || 'No hook yet';
  voiceEl.textContent = npc.voice || 'Let the table decide the voice.';
  visualEl.textContent = npc.visual || 'Imagine their look your way.';
}

function copySummary(npc) {
  const motivations = (npc.motivations || []).map((m) => `- ${m}`).join('\n');
  const text = `
${npc.name} (${npc.race}, ${npc.gender}, ${npc.age}, ${npc.professionLabel} from ${npc.townLabel})
Physical: ${npc.physical || 'Unknown'}
Backstory: ${npc.backstory || 'Unknown'}
Motivations:\n${motivations || '- None listed'}
Hook: ${npc.hook || 'None'}
How to voice: ${npc.voice || 'Decide at the table'}
Visuals: ${npc.visual || 'Your imagination'}
  `.trim();

  navigator.clipboard?.writeText(text).then(() => {
    toast?.classList.add('show');
    setTimeout(() => toast?.classList.remove('show'), 1500);
  });
}

async function init() {
  await loadData();
  populateSelects();

  const defaultNpc = generateNpc({
    raceId: store.config.races[0].id,
    genderId: store.config.genders[0].id,
    age: 30,
    aestheticId: store.config.aesthetics[0].id,
    professionId: 'random',
    townId: 'random',
  });
  renderNpc(defaultNpc);

  document.getElementById('generateBtn').addEventListener('click', () => {
    const npc = generateNpc({
      raceId: raceSelect.value,
      genderId: genderSelect.value,
      age: Number(ageInput.value) || 30,
      aestheticId: aestheticSelect.value,
      professionId: professionSelect.value,
      townId: townSelect.value,
    });
    renderNpc(npc);
  });

  document.getElementById('copyBtn').addEventListener('click', () => {
    const npc = generateNpc({
      raceId: raceSelect.value,
      genderId: genderSelect.value,
      age: Number(ageInput.value) || 30,
      aestheticId: aestheticSelect.value,
      professionId: professionSelect.value,
      townId: townSelect.value,
    });
    copySummary(npc);
  });
}

document.addEventListener('DOMContentLoaded', init);
