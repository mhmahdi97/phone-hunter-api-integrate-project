const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  
  // display 6 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 6) {
    phones = phones.slice(0, 6);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // display no phones found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
     <div class="card p-4">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
              </div>
            </div>
         `;
    phonesContainer.appendChild(phoneDiv);
  });
  //   stop spinner
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  //   start spinner
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  console.log("button clicked");
  processSearch(6);
});

// search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    console.log("field entered");
    if (event.key === "Enter") {
      processSearch(6);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

/* not the best way to load show all
at first it load the slice item data on search button click
then when clicked show all it reloads the entire data once again and 
show all the data
*/
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
  <p>${phone.releaseDate ? phone.releaseDate : "No release date found!"}</p>
  <p>Storage: ${
    phone.mainFeatures.storage
      ? phone.mainFeatures.storage
      : "No storage data found!"
  }</p>
  <p>Chipset: ${
    phone.mainFeatures.chipSet
      ? phone.mainFeatures.chipSet
      : "No chipset data found!"
  }</p>
  <p>Display: ${
    phone.mainFeatures.displaySize
      ? phone.mainFeatures.displaySize
      : "No display data found!"
  }</p>
  <p>Memory: ${
    phone.mainFeatures.memory
      ? phone.mainFeatures.memory
      : "No memory data found!"
  }</p>
  
  `;
};

// loadPhones();
