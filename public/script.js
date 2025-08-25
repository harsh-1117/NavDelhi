const stationList = [
  "Dwarka Sector 21",
  "Dwarka Sector 8",
  "Dwarka Sector 9",
  "Dwarka Sector 10",
  "Dwarka Sector 11",
  "Dwarka Sector 12",
  "Dwarka Sector 13",
  "Dwarka Sector 14",
  "Dwarka",
  "Dwarka Mor",
  "Nawada",
  "Uttam Nagar West",
  "Uttam Nagar East",
  "Janakpuri West",
  "Janakpuri East",
  "Tilak Nagar",
  "Subhash Nagar",
  "Tagore Garden",
  "Rajouri Garden (blue line)",
  "Ramesh Nagar",
  "Moti Nagar",
  "Kirti Nagar",
  "Shadipur",
  "Patel Nagar",
  "Rajendra Place",
  "Karol Bagh",
  "R K Ashram Marg",
  "Rajiv Chowk",
  "Barakhamba Road",
  "Mandi House",
  "Pragati Maidan",
  "Indraprastha",
  "Yamuna Bank",
  "Laxmi Nagar",
  "Nirman Vihar",
  "Preet Vihar",
  "Karkarduma (blue line)",
  "Anand Vihar (blue line)",
  "Kaushambi",
  "Vaishali",
  "Akshardham",
  "Mayur Vihar (blue line)",
  "New Ashok Nagar",
  "Noida Sector 15",
  "Noida Sector 16",
  "Noida Sector 18",
  "Botanical Garden",
  "Golf Course",
  "Noida City Centre",
  "Noida Sector 34",
  "Noida Sector 52",
  "Noida Sector 61",
  "Noida Sector 59",
  "Noida Sector 62",
  "Noida Electronic City",
  "Majlis Park",
  "Azadpur (pink line)",
  "Shalimar Bagh",
  "Netaji Subhash Place",
  "Punjabi Bagh West",
  "ESI Hospital",
  "Rajouri Garden (pink line)",
  "Mayapuri",
  "Naraina Vihar",
  "Delhi Cantonment",
  "Durgabai Deshmukh South Campus",
  "Bhikaji Cama Place",
  "Sarojini Nagar",
  "INA",
  "South Extension",
  "Lajpat Nagar",
  "Vinobapuri",
  "Ashram",
  "Sarai Kale Khan-Nizamuddin",
  "Mayur Vihar (pink line)",
  "Mayur Vihar Pocket 1",
  "Trilokpuri-Sanjay Lake",
  "East Vinod Nagar-Mayur Vihar-II",
  "Mandawali-West Vinod Nagar",
  "IP Extension",
  "Anand Vihar (pink line)",
  "Karkarduma (pink line)",
  "Karkarduma Court",
  "Krishna Nagar",
  "East Azad Nagar",
  "Welcome",
  "Jaffrabad",
  "Maujpur-Babarpur",
  "Gokulpuri",
  "Johri Enclave",
  "Shiv Vihar",

  "New Ashok Nagar (rrts)",
  "Anand Vihar (rrts)",
  "Sarai Kale Khan(rrts)",
  "Sahibabad",
  "Ghaziabad",
  "Guldhar",
  "Duhai",
  "Duhai Depot",
  "Murad Nagar",
  "Modi Nagar South",
  "Modi Nagar North",
  "Meerut South",

  "Noida Sector 51",
  "Noida Sector 50",
  "Noida Sector 76",
  "Noida Sector 101",
  "Noida Sector 81",
  "NSEZ",
  "Noida Sector 83",
  "Noida Sector 137",
  "Noida Sector 142",
  "Noida Sector 143",
  "Noida Sector 144",
  "Noida Sector 145",
  "Noida Sector 146",
  "Noida Sector 147",
  "Noida Sector 148",
  "Knowledge Park II",
  "Pari Chowk",
  "Alpha 1",
  "Delta 1",
  "GNIDA Office",
  "Depot",

  "Samaypur Badli",
  "Rohini Sector 18, 19",
  "Haiderpur Badli Mor",
  "Jahangirpuri",
  "Adarsh Nagar",
  "Azadpur (yellow line)",
  "Model Town",
  "GTB Nagar",
  "Vishwa Vidyalaya",
  "Civil Lines",
  "Kashmere Gate",
  "Chandni Chowk",
  "New Delhi",
  "Rajiv Chowk (yellow line)",
  "Patel Chowk",
  "Central Secretariat",
  "Udyog Bhawan",
  "Lok Kalyan Marg",
  "Jor Bagh",
  "INA (yellow line)",
  "AIIMS",
  "Green Park",
  "Hauz Khas",
  "Malviya Nagar",
  "Saket",
  "Qutub Minar",
  "Chhatarpur",
  "Sultanpur",
  "Ghitorni",
  "Arjangarh",
  "Guru Dronacharya",
  "Sikandarpur",
  "MG Road",
  "IFFCO Chowk",
  "Huda City Centre"

];

