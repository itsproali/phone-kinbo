// Dom Selectors
const mainContainer = document.getElementById('display-phones');
const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('button-addon2');
const itemDetails = document.getElementById('item-details');

// Search Phone
const searchPhone = () => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField.value}`)
        .then(res => res.json())
        .then(data => displayPhones(data));
    searchField.value = '';

}

// Display Phones
const displayPhones = phones => {
    mainContainer.textContent = '';
    if (phones.status === false) {
        alert('Please try again')
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
            mainContainer.appendChild(div);
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
    const div = document.createElement('div');
    div.classList.add('row', 'g-0')
    div.innerHTML = `
    <div class="col-md-5">
        <img src="${details.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-7">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
    `;
    itemDetails.appendChild(div);
}