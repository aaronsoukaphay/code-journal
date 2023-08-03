const $photoURL = document.querySelector('#photo-URL');
const $img = document.querySelector('img');

$photoURL.addEventListener('input', handleInput);

function handleInput(event) {
  $img.setAttribute('src', event.target.value);
}

const $form = document.querySelector('form');

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  const formInfo = {
    title: $form.elements.title.value,
    photoURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId,
  };
  if (data.editing === null) {
    event.preventDefault();
    data.entries.unshift(formInfo);
    $ul.prepend(renderEntry(formInfo));
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    data.nextEntryId++;
    toggleNoEntries();
    $form.reset();
  } else {
    formInfo.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (formInfo.entryId === data.entries[i].entryId) {
        data.entries[i] = formInfo;
        renderEntry(data.entries[i]);
        const $li = document.querySelectorAll('li');
        for (let j = 0; j < $li.length; j++) {
          if (
            $li[j].getAttribute('data-entry-id') ===
            renderEntry(data.entries[i]).getAttribute('data-entry-id')
          ) {
            $li[j] = renderEntry(data.entries[i]);
          }
        }
      }
    }
    $h1.textContent = 'New Entry';
    data.editing = null;
  }
  viewSwap('entries');
}

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

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
$ul.addEventListener('click', clickPencil);

const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $h1 = document.querySelector('h1');

function clickPencil(event) {
  if (event.target.getAttribute('class') === 'fa fa-pencil fa-lg') {
    viewSwap('entry-form');
    for (let i = 0; i < data.entries.length; i++) {
      if (
        JSON.stringify(data.entries[i].entryId) ===
        event.target.closest('li').getAttribute('data-entry-id')
      ) {
        data.editing = data.entries[i];
      }
    }
    $title.setAttribute('value', data.editing.title);
    $photoURL.setAttribute('value', data.editing.photoURL);
    $img.setAttribute('src', data.editing.photoURL);
    $notes.textContent = data.editing.notes;
  }
  $h1.textContent = 'Edit Entry';
}

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
  $title.setAttribute('value', '');
  $photoURL.setAttribute('value', '');
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $notes.textContent = '';
  $h1.textContent = 'New Entry';
});

$entryFormTab.addEventListener('click', function () {
  viewSwap('entry-form');
});
