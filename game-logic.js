// utility functions

class Game {
  constructor(roomId) {
    this.id = roomId;
    this.playersActive = [null, null, null, null]; // keeps track of player placement
    this.players = {}; // keeps track of player data
    this.deck = new Deck();
    this.hasStarted = false;
    this.board = []; // the cards that have been uncovered so far
    this.turn = 0; // indicates which player has controll of the board
    this.round = 1; // Maxes out at 5 before deck is replenished and round counter is reset
  }
  // add player
  addPlayer(userId, name) {
    if (this.hasStarted) {
      return "Sorry, game has already started.";
    } else {
      let playerPosition = 0;
      if (!this.playersActive[0]) {
        this.playersActive[0] = userId;
        playerPosition = 1;
      } else if (!this.playersActive[1]) {
        this.playersActive[1] = userId;
        playerPosition = 2;
      } else if (!this.playersActive[2]) {
        this.playersActive[2] = userId;
        playerPosition = 3;
      } else if (!this.playersActive[3]) {
        this.playersActive[3] = userId;
        playerPosition = 4;
      } else {
        return "Sorry, this game is full.";
      }
      if (!!playerPosition)
        this.players[userId] = new Player(userId, playerPosition);
    }
  }
  // remove player
  removePlayer(userId) {
    delete this.players[userId];
    if (this.playerActive[0] && this.playerActive[0].uid === userId) {
      this.playerActive[0] = null;
    } else if (this.playerActive[1] && this.playerActive[1].uid === userId) {
      this.playerActive[1] = null;
    } else if (this.playerActive[2] && this.playerActive[2].uid === userId) {
      this.playerActive[2] = null;
    } else if (this.playerActive[3] && this.playerActive[3].uid === userId) {
      this.playerActive[3] = null;
    }
  }
  // start game
  startGame() {
    this.hasStarted = true;
  }
  // advance turn
  advanceTurn() {
    this.turn = this.turn === 3 ? 0 : this.turn++;
    if (!this.players[this.turn] || this.players[this.turn].health === 0) {
      this.advanceTurn();
    }
  }
  // draw card
  drawCard() {
    const random = Math.floor(Math.random() * this.deck.length);
    const drawnCard = this.deck.splice(random, 1);
    this.board.push(drawnCard);
    return drawnCard;
  }
  // evaluate guess

  // check for winner
  // end round
  // new round
  // end game
}

class Player {
  constructor(userId, position) {
    this.uid = userId;
    this.name = `Player ${position}`;
    this.health = 4;
    this.position = position;
  }
  // reduce health
}

class Card {
  constructor(rank, suit, value) {
    this.rank = rank;
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = this.createDeck();
  }
  // createDeck
  createDeck() {
    const deck = [];
    const cardRanks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    const cardSuits = ["Spade", "Diamond", "Club", "Heart"];
    for (let i = 0; i < cardSuits.length; i++) {
      for (let j = 0; j < cardRanks.length; j++) {
        deck.push(new Card(cardRanks[j], cardSuits[i], j));
      }
    }
    return deck;
  }
  // draw random card
}

module.exports = {
  Game,
};
