/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', handleUnload);

function handleUnload() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataJSON);
}

const previousDataJSON = localStorage.getItem('code-journal-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
