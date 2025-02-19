// Spinner for All data
const loadSpinner = () => {
  document.getElementById("spinner").style.display = "block";

  setTimeout(function () {
    // Stop the spinner
    document.getElementById("spinner").style.display = "none";
    document.getElementById("likedPets").classList.remove("hidden");

    loadAllCategory();
    loadAllPets();
  }, 2000);
};

// Spinner for Category data
const loadSpinnerForCategory = (data) => {
  const spinnerCate = document.getElementById("spinner-2");
  spinnerCate.style.display = "block";
  spinnerCate.classList.remove("hidden")
  document.getElementById("pets-container").classList.add("hidden");
  document.getElementById("likedPets").classList.add("hidden");


  setTimeout(function () {
    // Stop the spinner
    spinnerCate.style.display = "none";
    document.getElementById("pets-container").classList.remove("hidden");
    document.getElementById("likedPets").classList.remove("hidden");
    spinnerCate.classList.add("hidden");

    displayAllPets(data);
  }, 2000);
};


// Scroll to the main section after clicking the view more button
const scrollToSection = (sectionId) => {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
};

// Load all category
const loadAllCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};

// load all pets at a time
const loadAllPets = () => {
  
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
};

// load all pets using sort-by-price
const loadAllPetsSoryByPrice = () => {
  
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {

      data.pets.sort((a, b) => b.price - a.price);
      
      displayAllPets(data.pets)

    })
    .catch((error) => console.log(error));
};

// Load pets by Category
const loadAllByCategory= (id, cId) => {
  
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

      // remove the active button class if there have any
      const activeBtnClass = document.getElementsByClassName("categoryBtn");
      for (let actBtn of activeBtnClass) {
        actBtn.classList.remove("bg-blue-500", "bg-opacity-50", "text-white");
      }

      // Select the button dynamically and add special style for active button.
      const activeBtn = document.getElementById(`categoryBtn-${cId}`);
      activeBtn.classList.add("bg-blue-500", "bg-opacity-50", "text-white");

      loadSpinnerForCategory(data.data);

    })
    .catch((error) => console.log(error));
};

// Load Pets by petID Name
const loadPetByIdName = (petId) =>{

  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => modalDisplay(data.petData))
    .catch((error) => console.log(error));

}

// Display Category Button
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  // apply a foreach loop to create button for all categories
  categories.forEach((item) => {
    console.log(item);
    
    // Create button
    const button = document.createElement("div");
    button.innerHTML = `
        <button id= "categoryBtn-${item.id}" onClick = "loadAllByCategory('${item.category}',${item.id})" class="flex justify-center items-center p-3 text-xl font-bold gap-5 btn categoryBtn"><img class="w-7" src="${item.category_icon}" /> ${item.category}</button>
    `

    // button.className =
    //   "flex justify-center items-center p-3 text-xl font-bold gap-5 btn";
    // button.innerHTML = `<img class="w-7" src="${item.category_icon}" /> ${item.category}`;

    // Append the button to the category container
    categoryContainer.appendChild(button);
  });
};

// Display All pets
const displayAllPets = (pets) => {
  const petsContainer = document.getElementById("pets-container");

  // Remove all innerHTML from the pets-container
  petsContainer.innerHTML = "";

  if(pets.length == 0){
    // remove the grid to show the error in the middle
    petsContainer.classList.remove("grid");

    // set the error information
    petsContainer.innerHTML = `
     <div class="flex flex-col justify-center items-center gap-5 mt-10">
      <img src="./images/error.webp" />
      <h2 class = "font-bold text-2xl">Oops!! Sorry, There is no content here</h2>
     </div>
    `;
    return;
  }
  else{
    petsContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card card-compact border border-gray-500 shadow-md rounded-lg";

    card.innerHTML = `
        <div class = "p-4 flex flex-col" >
            <figure class = "h-[200px]">
                <img
                src="${pet.image}"
                class = "w-full h-48 md:h-[200]  object-cover rounded-lg mb-4"
                alt="Pets" />
            </figure>
            <div class="space-y-2">
                <h2 class="card-title">${pet.pet_name}</h2>
                <p class="text-gray-500">Breed: ${pet.breed ? pet.breed : "Not Available"}</p>
                <p class="text-gray-500">Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available"}</p>
                <p class="text-gray-500">Gender: ${pet.gender ? pet.gender : "Not Available"}</p>
                <p class="text-gray-500">Price: ${pet.price}</p>
                <hr/>
                <div class="card-actions grid grid-clos-2 md:grid-cols-3 justify-around items-center">
                    <button onClick = "handleLike('${pet.image}')" class="btn px-5"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button id="adoptBtn-${pet.petId}" onClick = "showCountdownModal(${pet.petId})" class=" btn text-blue-600 font-bold p-4">Adopt</button>
                    <button onClick = "loadPetByIdName('${pet.petId}')" class="btn text-blue-600 font-bold">Details</button>
                </div>
            </div>
        </div>

        `;
        petsContainer.append(card);
  });
  
};

// Modal display
const modalDisplay = (pet) =>{
  const modalContainer = document.getElementById("modal-content");

  modalContainer.innerHTML = `
    <img class="h-full w-full" src="${pet.image}" />
    <p class= "mt-4">${pet.pet_details}</p>  

  `;

  document.getElementById("my_modal_1").showModal();
}

// Count down Modal
const showCountdownModal = (id) => {
  
  const modal = document.getElementById("countdownModal");
  const countdownText = document.getElementById("countdownText");
  const adoptBtn = document.getElementById(`adoptBtn-${id}`);

  modal.classList.remove("hidden"); 

  let count = 3;
  countdownText.innerText = count;

  const countdown = setInterval(() => {
    count--;
    countdownText.innerText = count;

    if (count === 0) {
      clearInterval(countdown);
      setTimeout(() => {
        modal.classList.add("hidden");
        adoptBtn.innerText = "Adopted"
        adoptBtn.setAttribute("disabled", true);
      }, 500); // Slight delay before hiding
    }
  }, 1000);
};

// Handle Like Button
const handleLike = (image) =>{

  const likedPets = document.getElementById("likedPets");
  const showInfo = document.getElementById("ShowingInfo");
  showInfo.classList.add("hidden");
  likedPets.classList.add("grid","grid-cols-2");
  
  const imageElement = document.createElement("img");
  imageElement.classList = "w-full h-full object-cover rounded-lg"
  imageElement.src = image;
  
  likedPets.appendChild(imageElement);

}

loadSpinner();
