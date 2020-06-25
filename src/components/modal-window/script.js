////////////////////////////////////////////////////////////
//LOGIC FOR MODAL WINDOW v.0.2//////////////////////////////
////////////////////////////////////////////////////////////

const btn = document.querySelector('#myBtn'); // Find your button id
const modal = document.querySelector('#myModal'); // Find your modal window id (wrapper)
// Example: <span id="cross" class="close">&times;</span>
const close = document.querySelector('#cross'); // Find your close element (cross - "x")

// Open modal window
btn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Close modal window with click on the cross - "x"
close.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal window with click on the grey area
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
