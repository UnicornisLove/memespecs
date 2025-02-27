const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = 'data.json';

// Load data from file
function loadData() {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    }
    return [];
}

// Save data to file
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get all entries
app.get('/entries', (req, res) => {
    const data = loadData();
    res.json(data);
});

// Add a new entry
app.post('/entries', (req, res) => {
    const data = loadData();
    data.push(req.body);
    saveData(data);
    res.status(201).json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
