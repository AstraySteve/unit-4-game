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

    imageCard: "Artoria2.png",
    imageSprite: "Arthur_Sprite.png",
};

var Archer = {
    name: "Archer (EMIYA)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values

    imageCard: "Emiya2.png",
    imageSprite: "Emiya_Sprite.png",
};

var Lancer = {
    name: "Lancer (Cu Chulainn)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values

    imageCard: "Cuchulainn1.png",
    imageSprite: "Cu_Sprite.png",
};

var Sheilder = {
    name: "Sheilder (Mashu Kyrielite)",
    health: 100, //TODO give health actual values
    attackPower: 50, //TODO give attackPower actual values

    imageCard: "Shielder2.png",
    imageSprite: "Mashu_Sprite.png",
};

//Global Variables
var mainList = [Saber, Archer, Lancer, Sheilder];
var player; //variable to hold player's choice
var enemyList = []; //list to hold remaining enemies
var enemy; //Variable to hold current enemy
var enemyFlag = false; //flag if enemy has been selected

//Functions
function showEnemyList(){
    //Function dynamically creates buttons for enemy selection
    $("#enemies").empty(); //clears the div

    for (i=0; i<enemyList.length; i++){
        var servantCard = $("<button>");
        servantCard.attr({
            class: "btn btn-warning servant-card col-2 p-0 m-1",
            id: "enemy" + i,
            value: i,
        });
        $("#enemies").append(servantCard);

        //Adds <img> under <button>
        var servantImage = $("<img>");
        servantImage.attr({
            src: "assets/images/" + enemyList[i].imageCard,
            alt: "SERVANT",
            class: "img-fluid card-border",
        });
        $("#enemy" + i).append(servantImage);
    }
}

function initPlayer(){
    //Function to initialize player side
    $("#playerName").text(player.name);
    $("#playerHP").text(player.health);
    $('#playerImg').attr({
        src: "assets/images/" + player.imageSprite,
    });
}

function initEnemy(){
    //Function to initialize enemy side
    $("#enemyName").text(enemy.name);
    $("#enemyHP").text(enemy.health);
    $('#enemyImg').attr({
        src: "assets/images/" + enemy.imageSprite,
    });
}

$(document).ready(function() {
    //TODO fill in the on-click events that the game runs on
    //Character Selection Event
    $("#selection-block").on("click", ".servant-card", function() {
        var playerChoice = this.value;
        player = mainList[playerChoice];

        //Populate enemy List with the leftover characters
        for (i=0; i<mainList.length; i++){
            if (i != playerChoice){
                enemyList.push(mainList[i]);
            }
        }
        showEnemyList();
        initPlayer();

        //Hide character selection block and display main game interface
        $("#selection-block").attr("style", "display: none");
        //$("#main-game").attr("style", "display: block"); //TEMP: re-add for game functionality
    });
    
    //Enemy Selection Event
    $("#enemies").on("click", ".servant-card", function(){
        if (enemyFlag){
            alert("Finish current battle!");
        }
        else{
            enemyFlag = true; //flag prevent selecting another opponent
            enemy = enemyList[this.value];
            enemyList.splice(this.value,1); //remove item from array
            initEnemy();
            //console.log(enemyList);
            showEnemyList();
        }
    });

});