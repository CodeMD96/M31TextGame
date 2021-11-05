let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let inputBox1 = document.getElementById("inputText1");
let inputBox2 = document.getElementById("inputDate");
let para = document.getElementById("mainText");
let stats = document.getElementById("statsText");

let player = {
    playerName : "",
    attribute : "",
    health : 100,
    gold : 50,
    weapon : {weaponName : "Fist", weaponPower: 0},
    armour : {armourName : "Coat", armourPower: 0},
    inventory : {},
    keyItems: [],
};

let enemy1 = {
    enemyName : "enemy1",
    level : 1,
    health : 20,
    attack : 0,
    defence : 0,
    reward : 5,
}


function playerAttribute(day, month) {
    const zodiac =['Earth', 'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth'];
    const last_day =[19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    // ternary operator, checks if the day falls after the last day and returns month+1 if truthy and month if falsy. 
    const attribute = (day > last_day[month]) ? zodiac[month + 1] : zodiac[month];
    return attribute;
}


function statsUpdate() {
    let currentInventory = ""
    for (const [item, amount] of Object.entries(player.inventory)) {
        currentInventory += `${item}: ${amount}<br>`;
      }
    stats.innerHTML = `Name: ${player.playerName}<br>
    Attribute: ${player.attribute}<br>
    Health: ${player.health}<br>
    Gold: ${player.gold}<br>
    Weapon: ${player.weapon.weaponName} | Power: ${player.weapon.weaponPower}<br>
    Armour: ${player.armour.armourName} | Power: ${player.armour.armourPower}<br>
    Inventory<br>
    ${String(currentInventory)}
    Key Items: ${player.keyItems}`;
    return
}

function combatStart(enemy) {
    para.innerHTML += `<br>A wild ${enemy.enemyName} appeared!`
    if (player.health > 0) {
        para.innerHTML += "Your move.";

        button1.innerHTML = "Attack";
        button1.setAttribute("onClick", `playerAttack(\'${enemy}\')`);

        button2.innerHTML = "Item";
        button2.setAttribute("onClick", "useItem()");
        button2.style.display = "block";
    }
}

function playerAttack(enemy) {
    playerAttack = Math.floor(Math.random()*5+1) + player.weapon.weaponPower;
    enemyDefence = Math.floor(Math.random()*enemy.level) + enemy.defence;

    playerDamage = playerAttack - enemyDefence;
    enemy.health -= playerDamage; 

    para.innerHTML += `<br>You attack with your ${player.weapon.weaponName} for ${playerAttack} damage!`;
    para.innerHTML += `<br>${enemy.enemyName} blocks ${enemyDefence} damage!`;
}


function treasureChest1() {
    let treasures = ["gold", "knife", "leatherVest"];
    let num = Math.floor(Math.random()*3+1);
    let prizes = Math.floor(Math.random()*3);
    for (let i =0; i < num; i++) {
        if (treasures[i] === "gold") {
            let goldAmount = Math.floor(Math.random()*50 +25);
            player.gold += goldAmount; 
            para.innerHTML += `<br> The chest had ${goldAmount} gold!`;
        } else if (treasures[i] === "knife") {
            player.weapon.weaponName = "knife";
            player.weapon.weaponPower = 5;
            para.innerHTML += "<br> The chest had a knife!";
        } else if (treasures[i] === "leatherVest") {
            player.armour.armourName = "leatherVest";
            player.armour.armourPower = 5;
            para.innerHTML += "<br> The chest had leather armour!";
        }
    }
    statsUpdate();
}


function townEvent(name) {
    if (name === "Bort") {
        para.innerHTML = "Your warehouse is a short walk through the village away. You briskly walk there greeting your fellow Pricklevillians along the way. Bort from Bort's bread gives you a free bread roll!";
        if (player.inventory.bread) {
            player.inventory.bread += 1;
        } else {
            player.inventory.bread = 1;
        }
    } else if (name === "Wizzo") {
        para.innerHTML = "Your warehouse is a short walk through the village away. You briskly walk there greeting your fellow Pricklevillians along the way. Wizzo from Wizzo's wonderful liquids gives you a free tonic!";
        if (player.inventory.tonic) {
            player.inventory.tonic += 1;
        } else {
            player.inventory.tonic = 1;
        }
    }
    console.log(player.inventory);
    statsUpdate();
}


function click1() {
    if (inputBox1.value) {
        para.innerHTML = `Well done ${inputBox1.value}. Now please choose your date of birth.`;
        player["playerName"] = inputBox1.value;
        console.log(player["playerName"]);
        inputBox1.value = "";

        inputBox1.style.display = "none";
        inputBox2.style.display ="block";

        button1.setAttribute("onClick", "click2()");
    }
}   


function click2() {
    if (inputBox2.value) {
        let birthDay = new Date(inputBox2.value);
        console.log(birthDay);
        let day = birthDay.getDate();
        console.log(day);
        let month = birthDay.getMonth();
        console.log(month);
    
        player["attribute"] = playerAttribute(day, month);
        console.log(player["attribute"]);

        para.innerHTML = `You are ${player["playerName"]} the adventuring merchant of ${player["attribute"]}!
        Unfortunately your peaceful home of Prickleville, once famed for it's pristine holly forests and stinging nettle groves has been plagued by powerful gnome bandits lead by the fearsome gnome known as Springles and they have stolen your wares!<br>
        Set forth on your epic quest to reclaim your valuable stocks of toilet paper, the villagers need you!`;

        inputBox2.style.display = "none";

        button1.innerHTML = "Head forth";
        button1.setAttribute("onClick", "click3()");
    }
}


function click3() {
    statsUpdate();
    para.innerHTML = "You leave your house and make way on your quest. As you reach the village gates you remember that you had a secret base with some useful stuff in it. You don\'t remember exactly what but you\'re pretty sure it was good...<br> You also remember that you had some other useful bits and pieces under a floorboard in your warehouse, but that nefarious Springles might have already found it.<br> Where do you go?";
        
    button2.style.display = "block";
    button1.innerHTML = "Secret base";
    button2.innerHTML = "Warehouse";

    button1.setAttribute("onClick", "secretBase()");
    button2.setAttribute("onClick", "warehouse()");
}

function secretBase() {
    para.innerHTML = "Your secret base lies deep in the heart of the hollybush forest. This will be a long and arduous journey.";
    combatStart(enemy1);
}


function warehouse() {
    let events = ["Bort", "Wizzo", "Bart"]
    let num = Math.floor(Math.random()*2);
    let eventName= events[num];

    button1.setAttribute("onClick", "warehouseInside()");;
    button1.innerHTML = "Continue";

    button2.style.display = "none";
    townEvent(eventName);
    para.innerHTML += "<br>You graciously accept the kind gift and head on your way to the warehouse. The bare shelves bring a tear to your eye. You lift up the floorboard and reveal your secret treasure chest. Springles didn't find it! Open the chest?";    
}


function warehouseInside() {
    treasureChest1();

    para.innerHTML += "<br>On your way out you notice a single roll of toilet paper left behind by the bandits, it's 3-ply, your finest of wares. You store it in your bag. You're suddenly afflicted by a crushing sense of loss, Springles will pay!"
    player.keyItems.push("toiletPaper");
    statsUpdate();
}
