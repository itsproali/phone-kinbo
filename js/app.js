// Dom Selectors
const mainContainer = document.getElementById('display-phones');
const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('button-addon2');

// Search Phone
const searchPhone = () => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField.value}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data));

}

const displayPhones = phones => {
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <h1>${phone.phone_name}</h1>
        `
        mainContainer.appendChild(div);
    });
}