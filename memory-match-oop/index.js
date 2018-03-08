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
      second_card_clicked: null,
      first_card_element:null,
      second_card_element:null
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
    this.atsume = ".card";
  }

  clickHandlers() {
    $(".card_img_container").on(
      "click",
      ".cardStack",
      this.card_clicked.bind(this)
    );
  }

  card_clicked(event) {
    let cardClicked = $(event.currentTarget);

    let gameMoves = this.game_moves;
    //this one accesses the image inside the cardStack div.
    let card_user_front = $(cardClicked)
      .find("#front")
      .attr("card");
      gameMoves.first_card_element = cardClicked
    console.log("card_user_front", card_user_front);

    let cards_can_be_clicked = true;
    //this one is access to the back of the card -> nekob
    let user_input = event.target;
    console.log("user_input", user_input);

    let user_input_class = event.target.className;
    console.log("user_input_class", user_input_class);

    let user_neckoB = $("div#nekob");
    console.log("user_neckoB", user_neckoB);

    let user_cardStack = $(user_input).attr("nekob");
    console.log("user_cardStack", user_cardStack);
    // let cardClicked = $("div#front");
    console.log("cardClicked", cardClicked);
    // let user_cardClicked = event.target.find(this.cardClicked);
    // console.log('user_cardClicked', user_cardClicked);

    if (cards_can_be_clicked === true && user_input_class === "nekob") {
      $(user_input).addClass("flipped");
      console.log("flipped");
      if (
        gameMoves.first_card_clicked === null &&
        gameMoves.second_card_clicked === null
      ) {
        gameMoves.first_card_clicked = card_user_front;
        console.log("1card_user_front", card_user_front);
        console.log(
          "gameMoves.first_card_clicked",
          gameMoves.first_card_clicked
        );
      } else if (
        gameMoves.first_card_clicked !== null &&
        gameMoves.second_card_clicked === null
      ) {
        gameMoves.second_card_clicked = card_user_front;
        console.log("2card_user_front", card_user_front);
        // gameMoves["second_card_clicked"] = this.user_input;
        console.log(
          "gameMoves.second_card_clicked",
          gameMoves.second_card_clicked
        );

        if (gameMoves.second_card_clicked === gameMoves.first_card_clicked) {
          let matchCounter = this.game_stats["match_counter"];
          matchCounter++;
          this.game_stats["match_counter"] = matchCounter;
          console.log("a match was made - matchCounter:", matchCounter);

          gameMoves.first_card_clicked = null;
          gameMoves.second_card_clicked = null;
          
          $(user_input).removeClass("flipped");
          console.log("remove - flipped");

          let gameMaxMatch = this.game_stats["total_possible_matches"];
          console.log("gameMaxMatch", gameMaxMatch);

          this.game_stats["total_possible_matches"] = gameMaxMatch;
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
  createCard() {
    let backImg = ["nekob"];
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
          class: img
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
          class: img
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
    }

    let randomized_Cards = randomize_list(matched_Cards);
    this.cardArray = randomized_Cards;
    console.log("this.cardArray", this.cardArray);
    console.log("randomized_Cards", randomized_Cards);

    randomized_Cards.forEach(function(item) {
      let cardStack = {
        info: $("<div>", {
          class: "card cardStack"
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
      $(".card_img_container").prepend(cardStack.info);
      cardStack.info.append(item.info.clone(), card_back.info.clone());
      counter++;
    });
  }

  display_stats() {
    let gameAttempt = this.game_stats["attempt"];
    let gameAccuracy = this.game_stats["accuracy"];
    let gamesPlayed = this.game_stats["games_played"];
    let matchCounter = this.game_stats["match_counter"];

    $(".games_played .value").text(gamesPlayed);
    $(".attempts .value").text(gameAttempts);
    var gameAccuracy = Math.floor(matchCounter / gameAttempt * 100) + "%";
    $(".accuracy .value").text(gameAccuracy);
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
