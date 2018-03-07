// written by soyjoysauce on Dec 3 2017
$(document).ready(function() {
  $(this.memory_Match).bind(this);
  console.log("memory made");
  let memory_Match = new memoryMatch();
});

class memoryMatch {
  constructor() {
    this.game_stats = {
      match_counter: 0,
      total_possible_matches: 9,
      attempt: 0,
      accuracy: 0,
      games_played: 0
    };
    this.game_moves = {
      first_card_clicked: null,
      second_card_clicked: null
    };
    this.cardArray = [];
    this.imageArray = [
      "sapphire_Sprite",
      "jeeves_Sprite",
      "whiteshadow_Sprite",
      "sassyFran_Sprite",
      "guy_Furry_Sprite",
      "kathmandu_Sprite",
      "senor_don_gato_Sprite",
      "bengal_Jack_Sprite",
      "sprite_Joe_DiMeowgio"
    ];
    this.createCard();
    this.clickHandlers();
  }

  clickHandlers() {
    $(".card_img_container").on("click", "div", this.card_clicked.bind(this));
  }

  createCard() {
    let backImg = ["neckob"];
    let image_Array = this.imageArray;
    let counter = 0;
    let matched_Cards = [];

    image_Array.forEach(function(img) {
      let randomNum = Math.floor(Math.random() * image_Array.length);
      
      let item = {
        id: "front",
        card: img,
        class: img,
        info: $("<div>", {
          id: "front",
          card: img,
          class: img,
        })
      };
      matched_Cards.push(item);
      let item2 = {
        id: "front",
        card: img,
        class: img,
        info: $("<div>", {
          id: "front",
          card: img,
          class: img,
        })
      };
      matched_Cards.push(item2);
      // console.log("matched_Cards", matched_Cards);
    });
    
    function randomize_list(array) {
      let m = array.length,
        t,
        i;
      //fisher-yates shuffle
      // While there are elements yet to be shuffled in array
      while (m) {
        // Pick a remaining element
        let i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      console.log("array", array);
      return array;
    };

    let randomized_Cards = randomize_list(matched_Cards);
    console.log("randomized_Cards", randomized_Cards);

    randomized_Cards.forEach(function(item) {
      let cardStack = {
        info: $("<div>", {
          id: "cardStack",
          card_num: counter
        })
      };
      let card_back = {
        info: $("<div>", {
          id: counter,
          card: backImg["0"],
          class: backImg["0"]
        })
      };
      // console.log("card_back", card_back);
      $(".card_img_container").prepend(cardStack.info.clone());
      $("#cardStack").append(item.info.clone(),(card_back.info.clone()));
      counter++;
    });
  }

  display_stats() {
    let gameAttempt = this.game_stats["attempt"];
    let gameAccuracy = this.game_stats["accuracy"];
    let gamesPlayed = this.game_stats["games_played"];
    let matchCounter = this.game_stats["match_counter"]

    $(".games_played .value").text(gamesPlayed);
    $(".attempts .value").text(gameAttempts);
    var gameAccuracy = Math.floor(matchCounter / gameAttempt * 100) + "%";
    $(".accuracy .value").text(gameAccuracy);
  }

  card_clicked() {
    let matchCounter = this.game_stats["match_counter"];
    let gameMaxMatch = this.game_stats["total_possible_matches"];
    let gameMoves = this.game_moves;
    let cards_can_be_clicked = true;
    let user_input = event.target.children.className;


    console.log("user_input", user_input);
    if (cards_can_be_clicked === true) {

      if (gameMoves.first_card_clicked === null) {
        console.log("user_input", user_input);
        gameMoves["first_card_clicked"] = user_input;
        console.log("gameMoves.first_card_clicked", gameMoves.first_card_clicked);
      } else {
        gameMoves.second_card_clicked = user_input;
        console.log("user_input", user_input);
        gameMoves["second_card_clicked"] = user_input;
        console.log("gameMoves.second_card_clicked",gameMoves.second_card_clicked);
  
        if (gameMoves.second_card_clicked === gameMoves.first_card_clicked) {
          console.log("matchCounter", matchCounter);
          matchCounter++;
          console.log("matchCounter", matchCounter);
          gameMoves.first_card_clicked = null;
          gameMoves.second_card_clicked = null;
          matchCounter === gameMaxMatch ? "you won!" : "keep going";
        } else {
          console.log("there was no match return state");
          gameMoves.first_card_clicked = null;
          gameMoves.second_card_clicked = null;
          console.log(
            gameMoves.first_card_clicked,
            gameMoves.second_card_clicked
          );
        }
    }


    }
  }

  handleResetClick() {
    console.log("reset clicked");
    $(".card")
      .find(".back")
      .removeClass("flipped");
    games_played++;
    display_stats();
    reset_stats();
    stackShuffle();
  }

  reset_stats() {
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
  }
}
