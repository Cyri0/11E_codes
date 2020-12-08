let profile = {
    "btn":document.getElementById("character_btn"),
    "page":document.getElementById("profile_page")
}

let adventure = {
    "btn": document.getElementById("adventure_btn"),
    "page": document.getElementById("adventure_page")
}

function init(){
    switch_to_profile();
}

function switch_to_adventure(){
    adventure.page.style.display = "block";
    adventure.btn.style.display = "none";
    profile.page.style.display = "none";
    profile.btn.style.display = "inline";
}
function switch_to_profile(){
    adventure.page.style.display = "none";
    adventure.btn.style.display = "inline";
    profile.page.style.display = "block";
    profile.btn.style.display = "none";
}

init();