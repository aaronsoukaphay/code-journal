const $photoURL = document.querySelector('#photo-URL');
const $img = document.querySelector('img');

$photoURL.addEventListener('input', handleInput);

function handleInput(event) {
  $img.setAttribute('src', event.target.value);
}
