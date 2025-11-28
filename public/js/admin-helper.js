const fileDefinitions = [
  { key: 'config', label: 'config.json', hint: 'Defines races, genders, aesthetics' },
  { key: 'names', label: 'names.json', hint: 'Full names by race and gender' },
  { key: 'professions', label: 'professions.json', hint: 'Profession ids, labels, tags, and weights' },
  { key: 'towns', label: 'towns.json', hint: 'Available locales with tags' },
  { key: 'traits', label: 'traits.json', hint: 'Narrative traits grouped by slot' },
  { key: 'ages', label: 'ages.json', hint: 'Optional age ranges per race' },
];

function validateShape(key, json) {
  try {
    switch (key) {
      case 'config':
        if (!Array.isArray(json.races) || !Array.isArray(json.genders) || !Array.isArray(json.aesthetics)) {
          return { ok: false, message: 'config.json should include races, genders, and aesthetics arrays.' };
        }
        return { ok: true, message: 'Races, genders, and aesthetics detected.' };
      case 'names':
        return json.races ? { ok: true, message: 'Races map found.' } : { ok: false, message: 'Missing races map.' };
      case 'professions':
        return Array.isArray(json.professions)
          ? { ok: true, message: `${json.professions.length} professions ready.` }
          : { ok: false, message: 'Missing professions array.' };
      case 'towns':
        return Array.isArray(json.towns)
          ? { ok: true, message: `${json.towns.length} towns ready.` }
          : { ok: false, message: 'Missing towns array.' };
      case 'traits':
        return Array.isArray(json.traits)
          ? { ok: true, message: `${json.traits.length} traits loaded.` }
          : { ok: false, message: 'Missing traits array.' };
      case 'ages':
        return json.races ? { ok: true, message: 'Race age ranges detected.' } : { ok: false, message: 'Missing races map.' };
      default:
        return { ok: true, message: 'Loaded.' };
    }
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

function createUploadRow(def) {
  const wrapper = document.createElement('div');
  wrapper.className = 'card';

  const title = document.createElement('div');
  title.innerHTML = `<strong>${def.label}</strong> <span class="muted small">${def.hint}</span>`;
  wrapper.appendChild(title);

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  wrapper.appendChild(input);

  const status = document.createElement('div');
  status.className = 'muted small';
  status.textContent = 'Awaiting file...';
  wrapper.appendChild(status);

  const preview = document.createElement('pre');
  preview.className = 'muted small';
  preview.style.whiteSpace = 'pre-wrap';
  preview.style.background = '#0b1220';
  preview.style.padding = '10px';
  preview.style.borderRadius = '10px';
  preview.style.border = '1px solid var(--border)';
  wrapper.appendChild(preview);

  input.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const result = validateShape(def.key, parsed);
        status.textContent = result.message;
        status.className = result.ok ? 'status-ok small' : 'status-error small';
        preview.textContent = JSON.stringify(parsed, null, 2).slice(0, 1200);
      } catch (err) {
        status.textContent = `Parse error: ${err.message}`;
        status.className = 'status-error small';
        preview.textContent = '';
      }
    };
    reader.readAsText(file);
  });

  return wrapper;
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('uploadGrid');
  fileDefinitions.forEach((def) => grid.appendChild(createUploadRow(def)));
});
