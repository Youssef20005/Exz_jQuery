let rowData = document.getElementById("rowData");
let btn_submit;
$(window).ready(function(){
    $(".sk-chase").fadeOut(1000,function(){
$("#loaders").remove()
$("body").css({"overflow":"auto"})
    })
   
})

    $(".item").hover(
        function () {
            // Mouse enter event with slideDown
            $(this).find(".overlay").stop().slideDown();
        },
        function () {
            // Mouse leave event with slideUp
            $(this).find(".overlay").stop().slideUp();
            
        }
    );
    
  // Function to open the side navigation
function openSideNav() {
    // Animation to show the side navigation
    $(".nav-side").animate({
        left: 0
    }, 500);

    // Change the icon from bars to X
    $(".menue-icon i").removeClass("fa-bars").addClass("fa-times");
}

// Function to close the side navigation
function closeSideNav() {
    // Animation to hide the side navigation
    $(".nav-side").animate({
        // i make width == 280 in css
        left: -280 
    }, 500);

    // Change the icon from X to bars
    $(".menue-icon i").removeClass("fa-times").addClass("fa-bars");
}

// Close the side navigation initially
closeSideNav();

// Toggle the side navigation when the icon is clicked
$(".menue-icon i").click(() => {
    if ($(".nav-side").css("left") === "0px") {
        closeSideNav();
    } else {
        openSideNav();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Fetch meal data from the API
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
        .then(response => response.json())
        .then(data => {
            // Call the displayMeals function to render the data
            displayMeals(data.meals);
        })
        .catch(error => console.error('Error fetching data:', error));
});
function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="overlay position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    

document.getElementById('rowData').innerHTML = cartoona;
document.getElementById('loaders').style.display = 'none';
}


function SearchInput() {
    $("#boxSearch").html(`
        <div class="row py-4">
            <div class="col-md-6"> 
                <div class="input-group">
                    <input onkeyup="searchByName(this.value)" type="text" placeholder="Search By Name" class="form-control bg-transparent text-white">
                </div>
            </div>
            <div class="col-md-6"> 
                <div class="input-group">
                    <input onkeyup="searchByFirstLetter(this.value)" type="text" placeholder="Search By First Letter" class="form-control bg-transparent text-white">
                </div>
            </div>
        </div>
    `);

   
    let rowDataElement = $(rowData);

   
    rowDataElement.html("");
}
 function searchByName(name){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(response => response.json())
    .then(data => {
        displayMeals(data.meals);
    })
    .catch(error => console.error('Error fetching data:', error));


 }


function searchByFirstLetter(letter){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    .then(response => response.json())
    .then(data => {
        displayMeals(data.meals);
    })
    .catch(error => console.error('Error fetching data:', error));
}



function getCategory(){
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(response => response.json())
    .then(data => {
        displayCategory(data.categories);
    })
    .catch(error => console.error('Error fetching data:', error));
}
function displayCategory(data){

    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 pointer">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="">
                    <div class="overlay position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                    </div>
                </div>
        </div>
        `
    }
    document.getElementById('rowData').innerHTML = cartoona;
    document.getElementById('loaders').style.display = 'none';
}

function getArea(){
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    .then(response => response.json())
    .then(data => {
        displayArea(data.meals);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayArea(data){
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div class="rounded-2 text-center pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                    
                </div>
        </div>
        `
    }
    document.getElementById('rowData').innerHTML = cartoona;
}

function getIngredients(){
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    .then(response => response.json())
    .then(data => {
        displayIngredients(data.meals);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayIngredients(data){
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div class="rounded-2 text-center pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription}</p>
                    
                </div>
        </div>
        `
    }
    document.getElementById('rowData').innerHTML = cartoona;
}
function getContact(){
    document.getElementById('rowData').innerHTML =`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" onkeyup="validateInputs()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="validateInputs()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="validateInputs()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="validateInputs()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" onkeyup="validateInputs()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" onkeyup="validateInputs()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="btn_submit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
btn_submit=document.getElementById("btn_submit")
addFocusListener("name", validateName);
addFocusListener("email", validateEmail);
addFocusListener("phone", validatePhone);
addFocusListener("age", validateAge);
addFocusListener("password", validatePassword);
addFocusListener("repassword", validateRePassword);

}

function validateInputs() {
    validateName();
    validateEmail();
    validatePhone();
    validateAge();
    validatePassword();
    validateRePassword();
}

function addFocusListener(elementId, validationFunction) {
    document.getElementById(elementId).addEventListener("focus", function() {
        if (validationFunction()) {
            document.getElementById(`${elementId}Alert`).classList.add("d-none");
            btn_submit.removeAttribute("disabled");
        } else {
            document.getElementById(`${elementId}Alert`).classList.remove("d-none");
        }
    });
}

function validateName() {
    let name = document.getElementById("name").value;
    let nameAlert = document.getElementById("nameAlert");
    let regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(name)) {
        nameAlert.classList.remove("d-none");
        nameAlert.classList.add("d-block");
        return false;
    } else {
        nameAlert.classList.remove("d-block");
        nameAlert.classList.add("d-none");
        return true;
    }
}

function validateEmail() {
    let email = document.getElementById("email").value;
    let emailAlert = document.getElementById("emailAlert");
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
        emailAlert.classList.remove("d-none");
        emailAlert.classList.add("d-block");
        return false;
    } else {
        emailAlert.classList.remove("d-block");
        emailAlert.classList.add("d-none");
        return true;
    }
}

function validatePhone() {
    let phone = document.getElementById("phone").value;
    let phoneAlert = document.getElementById("phoneAlert");
    let regex = /^[0-9]{11}$/;

    if (!regex.test(phone)) {
        phoneAlert.classList.remove("d-none");
        phoneAlert.classList.add("d-block");
        return false;
    } else {
        phoneAlert.classList.remove("d-block");
        phoneAlert.classList.add("d-none");
        return true;
    }
}

function validateAge() {
    let age = document.getElementById("age").value;
    let ageAlert = document.getElementById("ageAlert");
    let regex = /^[0-9]{1,3}$/;

    if (!regex.test(age)) {
        ageAlert.classList.remove("d-none");
        ageAlert.classList.add("d-block");
        return false;
    } else {
        ageAlert.classList.remove("d-block");
        ageAlert.classList.add("d-none");
        return true;
    }
}

function validatePassword() {
    let password = document.getElementById("password").value;
    let passwordAlert = document.getElementById("passwordAlert");
    let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}/;

    if (!regex.test(password)) {
        passwordAlert.classList.remove("d-none");
        passwordAlert.classList.add("d-block");
        return false;
    } else {
        passwordAlert.classList.remove("d-block");
        passwordAlert.classList.add("d-none");
        return true;
    }
}

function validateRePassword() {
    let repassword = document.getElementById("repassword").value;
    let repasswordAlert = document.getElementById("repasswordAlert");

    if (repassword !== document.getElementById("password").value) {
        repasswordAlert.classList.remove("d-none");
        repasswordAlert.classList.add("d-block");
        return false;
    } else {
        repasswordAlert.classList.remove("d-block");
        repasswordAlert.classList.add("d-none");
        return true;
    }
}






