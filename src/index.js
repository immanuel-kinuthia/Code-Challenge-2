// Get references to DOM elements for the form, input fields, and guest list display
const guestForm = document.getElementById('guestForm'); // Form element for adding guests
const guestName = document.getElementById('guestName'); // Input field for guest's name
const guestCategory = document.getElementById('guestCategory'); // Dropdown or input for guest category
const guestList = document.getElementById('guestList'); // Container (e.g., <ul>) for displaying the guest list
let guests = []; // Array to store guest objects (name, category, timestamp, RSVP status)

// Add an event listener to the form for the 'submit' event
guestForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission to avoid page reload
  // Check if the guest list has reached its limit of 10 guests
  if (guests.length >= 10) {
    alert('Guest list limit of 10 reached!'); // Show alert if limit is reached
    return; // Exit the function to prevent adding more guests
  }
  // Get the trimmed value of the guest's name from the input field
  const name = guestName.value.trim();
  // Only proceed if the name is not empty
  if (name) {
    // Get the current time as a formatted string (e.g., "12:30:45 PM")
    const timestamp = new Date().toLocaleTimeString();
    // Get the selected category from the category input/dropdown
    const category = guestCategory.value;
    // Add a new guest object to the guests array with name, category, timestamp, and default RSVP status
    guests.push({ name, category, timestamp, rsvp: 'Not Attending' });
    // Call renderGuests to update the displayed guest list
    renderGuests();
    // Clear the name input field after submission
    guestName.value = '';
  }
});

// Function to render the guest list in the DOM
function renderGuests() {
  // Clear the current content of the guest list container
  guestList.innerHTML = '';
  // Iterate over the guests array to create a list item for each guest
  guests.forEach((guest, index) => {
    // Create a new <li> element for the guest
    const li = document.createElement('li');
    // Assign a CSS class to the list item, including the guest's category for styling
    li.className = `guest-item ${guest.category}`;
    // Set the HTML content of the list item, including guest details and buttons
    li.innerHTML = `
      ${guest.name} (Added: ${guest.timestamp}) - ${guest.rsvp}
      <button onclick="toggleRSVP(${index})">Toggle RSVP</button>
      <button onclick="removeGuest(${index})">Remove</button>
    `;
    // Append the list item to the guest list container
    guestList.appendChild(li);
  });
}

// Function to toggle the RSVP status of a guest
function toggleRSVP(index) {
  // Toggle the RSVP status between 'Attending' and 'Not Attending' for the guest at the given index
  guests[index].rsvp = guests[index].rsvp === 'Attending' ? 'Not Attending' : 'Attending';
  // Re-render the guest list to reflect the updated RSVP status
  renderGuests();
}

// Function to remove a guest from the list
function removeGuest(index) {
  // Remove the guest at the specified index from the guests array
  guests.splice(index, 1);
  // Re-render the guest list to reflect the removal
  renderGuests();
}