// Countdown timer script
document.addEventListener('DOMContentLoaded', function () {
  const target = new Date('2027-12-04T00:00:00-06:00');
  const container = document.getElementById('countdown');
  if (!container) return;

  // Helper to create an item
  function createItem(label) {
    const item = document.createElement('div');
    item.className = 'countdown-item';
    const number = document.createElement('span');
    number.className = 'countdown-number';
    number.textContent = '0';
    const lbl = document.createElement('span');
    lbl.className = 'countdown-label';
    lbl.textContent = label;
    item.appendChild(number);
    item.appendChild(lbl);
    return item;
  }

  // Clear any placeholder text and build four items
  container.innerHTML = '';
  const labels = ['Days', 'Hours', 'Minutes', 'Seconds'];
  labels.forEach(l => container.appendChild(createItem(l)));

  const numbers = container.querySelectorAll('.countdown-number');

  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      container.textContent = 'The big day is here!';
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const values = [days, hours, minutes, seconds];
    values.forEach((v, i) => {
      if (numbers[i]) numbers[i].textContent = v;
    });
  }
  const timer = setInterval(update, 1000);
  update();
});
