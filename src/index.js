const guestForm = document.getElementById('guestForm');
const guestName = document.getElementById('guestName');
const guestCategory = document.getElementById('guestCategory');
const guestList = document.getElementById('guestList');
let guests = [];

guestForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (guests.length >= 10) {
    alert('Guest list limit of 10 reached!');
    return;
  }
  const name = guestName.value.trim();
  if (name) {
    const timestamp = new Date().toLocaleTimeString();
    const category = guestCategory.value;
    guests.push({ name, category, timestamp, rsvp: 'Not Attending' });
    renderGuests();
    guestName.value = '';
  }
});

function renderGuests() {
  guestList.innerHTML = '';
  guests.forEach((guest, index) => {
    const li = document.createElement('li');
    li.className = `guest-item ${guest.category}`;
    li.innerHTML = `
      ${guest.name} (Added: ${guest.timestamp}) - ${guest.rsvp}
      <button onclick="toggleRSVP(${index})">Toggle RSVP</button>
      <button onclick="removeGuest(${index})">Remove</button>
    `;
    guestList.appendChild(li);
  });
}

function toggleRSVP(index) {
  guests[index].rsvp = guests[index].rsvp === 'Attending' ? 'Not Attending' : 'Attending';
  renderGuests();
}

function removeGuest(index) {
  guests.splice(index, 1);
  renderGuests();
}