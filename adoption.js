//
const loadSpinner = () => {
  document.getElementById("spinner").style.display = "block";

  setTimeout(function () {
    // Stop the spinner
    document.getElementById("spinner").style.display = "none";

    loadAllCategory();
    loadAllPets();
  }, 1000);
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

// Load pets by Category
const loadAllByCategory= (id) => {
  
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayAllPets(data.data))
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
    
    // Create button
    const button = document.createElement("div");
    button.innerHTML = `
        <button onClick = "loadAllByCategory('${item.category}')" class="flex justify-center items-center p-3 text-xl font-bold gap-5 btn"><img class="w-7" src="${item.category_icon}" /> ${item.category}</button>
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
    console.log(pet);
    const card = document.createElement("div");
    card.classList = "card card-compact border border-gray-500 shadow-md rounded-lg";

    card.innerHTML = `
        <div class = "p-4 flex flex-col" >
            <figure class = "h-[200px]">
                <img
                src="${pet.image}"
                class = "h-[200px] w-full object-cover rounded-lg mb-4"
                alt="Pets" />
            </figure>
            <div class="space-y-2">
                <h2 class="card-title">${pet.pet_name}</h2>
                <p class="text-gray-500">Breed: ${pet.breed ? pet.breed : ""}</p>
                <p class="text-gray-500">Birth: ${pet.date_of_birth ? pet.date_of_birth : ""}</p>
                <p class="text-gray-500">Gender: ${pet.gender ? pet.gender : ""}</p>
                <p class="text-gray-500">Price: ${pet.price}</p>
                <hr/>
                <div class="card-actions grid grid-clos-2 md:grid-cols-3 justify-around items-center">
                    <button class="btn px-5"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="btn text-blue-600 font-bold p-4">Adopt</button>
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

loadSpinner();
