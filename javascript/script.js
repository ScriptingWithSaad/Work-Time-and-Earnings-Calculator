let entries = [];

function addEntry() {
    const minutes = parseFloat(document.getElementById('minutes').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const currency = document.getElementById('currency').value;

    if (isNaN(minutes) || isNaN(rate)) {
        alert('Please enter valid numbers.');
        return;
    }

    const earnings = minutes * rate;
    entries.push({ minutes, rate, earnings, currency });

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
            <strong>Entry ${index + 1}</strong><br>
            Minutes: ${entry.minutes}<br>
            Rate: ${entry.currency}${entry.rate.toFixed(2)}/min<br>
            Earnings: ${entry.currency}${entry.earnings.toFixed(2)}
            <button onclick="removeEntry(${index})">Remove</button>
        `;
        entriesDiv.appendChild(entryDiv);
    });
}

function removeEntry(index) {
    entries.splice(index, 1);
    updateEntriesDisplay();
}

function clearInputs() {
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