const loadPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    console.log(phones);

    // display 10 phones only 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    // display all phones
    const phoneDivContainer = document.getElementById('phones-container')
    phoneDivContainer.innerHTML = '';

    phones.forEach(element => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${element.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                </div>
            </div>
        `
        phoneDivContainer.appendChild(phoneDiv)
    });

    // stop spinner or loader
    toggleSpinner(false);
}


// search phone==============
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
    toggleSpinner(true)
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'enter') {
        processSearch(10);
    }
});


const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load show All ===============================
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name ? phone.name : 'No Name Available';
    const phoneDetails = document.getElementById('phone-details');
    console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate}</p>
        <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No Data Available'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}


loadPhones('a')