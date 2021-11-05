// button1.addEventListener('click', () => {
//     if (button1.className === "click1") {
//         if (inputBox1.value) {
//             para.innerHTML = `Well done ${inputBox1.value}. Now please choose your date of birth.`;
//             player["playerName"] = inputBox1.value;
//             console.log(player["playerName"]);
//             inputBox1.value = "";

//             inputBox1.style.display = "none";
//             inputBox2.style.display ="block";

//             button1.className = "click2";
//         }
//     } else if (button1.className === "click2") {
//         if (inputBox2.value) {
//             let birthDay = new Date(inputBox2.value);
//             console.log(birthDay);
//             let day = birthDay.getDate();
//             console.log(day);
//             let month = birthDay.getMonth();
//             console.log(month);
        
//             player["attribute"] = playerAttribute(day, month);
//             console.log(player["attribute"]);
    
//             para.innerHTML = `You are ${player["playerName"]} the adventuring merchant of ${player["attribute"]}!
//             Unfortunately your peaceful home of Prickleville, once famed for it's pristine holly forests and stinging nettle groves has been plagued by powerful gnome bandits lead by the fearsome gnome known as Springles and they have stolen your wares!<br>
//             Set forth on your epic quest to reclaim your valuable stocks of toilet paper, the villagers need you!`;
    
//             inputBox2.style.display = "none";

//             button1.className = "click3";
//             button1.innerHTML = "Head forth"
//         }
//     } else {
//         para.innerHTML = "You leave your house and make way on your quest. As you reach the village gates you remember that you had a secret base with some useful stuff in it. You don\'t remember exactly what but you\'re pretty sure it was good...<br> You also remember that you had some other useful bits and pieces under a floorboard in your warehouse, but that nefarious Springles might have already found it.<br> Where do you go?";
//         button1.style.display = "none";
//         buttonA.style.display = "block";
//         buttonB.style.display = "block";
//     }
// })