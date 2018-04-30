/*
    Steven Tran
    Assignment 4, 2018
    UofT SCS Coding Bootcamp
*/

//Object Characters
var Saber = {
    class: "SABER",
    name: "SABER (Artoria Pendragon)",
    health: 1200,
    attackPower: 5, //Base Attack Value

    //Image links
    imageCard: "Artoria2.png",
    imageSprite: "Arthur_Sprite.png",
    imageSprite2: "Arthur_Sprite2.png",
    //Audio links
    summonAudio: "Artoria/Artoria_start.mp3",
    attackAudio: ["Artoria/Artoria_attack1.mp3","Artoria/Artoria_attack2.mp3","Artoria/Artoria_attack3.mp3"],
    loseAudio: "Artoria/Artoria_lose.mp3",
    winAudio: "Artoria/Artoria_win.mp3",
};

var Archer = {
    class: "ARCHER",
    name: "ARCHER (EMIYA)",
    health: 1000,
    attackPower: 3, //Base Attack Value

    //Image links
    imageCard: "Emiya2.png",
    imageSprite: "Emiya_Sprite.png",
    imageSprite2: "Emiya_Sprite2.png",
    //Audio links
    summonAudio: "Emiya/Emiya_start.mp3",
    attackAudio: ["Emiya/Emiya_attack1.mp3","Emiya/Emiya_attack2.mp3","Emiya/Emiya_attack3.mp3"],
    loseAudio: "Emiya/Emiya_lose.mp3",
    winAudio: "Emiya/Emiya_win.mp3",
};

var Lancer = {
    class: "LANCER",
    name: "LANCER (Scathach)",
    health: 1500,
    attackPower: 4, //Base Attack Value

    //Image links
    imageCard: "Scathach.png",
    imageSprite: "Scathach_Sprite.png",
    imageSprite2: "Scathach_Sprite2.png",
    //Audio links
    summonAudio: "Scathach/Scathach_start.mp3",
    attackAudio: ["Scathach/Scathach_attack1.mp3","Scathach/Scathach_attack2.mp3"],
    loseAudio: "Scathach/Scathach_lose.mp3",
    winAudio: "Scathach/Scathach_win.mp3",
};

var Sheilder = {
    class: "SHIELDER",
    name: "SHIELDER (Mashu Kyrielite)",
    health: 1800,
    attackPower: 2, //Base Attack Value

    //Image links
    imageCard: "Shielder2.png",
    imageSprite: "Mashu_Sprite.png",
    imageSprite2: "Mashu_Sprite2.png",
    //Audio links
    summonAudio: "Mashu/Mashu_start.mp3",
    attackAudio: ["Mashu/Mashu_attack1.mp3","Mashu/Mashu_attack2.mp3","Mashu/Mashu_attack3.mp3"],
    loseAudio: "Mashu/Mashu_lose.mp3",
    winAudio: "Mashu/Mashu_win.mp3",
};

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