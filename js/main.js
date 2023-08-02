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
  $ul.prepend(renderEntry(formInfo));
  viewSwap('entries');
  toggleNoEntries();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.nextEntryId++;
  $form.reset();
}

function renderEntry(entry) {
  const $li = document.createElement('li');

  const $divRow1 = document.createElement('div');
  $divRow1.setAttribute('class', 'row');
  $li.appendChild($divRow1);

  const $divColumn1 = document.createElement('div');
  $divColumn1.setAttribute('class', 'column-half');
  $divRow1.appendChild($divColumn1);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $divColumn1.appendChild($img);

  const $divColumn2 = document.createElement('div');
  $divColumn2.setAttribute('class', 'column-half');
  $divRow1.appendChild($divColumn2);

  const $divRow2 = document.createElement('div');
  $divRow2.setAttribute('class', 'row-pencil');
  $divColumn2.appendChild($divRow2);

  const $h4 = document.createElement('h4');
  $h4.textContent = entry.title;
  $divRow2.appendChild($h4);

  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fa fa-pencil fa-lg');
  $divRow2.appendChild($pencil);

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
  viewSwap(data.view);
  toggleNoEntries();
}

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.className = 'hidden';
  } else {
    $noEntries.className = 'column-full no-entries';
  }
}

const $entries = document.querySelector('.entries');
const $entryForm = document.querySelector('.entry-form');

function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entryForm.className = 'entry-form';
    $entries.className = 'entries hidden';
  } else {
    $entries.className = 'entries';
    $entryForm.className = 'entry-form hidden';
  }
  data.view = viewName;
}

const $entriesTab = document.querySelector('.entries-tab');
const $entryFormTab = document.querySelector('.entry-form-tab');

$entriesTab.addEventListener('click', function () {
  viewSwap('entries');
});
$entryFormTab.addEventListener('click', function () {
  viewSwap('entry-form');
});
