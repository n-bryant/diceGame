"use strict";

// Dice Game
const diceGame = {
  startDate: null,
  die1: null,
  die2: null,
  totalRolls: 0,
  gameRounds: [{Start: null, Rolls:0}],
  wins: 0,
  losses: 0,
  rollDice() {
    // animate dice
    const dieDiv1 = document.querySelector('.die.die-1');
    const dieDiv2 = document.querySelector('.die.die-2');
    dieDiv1.classList.add('shake');
    dieDiv1.addEventListener('animationend', () => {
      dieDiv1.classList.remove('shake');
    });
    dieDiv2.classList.add('shake');
    dieDiv2.addEventListener('animationend', () => {
      dieDiv2.classList.remove('shake');
    });

    // generate random dice numbers for each die2
    this.die1 = Math.floor((Math.random() * 6) + 1);
    this.die2 = Math.floor((Math.random() * 6) + 1);

    // display the dice numbers on the dice containers
    const die1Result = document.querySelector('.die-1 .die-result');
    const die2Result = document.querySelector('.die-2 .die-result');
    die1Result.classList.add('fade-in');
    die1Result.addEventListener('animationend', () => {
      die1Result.classList.remove('fade-in');
    });
    die2Result.classList.add('fade-in');
    die2Result.addEventListener('animationend', () => {
      die2Result.classList.remove('fade-in');
    });
    die1Result.innerHTML = this.die1;
    die2Result.innerHTML = this.die2;

    // evaluating dice rolls
    const gameResult = document.querySelector('.game-result');
    const gameRecap = document.querySelector('.game-recap');
    const losses = document.querySelector('.losses');
    const wins = document.querySelector('.wins');
    console.log(this.die1 + this.die2);

    // if not a win
    if (this.die1 + this.die2 !== 7 && this.die1 + this.die2 !== 11) {

      // print recaps to page
      gameResult.innerHTML = "Try Again!";
      gameRecap.innerHTML = "(no dice)";

      // increment totalRolls and losses
      this.totalRolls++;
      this.losses++;
      losses.innerHTML = `Losses: ${this.losses}`;

    } else { // if a win
        // print Winner to page
        gameResult.innerHTML = "Winner!";

        // increment totalRolls
        this.totalRolls++;

        // format and print game-recap to page
        const now = new Date();
        const seconds = Math.ceil((now.getTime() - this.startDate.getTime()) / 1000);
        if (this.totalRolls !== 1 && seconds !== 1) {
          gameRecap.innerHTML = `(It took you ${this.totalRolls} tries and ${seconds} seconds)`;
        } else if (this.totalRolls === 1 && seconds === 1) {
          gameRecap.innerHTML = `(It took you ${this.totalRolls} try and ${seconds} second)`;
        } else if (this.totalRolls === 1 && seconds !== 1) {
          gameRecap.innerHTML = `(It took you ${this.totalRolls} try and ${seconds} seconds)`;
        } else if (this.totalRolls !== 1 && seconds === 1) {
          gameRecap.innerHTML = `(It took you ${this.totalRolls} tries and ${seconds} second)`;
        }

        // increment wins
        this.wins++;
        wins.innerHTML = `Wins: ${this.wins}`;

        // push game round data to gameRounds
        this.gameRounds.push({start: this.startDate, rolls: this.totalRolls});

        this.startDate = null;
        this.gameReset();
      }
  },
  gameReset() {
    // reset roll total and startDate for next game
    this.totalRolls = 0;

    // set startDate
    this.startDate = new Date();
    // get formatted start Date
    const formattedStart = this.formatStartDate(this.startDate);
    // get formatted start Time
    const formattedTime = this.formatStartTime(this.startDate);
    // write time to page
    const startTime = document.querySelector('.start-time');
    startTime.innerHTML = `Game Started ${formattedStart} at ${formattedTime}`;
  },
  formatStartDate(date) {
    let year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());

    if (month.length < 2) month = '0' + month; // pads lower months with 0
    if (day.length < 2) day = '0' + day; // pads lower day with 0

    return [year, month, day].join('-');
  },
  formatStartTime(time) {
    let hours = String(time.getHours() + 1);
    let minutes = String(time.getMinutes());

    if (hours.length < 2) hours = '0' + hours; // pads lower hours with 0
    if (minutes.length < 2) minutes = '0' + minutes; // pads lower minutes with 0
    return [hours, minutes].join(':');
  },
  init() {
    // establish connections to DOM
    const rollBtn = document.querySelector('.roll-dice');
    const wins = document.querySelector('.wins');
    const losses = document.querySelector('.losses');
    const startTime = document.querySelector('.start-time');

    // set initial wins/losses and display on page
    wins.innerHTML = `Wins: ${this.wins}`;
    losses.innerHTML = `Losses: ${this.losses}`;

    // set startDate
    this.startDate = new Date();
    // get formatted start Date
    const formattedStart = this.formatStartDate(this.startDate);
    // get formatted start Time
    const formattedTime = this.formatStartTime(this.startDate);
    // write time to page
    startTime.innerHTML = `Game Started ${formattedStart} at ${formattedTime}`;

    // establish event handler
    rollBtn.addEventListener('click', () => {
      this.rollDice();
    });
  }
};
diceGame.init();

function scoresToggle() {
  scoresCont.classList.toggle('is-active');
  scoreList.innerHTML = "";
}

const scoresBtn = document.querySelector('.scores');
const scoresCont = document.querySelector('.scores-container');
const scoreList = document.querySelector('.score-list');
scoresBtn.addEventListener('click', () => {
  scoresToggle();

  // iterate over the gameRounds list of objects
  for (let index = 1; index < diceGame.gameRounds.length; index++) {
    let content = '';

    for (let key in diceGame.gameRounds[index]) {
      content = `<li><span>Round ${index}: </span> ${diceGame.gameRounds[index][key]}</li>`;
    }
    scoreList.innerHTML += content;
  }
});
