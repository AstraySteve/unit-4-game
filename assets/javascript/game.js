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
};

var Archer = {
    name: "Archer (EMIYA)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values
};

var Lancer = {
    name: "Lancer (Cu Chulainn)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values
};

var Sheilder = {
    name: "Sheilder (Mashu Kyrielite)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values
};

$(document).ready(function() {
    //TODO fill in the on-click events that the game runs on

    //TEST CODE REMOVE WHEN DONE
    $("#selection-block").on("click", "#card", function() {
        alert("Servant Selected");
        $("#selection-block").attr("style", "display: none");
    });
});