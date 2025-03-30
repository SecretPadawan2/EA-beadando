function displayFeedback(message) {
    document.getElementById('feedback').innerText = message;
  }
  
  function createRecord() {
    let data = document.getElementById('dataInput').value.trim();
    if(data === "" || data.length > 30) {
      displayFeedback("Érvénytelen adat!");
      return;
    }
    fetch('/api/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(result => {
      displayFeedback("Create sikeres: " + JSON.stringify(result));
      readRecords();
    })
    .catch(error => displayFeedback("Hiba: " + error));
  }
  
  function readRecords() {
    fetch('/api/read')
    .then(response => response.json())
    .then(records => {
      let container = document.getElementById('readData');
      container.innerHTML = "";
      let heights = [];
      records.forEach(rec => {
        let p = document.createElement('p');
        p.innerText = "ID: " + rec.id + ", Data: " + rec.data + ", Height: " + rec.height;
        container.appendChild(p);
        heights.push(rec.height);
      });
      if(heights.length > 0) {
        let sum = heights.reduce((a,b)=>a+b,0);
        let avg = sum / heights.length;
        let max = Math.max(...heights);
        document.getElementById('stats').innerText = "Összeg: " + sum + ", Átlag: " + avg + ", Legnagyobb: " + max;
      }
    })
    .catch(error => displayFeedback("Hiba: " + error));
  }
  
  function updateRecord() {
    let id = document.getElementById('recordId').value.trim();
    let data = document.getElementById('dataInput').value.trim();
    if(data === "" || data.length > 30 || id === "") {
      displayFeedback("Érvénytelen adat vagy hiányzó ID!");
      return;
    }
    fetch('/api/update/' + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(result => {
      displayFeedback("Update sikeres: " + JSON.stringify(result));
      readRecords();
    })
    .catch(error => displayFeedback("Hiba: " + error));
  }
  
  function deleteRecord() {
    let id = document.getElementById('deleteId').value.trim();
    if(id === "") {
      displayFeedback("Hiányzó ID!");
      return;
    }
    fetch('/api/delete/' + id, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
      displayFeedback("Delete sikeres: " + JSON.stringify(result));
      readRecords();
    })
    .catch(error => displayFeedback("Hiba: " + error));
  }
  
  function getDataForId() {
    let id = document.getElementById('recordId').value.trim();
    if(id === "") {
      displayFeedback("Adjon meg egy ID-t!");
      return;
    }
    fetch('/api/read/' + id)
    .then(response => response.json())
    .then(record => {
      document.getElementById('dataInput').value = record.data;
      displayFeedback("Adat betöltve.");
    })
    .catch(error => displayFeedback("Hiba: " + error));
  }
  
  // Oldal betöltésekor frissítjük az adatokat
  readRecords();
  