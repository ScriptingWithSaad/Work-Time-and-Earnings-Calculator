let entries = [];

function addEntry() {
    const name = document.getElementById('name').value.trim();
    const minutes = parseFloat(document.getElementById('minutes').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const currency = document.getElementById('currency').value;

    if (name === '' || isNaN(minutes) || isNaN(rate)) {
        alert('Please enter valid information for all fields.');
        return;
    }

    const earnings = minutes * rate;
    entries.push({ name, minutes, rate, earnings, currency });

    updateEntriesDisplay();
    clearInputs();
}

function updateEntriesDisplay() {
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.innerHTML = `
            <strong>${index + 1}. ${entry.name}</strong><br>
            Minutes: ${entry.minutes}<br>
            Rate: ${entry.currency}${entry.rate.toFixed(2)}/min<br>
            Earnings: ${entry.currency}${entry.earnings.toFixed(2)}
            <div class="entry-buttons">
                ${index > 0 ? `<button onclick="moveEntryUp(${index})">Up</button>` : ''}
                <button onclick="removeEntry(${index})">Remove</button>
            </div>
        `;
        entriesDiv.appendChild(entryDiv);
    });
}

function moveEntryUp(index) {
    if (index > 0) {
        const temp = entries[index];
        entries[index] = entries[index - 1];
        entries[index - 1] = temp;
        updateEntriesDisplay();
    }
}

function removeEntry(index) {
    entries.splice(index, 1);
    updateEntriesDisplay();
}

function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('rate').value = '';
}

function calculateTotalEarnings() {
    if (entries.length === 0) {
        document.getElementById('result').textContent = 'No entries to calculate.';
        return;
    }

    const totalMinutes = entries.reduce((sum, entry) => sum + entry.minutes, 0);
    const totalEarnings = entries.reduce((sum, entry) => sum + entry.earnings, 0);
    const currency = entries[0].currency; // Assuming all entries use the same currency

    const averageRate = totalEarnings / totalMinutes;

    document.getElementById('result').innerHTML = `
        Total Minutes: ${totalMinutes}<br>
        Total Earnings: ${currency}${totalEarnings.toFixed(2)}<br>
        Average Rate: ${currency}${averageRate.toFixed(2)}/min
    `;
}
