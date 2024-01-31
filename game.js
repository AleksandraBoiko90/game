// console.log(heroesArray);
const heroElements = document.querySelectorAll(".hero");

document.addEventListener("DOMContentLoaded", function () {
  // Finner alle elementer med class "hero" og setter id
  const heroElements = document.querySelectorAll(".hero");

  heroElements.forEach((heroElement, index) => {
    if (index < heroesArray.length) {
      const hero = heroesArray[index];
      heroElement.id = `hero-${hero.id}`;
      // console.log(`Hero ${hero.name} clicked`);

      // Добавляем обработчик события клика напрямую к элементу "hero"
      heroElement.addEventListener("click", function () {
        attackDragon(hero.id);
      });
    }
  });
});

//extra function oppgave 4
document.addEventListener("keydown", function (event) {
  if (event.key === "d" || event.key === "D") {
    // Damage hver heltens on 10%
    heroesArray.forEach((hero) => {
      if (hero.alive) {
        hero.damage = Math.round(hero.damage * 1.1); // oppdateres 10%
      }
    });

    console.log("Damage Boost active! Heltene gjør 10% mer skade.");
  }
});

//function om oppdatering helse

const updateHeroHealth = () => {
  heroesArray.forEach((hero) => {
    let healthText = hero.currentHP + "/" + hero.maxHP + " HP"; // Tekst

    //Hvis heroes navn er "slik", hans elementID blir, den som den trenger
    let elementID;
    switch (hero.name) {
      case "Henriette Healer":
        elementID = "healer-health-txt";
        break;
      case "Ariana archer":
        elementID = "archer-health-txt";
        break;
      case "Wyona Warrior":
        elementID = "warrior-health-txt";
        break;
    }
    if (elementID) {
      document.querySelector("#" + elementID).innerText = healthText;
    }
  });
};

updateHeroHealth();

//Dragon lifebar oppdateres
function updateDragonHealth() {
  const DragonHealth = document.querySelector(".dragon-health-txt");
  DragonHealth.innerText =
    dragonObject.currentHP + "/" + dragonObject.maxHP + " HP";
}
updateDragonHealth(); //same for dragon

//Obligatorisk oppgave 1
function attackDragon(heroId) {
  const hero = heroesArray.find((h) => h.id === heroId);
  if (hero.alive && dragonObject.alive) {
    dragonObject.currentHP -= hero.damage;

    // oppdater Dragon helse
    updateDragonHealth();

    // Sjekker Dragon sin helse etter attac
    //Obligatorisk oppgave 5

    if (dragonObject.currentHP <= 0) {
      dragonObject.currentHP = 0;
      dragonObject.alive = false;
      // kaster Dragon fra browser
      const dragonElement = document.querySelector(".dragon-container");
      if (dragonElement) {
        dragonElement.remove();
      }
      // Spillet er vunnet
      alert("Spillet er vunnet!");
    } else {
      // Attaca
      alert(
        `Heltens ${hero.name} gjør ${hero.damage} damage Dragon ${dragonObject.name}!`
      );
      updateHeroState(hero.id);
      dragonAttack();
    }
  }
}

//ОObligatorisk oppgave 2

function dragonAttack() {
  // Velger kun alive
  let aliveHeroes = heroesArray.filter((hero) => hero.alive);
  if (aliveHeroes.length > 0) {
    // Velger alive random
    let randomHero =
      aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];

    // reduserer helse heltens, på grunn av Dragon
    randomHero.currentHP -= dragonObject.damage;

    //Obligatorisk 3

    if (randomHero.currentHP <= 0) {
      randomHero.currentHP = 0;
      randomHero.alive = false;

      // Heltens død

      updateHeroState(randomHero.id);
    }

    // oppdatering av heltens helse i html
    updateHeroHealth();

    // attaca
    alert(`${dragonObject.name} attaca ${randomHero.name}!`);

    // Пsjekker etter dragons attac
    checkGameOver();
  } else {
    // hvis alle døde, sjekker tapt
    checkGameOver();
  }
}

function updateHeroState(heroId) {
  const hero = heroesArray.find((h) => h.id === heroId);

  if (hero.currentHP <= 0) {
    const heroElement = document.getElementById(`hero-${heroId}`);
    if (heroElement) {
      heroElement.remove();
    }
  }
}

function checkGameOver() {
  // sjekker alive heltens
  const aliveHeroes = heroesArray.some((hero) => hero.alive);

  //obligatorisk 4

  if (!aliveHeroes && dragonObject.currentHP > 0) {
    // Уfjerne alle heltens
    heroesArray.forEach((hero) => {
      const heroElement = document.getElementById(`hero-${hero.id}`);
      if (heroElement) {
        heroElement.remove();
      }
    });
    // Spillet er tapt!
    alert(`Spillet er tapt! ${dragonObject.name} vant!`);
  }
}
