//Object Constructor
class characters{
    constructor(className, name, health, baseAtkPower, imgCard, imgSprite, imgSprite2, summon, atkAudio, lose, win){
        this.class = className;
        this.name = name;
        this.health = health;
        this.atkPower = baseAtkPower;
        //Images
        this.imageCard = imgCard;
        this.imageSprite = imgSprite;
        this.imageSprite2 = imgSprite2
        //Audio links
        this.summonAudio = summon;
        this.attackAudio = atkAudio;
        this.loseAudio = lose;
        this.winAudio = win;
    }
};

//Object Characters
var Saber = new characters(
    "SABER", 
    "SABER (Artoria Pendragon)", 
    1200, 
    5, 
    "Artoria2.png", 
    "Arthur_Sprite.png", 
    "Arthur_Sprite2.png",             
    "Artoria/Artoria_start.mp3", 
    ["Artoria/Artoria_attack1.mp3","Artoria/Artoria_attack2.mp3","Artoria/Artoria_attack3.mp3"],
    "Artoria/Artoria_lose.mp3", "Artoria/Artoria_win.mp3"
);

var Archer = new characters(
    "ARCHER",
    "ARCHER (EMIYA)",
    1000,
    3,
    "Emiya2.png",
    "Emiya_Sprite.png",
    "Emiya_Sprite2.png",
    "Emiya/Emiya_start.mp3",
    ["Emiya/Emiya_attack1.mp3","Emiya/Emiya_attack2.mp3","Emiya/Emiya_attack3.mp3"],
    "Emiya/Emiya_lose.mp3",
    "Emiya/Emiya_win.mp3"
);

var Lancer = new characters(
    "LANCER",
    "LANCER (Scathach)",
    1500,
    4,
    "Scathach.png",
    "Scathach_Sprite.png",
    "Scathach_Sprite2.png",
    "Scathach/Scathach_start.mp3",
    ["Scathach/Scathach_attack1.mp3","Scathach/Scathach_attack2.mp3"],
    "Scathach/Scathach_lose.mp3",
    "Scathach/Scathach_win.mp3",
);

var Sheilder = new characters(
    "SHIELDER",
    "SHIELDER (Mashu Kyrielite)",
    1800,
    2,
    "Shielder2.png",
    "Mashu_Sprite.png",
    "Mashu_Sprite2.png",
    "Mashu/Mashu_start.mp3",
    ["Mashu/Mashu_attack1.mp3","Mashu/Mashu_attack2.mp3","Mashu/Mashu_attack3.mp3"],
    "Mashu/Mashu_lose.mp3",
    "Mashu/Mashu_win.mp3",
);
