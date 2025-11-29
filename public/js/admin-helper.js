const preview = document.getElementById('preview');
const inputs = document.querySelectorAll('input[type="file"][data-key]');

const validators = {
  config: (json) => Array.isArray(json.races) && Array.isArray(json.genders),
  names: (json) => !!json.races,
  professions: (json) => Array.isArray(json.professions),
  towns: (json) => Array.isArray(json.towns),
  traits: (json) => Array.isArray(json.traits),
  ages: (json) => !!json.races,
};

function format(results) {
  return results
    .map((r) => `${r.key}: ${r.ok ? 'OK' : 'Invalid'}${r.error ? ` - ${r.error}` : ''}`)
    .join('\n');
}

async function handleFile(event) {
  const file = event.target.files?.[0];
  const key = event.target.dataset.key;
  if (!file) return;

  try {
    const text = await file.text();
    const json = JSON.parse(text);
    const valid = validators[key] ? validators[key](json) : true;
    preview.textContent = `${key}.json\n${valid ? 'Schema looks good' : 'Unexpected shape'}\n\n${JSON.stringify(json, null, 2)}`;
  } catch (err) {
    preview.textContent = `${key}.json failed to parse: ${err.message}`;
  }
}

inputs.forEach((input) => input.addEventListener('change', handleFile));
