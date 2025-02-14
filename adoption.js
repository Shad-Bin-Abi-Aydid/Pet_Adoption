// 
const loadSpinner = () =>{
    document.getElementById("spinner").style.display = "block";
    
    setTimeout(function (){
        // Stop the spinner
        document.getElementById("spinner").style.display = "none";

        loadAllCategory();
        loadAllPets();
    }, 1000);
}

// Load all category
const loadAllCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error))
}

// load all pets at a time 
const loadAllPets = () =>{

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error))
    

    
}

// Display Category Button
const displayCategory = (categories)=>{
    
    const categoryContainer = document.getElementById("category-container");

    // apply a foreach loop to create button for all categories
    categories.forEach((item) => {

        // Create button 
        const button = document.createElement("button");
        button.className = "flex justify-center items-center p-3 text-xl font-bold gap-5 btn"
        button.innerHTML = `<img class="w-7" src="${item.category_icon}" /> ${item.category}`

        // Append the button to the category container
        categoryContainer.appendChild(button);

    });
    
}


// Display All pets
const displayAllPets = (pets) =>{
    console.log(pets)

}

loadSpinner();