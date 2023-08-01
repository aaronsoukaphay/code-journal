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
