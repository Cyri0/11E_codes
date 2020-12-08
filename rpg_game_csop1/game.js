let stats = {
    "life": 100,
    "strength": 10,
    "endurance": 10,
    "deffense": 10,
    "experience": 0 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Egy egészségtelen, gyenge jobbágy vagy!", "profile_lvl0.jpg"],
    ["Egy jól táplált jobbágy vagy!","profile_lvl1.jpg"],
    ["Te vagy a jobbágyok gyöngye, minden falunap császára!","profile_lvl2.jpg"],
    ["Szerzetes lettél bejárónővel meg minden... Nincs többé éhezés! (És nők sem...)", "profile_lvl3.jpg"]
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "strength": document.getElementById("profile_strength"),
    "endurance": document.getElementById("profile_endurance"),
    "deffense": document.getElementById("profile_deffense"),
    "experience": document.getElementById("profile_experience"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.strength.innerHTML = stats.strength;
    profile_stats.endurance.innerHTML = stats.endurance;
    profile_stats.deffense.innerHTML = stats.deffense;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = 10;
    display_addBtns();
}

refreshProfileStats();

function update_strength(){
    if(available_points > 0){
        available_points--;
        stats.strength += 5;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.endurance += 5;
        refreshProfileStats();
    }
}
function update_deffense(){
    if(available_points > 0){
        available_points--;
        stats.deffense += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshProfileStats();
    }
}

/* ADVENTURE */

let story = document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function kaszalas(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.deffense;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        // story.innerHTML += "Megsebződtél (-1 élet)<br>";
        // stats.life -= 1;
        fight("Farkas", 5, 100);
        refreshProfileStats();
    }else{
        story.innerHTML += "Tapasztalatot szereztél! (+1)<br>";
        stats.experience += 1;
        refreshProfileStats();
    }
}

function fight(e_name, e_damage, e_life){
    story.innerHTML += "Munka közben megtámadott téged egy " + e_name + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            // ellenfél támad
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.deffense;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Ellenfeled rád ront! (-"+e_damage+" élet)<br>";
                stats.life -= e_damage;
                refreshProfileStats();
            }else{
                story.innerHTML += "Sikeresen elkerülöd ellenfeled csapását!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.endurance;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Rátámadsz ellenfeledre! ("+e_name+" -"+stats.strength+" élet)<br>";
                e_life -= stats.strength;
                story.innerHTML += e_name + "-nek maradt " + e_life;
                refreshProfileStats();
            }else{
                story.innerHTML += "Ellenfeled sikeresen kikerül a csapásodat!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}