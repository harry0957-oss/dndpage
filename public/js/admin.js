async function fetchFiles() {
  const res = await fetch('/admin/files');
  if (!res.ok) return [];
  const data = await res.json();
  return data.files;
}

function renderFiles(files) {
  const tbody = document.querySelector('#fileTable tbody');
  tbody.innerHTML = '';
  files.forEach((file) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${file.name}</td>
      <td>${file.exists ? '<span class="status-ok">Loaded</span>' : '<span class="status-error">Missing</span>'}</td>
    `;
    tbody.appendChild(tr);
  });
}

async function validateFiles() {
  const status = document.getElementById('validateStatus');
  status.textContent = 'Validating...';
  const res = await fetch('/admin/validate');
  if (!res.ok) {
    status.textContent = 'Validation failed';
    status.classList.add('status-error');
    return;
  }
  const data = await res.json();
  const errors = data.results.filter((r) => !r.ok);
  if (errors.length === 0) {
    status.textContent = 'All files valid';
    status.classList.remove('status-error');
    status.classList.add('status-ok');
  } else {
    status.textContent = errors.map((err) => `${err.file}: ${err.error}`).join(' | ');
    status.classList.add('status-error');
  }
}

async function initAdmin() {
  const files = await fetchFiles();
  renderFiles(files);
  document.getElementById('validateBtn').addEventListener('click', validateFiles);
}

document.addEventListener('DOMContentLoaded', initAdmin);
