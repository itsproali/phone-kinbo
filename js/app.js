// Dom Selectors
const mainContainer = document.getElementById('main-container');
const applePhones = document.getElementById('apple-phones');
const samsungPhones = document.getElementById('samsung-phones');
const oppoPhones = document.getElementById('oppo-phones');
const phonesContainer = document.getElementById('display-phones');
const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('button-addon2');
const itemDetails = document.getElementById('item-details');
const spinner = document.getElementById('spinner');

/* Load phones before Search */
// Apple
fetch(`https://openapi.programming-hero.com/api/phones?search=${'apple'}`)
    .then(res => res.json())
    .then(data => displayApples(data));

// Samsung
fetch(`https://openapi.programming-hero.com/api/phones?search=${'samsung'}`)
    .then(res => res.json())
    .then(data => displaySamsung(data));

// Oppo
fetch(`https://openapi.programming-hero.com/api/phones?search=${'oppo'}`)
    .then(res => res.json())
    .then(data => displayOppo(data));


// Common Function to display phones
const displayPhones = (parentContainer, sliced) => {
    sliced.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col', 'animate__animated', 'animate__backInLeft');
        div.innerHTML = `
            <div class="card h-100 shadow p-2">
            <img src="${phone.image}" class="card-img-top h-75 w-auto mx-auto" alt="${phone.phone_name}">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p >${phone.brand}</p>
              <button onclick="loadItemDetails('${phone.slug}')" class="custom-btn">Details</button>
            </div>
          </div>
        `;
        parentContainer.appendChild(div);
    })
    spinner.textContent = '';
}

/* Display Phones Before Search */
// Apple Phones
const displayApples = phones => {
    const sliced = phones.data.slice(0, 6);
    displayPhones(applePhones, sliced);
}

// Samsung Phones
const displaySamsung = phones => {
    const sliced = phones.data.slice(0, 6);
    displayPhones(samsungPhones, sliced);
}

// Oppo Phones
const displayOppo = phones => {
    const sliced = phones.data.slice(0, 6);
    displayPhones(oppoPhones, sliced);
}

// Search Phone
const searchPhone = () => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField.value}`)
        .then(res => res.json())
        .then(data => displaySearchResult(data));
    searchField.value = '';
}

// Display Phones
const displaySearchResult = phones => {
    phonesContainer.textContent = '';
    itemDetails.textContent = '';
    itemDetails.style.display = 'none';
    if (phones.status === false) {
        document.getElementById('alert').style.display = 'block';
    } else {
        document.getElementById('all-phones').textContent = '';
        document.getElementById('alert').style.display = 'none';
        const sliced = phones.data.slice(0, 20);
        displayPhones(phonesContainer, sliced);
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
    location = '#item-details';
    itemDetails.textContent = '';
    itemDetails.style.display = 'block';
    const div = document.createElement('div');
    div.classList.add('row', 'g-0', 'align-items-center', 'animate__animated' , 'animate__bounceInUp')
    div.innerHTML = `
    <div class="col-12 col-md-5 text-center">
        <img src="${details.image}" class="card-img-top w-75" alt="${details.name}">
        <h6 class="mt-2">${releaseDate(details.releaseDate)}</h6>
        </div>
       <div class="col-12 col-md-7">
       <div class="card-body">
       <h3 class="text-custom">${details?.name}</h3>
       <h5">Brand: ${details?.brand}</h5>
       <h4 class="mt-2">Product Details:</h4>
           <ul>
                <li class="mb-0"><b>ChipSet:</b> ${details?.mainFeatures?.chipSet}</li>
                <li class="mb-0"><b>Display:</b> ${details?.mainFeatures?.displaySize}</li>
                <li class="mb-0"><b>Memory:</b> ${details?.mainFeatures?.memory}</li>
                <li class="mb-0"><b>Sensor:</b> ${getSensors(details?.mainFeatures?.sensors)}</li>
           </ul>
           <h5 class="mt-1">Others:</h5>
           <ul>
           <li class="mb-0"><b>USB:</b> ${details?.others?.USB}</li>
                <li class="mb-0"><b>WLAN:</b> ${details?.others?.WLAN}</li>
                <li class="mb-0"><b>Bluetooth:</b> ${details?.others?.Bluetooth}</li>
                <li class="mb-0"><b>GPS:</b> ${details?.others?.GPS}</li>
                <li class="mb-0"><b>Radio:</b> ${details?.others?.Radio}</li>
           </ul>
           <button class="custom-btn" onclick="alert('We will add this feature soon ....')">Buy Now</button>
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

// Display Sensor
const getSensors = array => array.join(', ');