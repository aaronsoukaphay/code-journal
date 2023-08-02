const $photoURL = document.querySelector('#photo-URL');
const $img = document.querySelector('img');

$photoURL.addEventListener('input', handleInput);

function handleInput(event) {
  $img.setAttribute('src', event.target.value);
}

const $form = document.querySelector('form');

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formInfo = {
    title: $form.elements.title.value,
    photoURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId,
  };
  data.entries.unshift(formInfo);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.nextEntryId++;
  $form.reset();
}

function renderEntry(entry) {
  const $li = document.createElement('li');

  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $li.appendChild($divRow);

  const $divColumn1 = document.createElement('div');
  $divColumn1.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumn1);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $divColumn1.appendChild($img);

  const $divColumn2 = document.createElement('div');
  $divColumn2.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumn2);

  const $h4 = document.createElement('h4');
  $h4.textContent = entry.title;
  $divColumn2.appendChild($h4);

  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $divColumn2.appendChild($p);

  return $li;
}

const $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleDOMContentLoaded(event) {
  for (let i = 0; i < data.entries.length; i++) {
    const entryObject = renderEntry(data.entries[i]);
    $ul.appendChild(entryObject);
  }
}

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (data.entries.length >= 0) {
    $noEntries.className = 'hidden';
  } else {
    $noEntries.className = 'column-full ' + 'no-entries';
  }
}

toggleNoEntries();

const $entries = document.querySelector('.entries');
const $entryForm = document.querySelector('.entry-form');

function viewSwap(view) {
  if (view === 'entry-form') {
    $entryForm.className = view;
    $entries.className = 'hidden';
    data.view = view;
  } else {
    $entries.className = view;
    $entryForm.className = 'hidden';
    data.view = view;
  }
}

const $entriesTab = document.querySelector('.entries-tab');

$entriesTab.addEventListener('click', viewSwap);
