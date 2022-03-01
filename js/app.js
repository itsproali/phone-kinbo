// Dom Selectors
const mainContainer = document.getElementById('display-phones');
const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('button-addon2');

// Search Phone
const searchPhone = () => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField.value}`)
        .then(res => res.json())
        .then(data => displayPhones(data));
    searchField.value = '';

}

// Display Phones
const displayPhones = phones => {
    if (phones.status === false) {
        alert('Please try again')
    } else {
        phones.data.forEach(phone => {
            console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 shadow p-2">
            <img src="${phone.image}" class="card-img-top h-75 w-auto mx-auto" alt="${phone.phone_name}">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        `;
            mainContainer.appendChild(div);
        });
    }
}