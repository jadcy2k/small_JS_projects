// Variables:
const $ = (selector) => document.querySelector(selector);
let events = [];
let infoLS = []; //Info from LocalStorage.

// --------------------------------------------------------
// Use the LocalStorage:
// ---------------------
const json = load();
try {
  infoLS = JSON.parse(json);
} catch (error) {
  infoLS = [];
}

// Initialize "events" array from LocalStorage:
events = infoLS && [...infoLS]; 
// Initial rendering (if LocalStorage contain data):
renderEvents();

// --------------------------------------------------------
// --------------------------------------------------------
// Add Event button:
$("#addBtn").addEventListener ('click', (e) => {
  e.preventDefault();
  addEvent();
});
// --------------------------------------------------------

const addEvent = () => {
  // empty fields:
  if ($('#eventName').value === "" || $('#eventDate').value === "" ){return}
  // past dates:
  if (dateDiff($('#eventDate')) < 0){return}

  const newEvent = {
    id: (Math.random()*100).toString(36).slice(3),
    name: $('#eventName').value,
    date: $('#eventDate').value,
  };

  // add 'newEvent' to the beginning:
  events.unshift(newEvent);

  // store it in LocalStorage:
  save(JSON.stringify(events));

  // reset name:
  $('#eventName').value = "";

  // Render list of events:
  renderEvents();  
}
// --------------------------------------------------------

// Calculate difference between dates (in days)
function dateDiff(d) {
  const eventDate = new Date(d);
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 3600 * 24)); // 1000 ms * 3600 sec (1 hour) * 24h.
  return days;  
}
// --------------------------------------------------------

// Render events:
function renderEvents() {
  const eventsHTML = events.map (event => {
    return `
    <tr>
      <td>
        <div class="days-block">
          <span class="days-number">${dateDiff(event.date)}</span>
          <span class="days-text">Days</span>
        </div>
      </td>
      <td>${event.name}</td>
      <td>${event.date}</td>
      <td>
        <button data-id="${event.id}" class="deleteBtn outline">Delete</button>
      </td>
    </tr>`;     
  });
  $('#eventsContainer').innerHTML = '<table>' + eventsHTML.join('') + '</table>';

  // Action for all the "delete" buttons:
  document.querySelectorAll('.deleteBtn').forEach ( btn => {
    btn.addEventListener('click', e => {
      const id = btn.getAttribute('data-id');
      events = events.filter(event => event.id !== id);
      // store it in LocalStorage:
      save(JSON.stringify(events));
      // re-render:
      renderEvents();
    });
  });
}
// --------------------------------------------------------
// --------------------------------------------------------

// Store data in LocaStorage:
function save (data) {
  localStorage.setItem('items',data);
}
// --------------------------------------------------------
// Load data from LocaStorage:
function load () {
  return localStorage.getItem('items');
}
// --------------------------------------------------------
