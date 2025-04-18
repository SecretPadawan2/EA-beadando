API_URL = 'http://gamf.nhely.hu/ajax2/';
CODE = 'l40oxifce512';

function displayFeedback(message) {
  document.getElementById('feedback').innerText = message;
}

function createRecord() {
  let input = document.getElementById('dataInput').value.trim();
  let parts = input.split(',');

  if (parts.length !== 3) {
    displayFeedback("Adj meg 3 adatot vesszővel elválasztva: név, magasság, súly!");
    return;
  }

  let name = parts[0].trim();
  let height = parts[1].trim();
  let weight = parts[2].trim();

  if (name === "" || height === "" || weight === "") {
    displayFeedback("Nem lehet üres mező!");
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'create',
      name: name,
      height: height,
      weight: weight,
      code: CODE
    })
  })
  .then(response => response.json())
  .then(result => {
    if (result === 1) {
      displayFeedback("Sikeres létrehozás!");
      readRecords();
    } else {
      displayFeedback("Nem sikerült a létrehozás.");
    }
  })
  .catch(error => displayFeedback("Hiba: " + error));
}


function readRecords() {
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'read',
      code: CODE
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log("Lekérdezett adatok:", result);

    let container = document.getElementById('readData');
    container.innerHTML = "";
    let heights = [];

    let records = result.list || result;
    if (!Array.isArray(records)) {
      displayFeedback("A válasz nem tartalmazott rekordokat.");
      return;
    }

    records.forEach(rec => {
      let p = document.createElement('p');
      p.innerText = `ID: ${rec.id}, Név: ${rec.name}, Magasság: ${rec.height}, Súly: ${rec.weight}`;
      container.appendChild(p);

      let h = parseFloat(rec.height);
      if (!isNaN(h)) heights.push(h);
    });

    if (heights.length > 0) {
      let sum = heights.reduce((a, b) => a + b, 0);
      let avg = sum / heights.length;
      let max = Math.max(...heights);
      document.getElementById('stats').innerText =
        `Összeg: ${sum}, Átlag: ${avg.toFixed(2)}, Legnagyobb: ${max}`;
    } else {
      document.getElementById('stats').innerText = "Nincs magasság adat.";
    }
  })
  .catch(error => {
    console.error("Hiba történt a lekérdezésnél:", error);
    displayFeedback("Hiba: " + error);
  });
}

function updateRecord() {
  let id = document.getElementById('recordId').value.trim();
  let input = document.getElementById('dataInput').value.trim();
  let parts = input.split(',');

  if (id === "" || parts.length !== 3) {
    displayFeedback("Adj meg egy ID-t és három adatot vesszővel elválasztva: név, magasság, súly!");
    return;
  }

  let name = parts[0].trim();
  let height = parts[1].trim();
  let weight = parts[2].trim();

  if (name === "" || height === "" || weight === "") {
    displayFeedback("Nem lehet üres mező!");
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'update',
      id: id,
      name: name,
      height: height,
      weight: weight,
      code: CODE
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log("Update válasz:", result);
    if (result === 1) {
      displayFeedback("Sikeres módosítás!");
      readRecords();
    } else {
      displayFeedback("Nem sikerült módosítani. Ellenőrizd az ID-t és a saját kódot!");
    }
  })
  .catch(error => displayFeedback("Hiba: " + error));
}


function deleteRecord() {
  let id = document.getElementById('recordId').value.trim();
  if (id === "") {
    displayFeedback("Hiányzó ID!");
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'delete',
      id: id,
      code: CODE
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log("Törlés válasz:", result);
    if (result === 1) {
      displayFeedback("Sikeres törlés!");
      readRecords();
    } else {
      displayFeedback("Nem sikerült törölni. Rossz ID vagy CODE?");
    }
  })
  .catch(error => displayFeedback("Hiba: " + error));
}

function getDataForId() {
  let id = document.getElementById('recordId').value.trim();
  if (id === "") {
    displayFeedback("Adjon meg egy ID-t!");
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'read',
      code: CODE
    })
  })
  .then(response => response.json())
  .then(result => {
    const records = result.list || result;

    console.log("Kapott rekordok:", records);
    console.log("Keresett ID:", id);

    // DEBUG: Típusellenőrzés
    records.forEach(rec => {
      console.log(`record.id: ${rec.id} (${typeof rec.id}), keresett: ${id} (${typeof id})`);
    });

    // ID összehasonlítás
    const found = records.find(rec => String(rec.id) === id);

    if (found) {
      console.log("MEGTALÁLT:", found);
      document.getElementById('dataInput').value = `${found.name},${found.height},${found.weight}`;
      displayFeedback("Adat betöltve.");
    } else {
      displayFeedback("Nem található rekord ezzel az ID-val.");
    }
  })
  .catch(error => {
    console.error("Hiba:", error);
    displayFeedback("Hiba történt a betöltés során.");
  });
}

readRecords();
