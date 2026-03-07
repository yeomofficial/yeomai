const fileInput = document.getElementById("fileInput");
const profileImage = document.getElementById("profileImage");
const avatarWrapper = document.querySelector(".avatar-wrapper");

avatarWrapper.addEventListener("click", () => {
fileInput.click();
});

fileInput.addEventListener("change", function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

profileImage.src = e.target.result;
profileImage.style.display = "block";

document.querySelector(".avatar-placeholder").style.display = "none";

};

reader.readAsDataURL(file);

}

});


/* DOB logic */

const dobInput = document.getElementById("dob");

let today = new Date();
today.setDate(today.getDate() - 1);

dobInput.max = today.toISOString().split("T")[0];



/* Submit */

const form = document.getElementById("infoForm");

form.addEventListener("submit", function(e){

e.preventDefault();

const username = document.getElementById("username").value;
const gender = document.getElementById("gender").value;
const dob = document.getElementById("dob").value;
const fashion = document.getElementById("fashion").value;

console.log({
username,
gender,
dob,
fashion
});

alert("Profile saved!");

});
