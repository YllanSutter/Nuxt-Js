// api/data.js
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/data.json');

// Charger les données depuis le fichier
function loadData() {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
}

// Enregistrer les données dans le fichier
function saveData(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath, jsonData, 'utf8');
}

export function getData(req, res) {
  const data = loadData();
  res.json(data);
}

export function saveDataApi(req, res) {
  const newData = req.body;
  saveData(newData);
  res.json({ message: 'Données enregistrées avec succès.' });
}
