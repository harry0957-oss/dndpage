const inputs = {
  config: document.getElementById('configInput'),
  names: document.getElementById('namesInput'),
  professions: document.getElementById('professionsInput'),
  towns: document.getElementById('townsInput'),
  traits: document.getElementById('traitsInput'),
  ages: document.getElementById('agesInput'),
};

const preview = document.getElementById('preview');
const loaded = {};

function validateShape(label, data) {
  switch (label) {
    case 'config':
      return data && Array.isArray(data.races) && Array.isArray(data.genders) && Array.isArray(data.aesthetics);
    case 'names':
      return data && data.races;
    case 'professions':
      return data && Array.isArray(data.professions);
    case 'towns':
      return data && Array.isArray(data.towns);
    case 'traits':
      return data && Array.isArray(data.traits);
    case 'ages':
      return data && data.races;
    default:
      return false;
  }
}

function renderPreview() {
  preview.textContent = JSON.stringify(loaded, null, 2) || 'No files loaded yet.';
}

function handleFile(label, file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!validateShape(label, data)) throw new Error('Unexpected shape');
      loaded[label] = data;
      renderPreview();
    } catch (err) {
      preview.textContent = `${label}: ${err.message}`;
    }
  };
  reader.readAsText(file);
}

Object.entries(inputs).forEach(([label, input]) => {
  input?.addEventListener('change', (e) => handleFile(label, e.target.files?.[0]));
});
