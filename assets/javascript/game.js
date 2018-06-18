/*
    Steven Tran
    Assignment 4, 2018
    UofT SCS Coding Bootcamp
*/

//Global Variables
var mainList = [Saber, Archer, Lancer, Sheilder];
var player; //variable to hold player's choice
var enemyList = []; //list to hold remaining enemies
var enemy; //Variable to hold current enemy
var enemyFlag = false; //flag if enemy has been selected
var turnCount = 0;
var audioElement = document.createElement("audio");

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

        var servantClass = $("<h5>");
        servantClass.text(enemyList[i].class);
        $("#enemy" + i).append(servantClass);

        //Adds <img> under <button>
        var servantImage = $("<img>");
        servantImage.attr({
            src: "assets/images/" + enemyList[i].imageCard,
            alt: "SERVANT",
            class: "img-fluid",
        });
        $("#enemy" + i).append(servantImage);

        var servantStat = $("<p>");  
        servantStat.text(enemyList[i].health);
        $("#enemy" + i).append(servantStat);
    }
}

function initPlayer(){
    //Function to initialize player side
    $("#playerName").text(player.name);
    $("#playerHP").text(player.health);

    var image = $("<img>");
    image.attr({
        src: "assets/images/" + player.imageSprite2,
        alt: "Player",
        class: "img-fluid",
    });
    $('#playerImage').append(image);

    attkMultiplier(player, 1);
}

function initEnemy(){
    //Function to initialize enemy side
    $("#enemyName").text(enemy.name);
    $("#enemyHP").text(enemy.health);

    var image = $("<img>");
    image.attr({
        src: "assets/images/" + enemy.imageSprite,
        alt: "Enemy",
        class: "img-fluid",
    });
    $('#enemyImage').append(image);

    attkMultiplier(enemy, 2);
}

function playerAttack(){
    //caculates damage aganist enemies and outputs results
    var newOutput = $("<p>");
    newOutput.text("Attacked for: " + (player.attackPower * turnCount));
    $("#output").append(newOutput);

    enemy.health -= (player.attackPower * turnCount);
    //player.attackPower = player.attackPower * turnCount; //Increase attack power
    $("#enemyHP").text(enemy.health);

    if (enemy.health <= 0){
        newOutput.text("Enemy eliminated!");
        $("#output").append(newOutput);
        $('#enemyImage').empty();

        if(enemyList.length <= 0){
            newOutput.text("You Win!");
            $("#output").append(newOutput);
            audioElement.setAttribute("src", "assets/sound/"+player.winAudio);
            audioElement.play();
            enemyFlag = false;
        }
        else{
            enemyFlag = false;
        }
    }
    else{
        counterAttack();
    }
}

function counterAttack(){
    //caculates damage received and outputs results
    var newOutput = $("<p>");
    newOutput.text("Received : " + enemy.attackPower + " damage");
    $("#output").append(newOutput);

    player.health -= enemy.attackPower;
    $("#playerHP").text(player.health);

    if (player.health <= 0){
        audioElement.setAttribute("src", "assets/sound/"+player.loseAudio);
        audioElement.play();
        newOutput.text("You are dead!");
        $("#output").append(newOutput);
        $('#playerImage').empty();
        enemyFlag: false;
    }
}

function attkMultiplier(servant, user){
    //Function takes in an object (servant) and flag (user), 1 for player and 2 for computer
    //randomly multiply object attackPower accordingly
    if(user == 1){
        servant.attackPower = servant.attackPower * (Math.floor(Math.random() * (10-2+1)) + 2);
    }
    else if (user == 2){
        servant.attackPower = servant.attackPower * (Math.floor(Math.random() * (30-10+1)) + 10);
    }
    else{
        console.log("error invalid input");
    }
}

//main
$(document).ready(function() {
    //TODO fill in the on-click events that the game runs on
    //Character Selection Event
    $("#selection-block").on("click", ".servant-card", function() {
        var playerChoice = this.value;
        player = mainList[playerChoice];

        // Gets Link for sound file
        audioElement.setAttribute("src", "assets/sound/"+player.summonAudio);
        audioElement.play();

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
        $("#main-game").attr("style", "display: block");
        $(".game-area").attr("style", "padding: 0");
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
            showEnemyList();
        }
    });

    //Attack Button Event
    $("#central-control").on("click", "#attack", function(){
        if(enemyFlag == false && player.health > 0){
            alert("Please select an opponent.");
        }
        else if(player.health <= 0){
            alert("You are dead!, refresh page to try again!");
        }
        else{
            var i = Math.floor(Math.random() * player.attackAudio.length);
            audioElement.setAttribute("src", "assets/sound/"+player.attackAudio[i]);
            audioElement.play();
            turnCount++;
            $("#output").empty();
            playerAttack();
        }

    });

});