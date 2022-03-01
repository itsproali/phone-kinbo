// Dom Selectors
const mainContainer = document.getElementById('main-container');
const applePhones = document.getElementById('apple-phones');
const phonesContainer = document.getElementById('display-phones');
const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('button-addon2');
const itemDetails = document.getElementById('item-details');

// Load phones before Search
fetch(`https://openapi.programming-hero.com/api/phones?search=${'iphone'}`)
    .then(res => res.json())
    .then(data => displayApples(data));

// Display Phones Before Search
const displayApples = phones => {
    const sliced = phones.data.slice(0, 6);
    sliced.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 shadow p-2">
            <img src="${phone.image}" class="card-img-top h-75 w-auto mx-auto" alt="${phone.phone_name}">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p >${phone.brand}</p>
              <button onclick="loadItemDetails('${phone.slug}')" class="btn btn-outline-warning px-4">Details</button>
            </div>
          </div>
        `;
        applePhones.appendChild(div);
    })
}

// Search Phone
const searchPhone = () => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField.value}`)
        .then(res => res.json())
        .then(data => displayPhones(data));
    searchField.value = '';
}

// Display Phones
const displayPhones = phones => {
    phonesContainer.textContent = '';
    itemDetails.textContent = '';
    itemDetails.style.display = 'none';
    document.getElementById('all-phones').textContent = '';
    if (phones.status === false) {
        alert('Your Search Result not Found')
    } else {
        const sliced = phones.data.slice(0, 20);
        sliced.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 shadow p-2">
            <img src="${phone.image}" class="card-img-top h-75 w-auto mx-auto" alt="${phone.phone_name}">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p >${phone.brand}</p>
              <button onclick="loadItemDetails('${phone.slug}')" class="btn btn-outline-warning px-4">Details</button>
            </div>
          </div>
        `;
            phonesContainer.appendChild(div);
        })
    }
}

// Load Details
const loadItemDetails = itemDetails => {
    fetch(`https://openapi.programming-hero.com/api/phone/${itemDetails}`)
        .then(res => res.json())
        .then(data => displayItemDetails(data.data))
}

// Display Details
const displayItemDetails = details => {
    console.log(details);
    itemDetails.textContent = '';
    itemDetails.style.display = 'block';
    const div = document.createElement('div');
    div.classList.add('row', 'g-0')
    div.innerHTML = `
    <div class="col-md-4">
        <img src="${details.image}" class="img-fluid rounded-start mx-auto" alt="${details.phone_name}">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title text-custom">${details.name}</h5>
           <h6>Brand: ${details.brand}</h6>
           <h6>${releaseDate(details.releaseDate)}</h6>
           <ul>
           <li class="mb-0">ChipSet: ${details.mainFeatures.chipSet}</li>
           <li class="mb-0">Display: ${details.mainFeatures.displaySize}</li>
           </ul>
        </div>
    </div>
    `;
    itemDetails.appendChild(div);
}

// Release Date Handle
const releaseDate = releaseStatus => {
    if (releaseStatus === '') {
        return "No Release Date Found"
    } else {
        return releaseStatus;
    }
}