// Populate datalist
const datalist = document.getElementById('stations');
stationList.forEach(station => {
  const option = document.createElement('option');
  option.value = station;
  datalist.appendChild(option);
});

// function getLineColor(line) {
//   const colors = {
//     blue: '#007bff',
//     pink: '#ff69b4'
//   };
//   return colors[line] || '#999';
// }

async function getRoute() {
  const source = document.getElementById('source').value.trim();
  const destination = document.getElementById('destination').value.trim();

  const response = await fetch('http://localhost:5001/api/route', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ source, destination })
  });

  if (!response.ok) {
    alert('Error fetching route. Check station names.');
    return;
  }

  const data = await response.json();
  renderResult(data);
}

// function renderResult(data) {
//   const resultDiv = document.getElementById('result');
//   resultDiv.innerHTML = '';

//   const info = document.createElement('p');
//   info.innerHTML = `<strong>Total Travel Time:</strong> ${data.travelTime} <br>
//                     <strong>Total Cost:</strong> ₹${data.cost} <br>
//                     <strong>Interchanges:</strong> ${data.interchanges}`;
//   resultDiv.appendChild(info);

//   data.path.forEach((step, index) => {
//     const div = document.createElement('div');
//     div.classList.add('station');

//     const colorDot = document.createElement('div');
//     colorDot.className = 'line-color';
//     colorDot.style.backgroundColor = getLineColor(step.line);

//     const name = document.createElement('span');
//     name.textContent = `${step.station} (${step.line || 'Start'})`;

//     if (step.interchange) {
//       name.innerHTML += ' <span class="interchange">(Interchange)</span>';
//     }

//     div.appendChild(colorDot);
//     div.appendChild(name);
//     resultDiv.appendChild(div);
//   });
// }

function renderResult(data) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  // Info summary
  const info = document.createElement('p');
  info.innerHTML = `<strong>Total Travel Time:</strong> ${data.travelTime} <br>
                    <strong>Total Cost:</strong> ₹${data.cost} <br>
                    <strong>Interchanges:</strong> ${data.interchanges}`;
  resultDiv.appendChild(info);

  // Create table
  const table = document.createElement('table');
  table.classList.add('route-table');

  // Create header
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>#</th>
      <th>Station</th>
      <th>Line</th>
      <th>Rail</th>
      <th>Interchange</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  data.path.forEach((step, index) => {
    const row = document.createElement('tr');

    const rail = getRailNetwork(step.line); // Custom function below

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${step.station}</td>
      <td>
        <span class="line-dot" style="background-color:${getLineColor(step.line)};"></span>
        ${step.line || 'Start'}
      </td>
      <td>${rail}</td>
      <td>${step.interchange ? 'Yes' : '-'}</td>
    `;

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  resultDiv.appendChild(table);
}


function getLineColor(line) {
  const colors = {
    blue: '#007bff',
    pink: '#ff69b4',
    red: '#ff0000',
    yellow: '#ffcc00',
    green: '#00cc66',
    violet: '#800080',
    orange: '#ffa500',
    magenta: '#ff00ff',
    grey: '#999999',
    rrts: '#00bcd4',
    aqua: '#00ffff'  
  };
  return colors[line?.toLowerCase()] || '#aaa';
}

function getRailNetwork(line) {
  if (!line) return '-';
  const normalized = line.toLowerCase();

  if (['blue', 'pink', 'yellow', 'green', 'violet', 'orange', 'red', 'magenta'].includes(normalized)) {
    return 'Delhi Metro';
  } else if (normalized === 'aqua') {
    return 'Noida Metro';
  } else if (normalized === 'rrts') {
    return 'RRTS';
  } else {
    return 'Unknown';
  }
}
