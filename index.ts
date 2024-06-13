#! /usr/bin/env node

import inquirer from "inquirer";

//-------------------------Games Variable-------------------------------

let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;

//------------------------Player Variables------------------------------

let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;

//---------------------While Loop Condition-----------------------------

let gameRunning = true;

console.log("Welcome to DeadZone!");

Game: while (gameRunning) {
  let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
  let enemyIndex = Math.floor(Math.random() * enemies.length);
  let enemy = enemies[enemyIndex];

  console.log(`# ${enemy} has appeared #\n`);

  while (enemyHealth > 0) {
    console.log(`Your Health: ${heroHealth}`);
    console.log(`${enemy} Health: ${enemyHealth}`);

    let options = await inquirer.prompt({
      name: "ans",
      type: "list",
      message: "What would you like to do?",
      choices: ["1. Attack", "2. Take Health Potion", "3. Run"],
    });

    if (options.ans === "1. Attack") {
      let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
      let damageToHero = Math.floor(
        Math.random() * enemyAttackDamageToHero + 1
      );

      enemyHealth -= damageToEnemy;
      heroHealth -= damageToHero;

      console.log(`You strike the ${enemy} for ${damageToEnemy}.`);
      console.log(`${enemy} strike you for ${damageToHero} damage.`);

      if (heroHealth < 1) {
        console.log(
          "You have taken too much damage. You are too weak to continue."
        );
        break;
      }
    } else if (options.ans === "2. Take Health Potion") {
      if (numHealthPotion > 0) {
        heroHealth += healthPotionHealAmount;
        numHealthPotion--;

        console.log(`You use health potion for ${healthPotionHealAmount}`);
        console.log(`You now have ${heroHealth} health`);
        console.log(`You have ${numHealthPotion} health potions left.`);
      } else {
        console.log(
          "You have no health potions left. Defeat enemy for a chance to get health potion."
        );
      }
    } else if (options.ans === "3. Run") {
      console.log(`You run away from ${enemy}`);
      continue Game;
    }
  }
  if (heroHealth < 1) {
    console.log(`You are out from battle. You are too much weak.`);
    break;
  }

  console.log(`${enemy} was defeated!`);
  console.log(`You have ${heroHealth} health.`);

  let randomNumber = Math.floor(Math.random() * 100 + 1);

  if (randomNumber < healthPotionDropChance) {
    numHealthPotion++;

    console.log("Enemy give you health potion.");
    console.log(`Your health is ${heroHealth}`);
    console.log(`Your health potion is ${numHealthPotion}`);
  }

  let userOption = await inquirer.prompt({
    name: "ans",
    type: "list",
    message: "What would you like to do now?",
    choices: ["1. Continue", "2. Exit"],
  });

  if (userOption.ans === "1. Continue") {
    console.log("You are continue on your advanture.");
  } else {
    console.log("You successfully Exit from DeadZone!!!");
    break;
  }

  console.log("Thank you for playing.\n");
}
