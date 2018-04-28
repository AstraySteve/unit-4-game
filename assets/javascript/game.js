/*
    Steven Tran
    Assignment 4, 2018
    UofT SCS Coding Bootcamp
*/

//Object Characters
var Saber = {
    name: "Saber (Artoria Pendragon)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values

    image: "Artoria2.png",
};

var Archer = {
    name: "Archer (EMIYA)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values

    image: "Emiya2.png",
};

var Lancer = {
    name: "Lancer (Cu Chulainn)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values

    image: "Cuchulainn1.png",
};

var Sheilder = {
    name: "Sheilder (Mashu Kyrielite)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values

    image: "Shielder2.png",
};

//Global Variables
var mainList = [Saber, Archer, Lancer, Sheilder];
var player; //variable to hold player's choice
var enemyList = []; //list to hold remaining enemies

//Functions
function showEnemyList(){
    //console.log(enemyList.length);
    for (i=0; i<enemyList.length; i++){
        console.log(enemyList.length);
        var servantCard = $("<div>");
        servantCard.attr({
            class: "servant-card col-3",
            'data-value': i,
        });
        servantCard.text(enemyList[i].name);
        $("#fightList").append(servantCard);

        var servantImage = $("<img>");
        servantImage.attr({
            src: "assets/images/" + enemyList[i].image,
            alt: "SERVANT",
            class: "img-fluid card-border",
        });
        
        
        $(".servant-card").append(servantImage);
    }
}

$(document).ready(function() {
    //TODO fill in the on-click events that the game runs on
    //Character Selection Event
    $("#selection-block").on("click", ".servant-card", function() {
        var playerChoice = $(this).attr("data-value");
        player = mainList[playerChoice];

        //Populate enemy List with the leftover characters
        for (i=0; i<mainList.length; i++){
            if (i != playerChoice){
                enemyList.push(mainList[i]);
            }
        }
        showEnemyList();

        //Hide character selection block and display main game interface
        $("#selection-block").attr("style", "display: none");
        //$("#main-game").attr("style", "display: block"); //TEMP: re-add for game functionality

        //TODO TEST CODE, CHANGE FOR GAME FUNCTIONALITY
        alert("Servant Selected: " + mainList[$(this).attr("data-value")].name);
        //DEBUG CODE REMOVE WHEN DONE
        //console.log(enemyList);
        //console.log(player.name);
    });

    //TEST CODE REMOVE WHEN DONE
    
});