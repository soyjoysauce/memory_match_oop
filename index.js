// written by soyjoysauce on Dec 3 2017
$(document).ready(function() {
  memory_match = new memoryMatch(this);
  event_controller = new eventController(this);
  console.log("memory_match", memory_match);
});

class eventController {
  constructor() {
    this.memory_match = new memoryMatch(this);
    this.clickHandlers();
    memory_match.createCard();
    memory_match.display_stats();
  }
  clickHandlers() {
    $(".card_img_container").on("click", ".cardStack", function() {
      $(this).bind(
        memory_match.__proto__.card_clicked(
          this,
          $(this)
            .find("#front")
            .attr("card"),
          $(this)
            .find("#nekob")
            .attr("card")
        )
      );
    });
  }
}
class memoryMatch {
  constructor() {
    this.game_stats = {
      match_counter: 0,
      mis_match_counter: 0,
      total_possible_matches: 9,
      attempt: 0,
      accuracy: 0,
      games_played: 0
    };
    this.game_moves = {
      first_card_front: null,
      second_card_front: null,
      first_card_back: null,
      second_card_back: null
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
          id: "nekob",
          card: backImg["0"],
          class: backImg["0"]
        })
      };
      // console.log("card_back", card_back);
      $(".card_img_container").prepend(cardStack.info);
      cardStack.info.append(item.info.clone(), card_back.info.clone());
      // counter++;
    });
  }

  card_clicked(clickedCard, front, back) {
    let clicked_card = clickedCard;
    let clicked_card_back = clickedCard.childNodes[1];
    let front_card = front;
    let back_card = back;
    console.log("front_card", front_card);
    console.log("back_card", back_card);

    // let cardClicked = $(event.currentTarget);
    let cards_can_be_clicked = true;
    let first_card_front = null;
    let second_card_front = null;
    let matchCounter = memory_match.game_stats.match_counter;
    let misMatchCounter = memory_match.game_stats.mis_match_counter;
    if (cards_can_be_clicked === true) {
      //flips the card over
      $(clicked_card_back).addClass("flipped");
      console.log("flipped");
      if (memory_match.game_moves.first_card_front === null) {
        //assign first card attribute
        memory_match.game_moves.first_card_front = front_card;
        memory_match.game_moves.first_card_back = clicked_card_back;
        console.log("first_card", memory_match.game_moves.first_card_front);
      } else if (memory_match.game_moves.first_card_front !== null) {
        //assign second card attribute
        memory_match.game_moves.second_card_front = front_card;
        memory_match.game_moves.second_card_back = clicked_card_back;
        console.log("second_card", memory_match.game_moves.second_card_front);
        cards_can_be_clicked = false;
        if (
          memory_match.game_moves.second_card_front ===
          memory_match.game_moves.first_card_front
        ) {
          //card 1 and card 2 MATCHES
          cards_can_be_clicked = true;
          // empty the memory of front
          memory_match.game_moves.first_card_front = null;
          memory_match.game_moves.second_card_front = null;
          //increment match counter
          matchCounter = matchCounter + 1;
          memory_match.display_stats();
          //assign incremented value to the state
          memory_match.game_stats.match_counter = matchCounter;
          console.log("a match was made - matchCounter:", matchCounter);
          //gameMaxMatch = variable ref pointer for state
          let gameMaxMatch = memory_match.game_stats.total_possible_matches;
          memory_match.game_stats.total_possible_matches = gameMaxMatch;
          console.log("gameMaxMatch:", gameMaxMatch);
          // if matchCounter is same as GameMax you win
          matchCounter === gameMaxMatch
            ? console.log("you won!")
            : console.log("keep going");
        } else {
          //card 1 and card 2 DOES NOT MATCH flip back
          memory_match.flipPause();
          // increment mis-match counter
          misMatchCounter = misMatchCounter + 1;
          memory_match.display_stats();

        }
      }
    }
  }

  flipPause() {
    memory_match.game_moves.first_card_front = null;
    memory_match.game_moves.second_card_front = null;
    memory_match.game_moves.first_card_back = null;
    memory_match.game_moves.second_card_back = null;
    console.log("there was no match return state");

    console.log(
      memory_match.game_moves.first_card_front,
      memory_match.game_moves.second_card_front
    );
    setTimeout(
      $(memory_match.game_moves.first_card_back).removeClass("flipped"),
      10000
    );
    setTimeout(
      $(memory_match.game_moves.second_card_back).removeClass("flipped"),
      10000
    );
  }

  display_stats() {
    // console.log("match", match);
    // console.log("miss", miss);

    let gameAttempt = memory_match.game_stats.attempt;
    let gameAccuracy = memory_match.game_stats.accuracy;
    let gamesPlayed = memory_match.game_stats.games_played;
    let matchCounter = memory_match.game_stats.match_counter + match;
    let misMatchCounter = memory_match.game_stats.mis_match_counter + miss;
    console.log("gameAttempt", memory_match.game_stats.attempt);
    console.log("gameAccuracy", memory_match.game_stats.accuracy);
    console.log("gamesPlayed", memory_match.game_stats.games_played);
    console.log("matchCounter", memory_match.game_stats.match_counter);

    $("#games_played").text(gamesPlayed);
    $("#attempt").text(gameAttempt);
    gameAccuracy =
      Math.floor((matchCounter - misMatchCounter) / gameAttempt * 100) + "%";
    console.log("gameAccuracy", gameAccuracy);
    $("#accuracy").text(gameAccuracy);
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

var memory_match = null;
var event_controller = null;

//this one accesses the image inside the cardStack div.
// let card_user_front = $(cardClicked)
//   .find("#front")
//   .attr("card");
// console.log("card_user_front:", card_user_front);

//this one accesses the back image inside the cardStack div.
// let card_user_back = $(cardClicked)
//   .find("#nekob")
//   .attr("card");
// console.log("card_user_back:", card_user_back);

//this one is access to the back of the card -> 'nekob'
// const user_input = event.target;
// console.log("user_input:", user_input);

//instead of async setTimeout establish promise object that will represent
//eventual asynch operations. resulting in a value.
// let gameMoves = this.game_moves;
// $(gameMoves.first_card_back).removeClass("flipped");
// $(gameMoves.second_card_back).removeClass("flipped");
// gameMoves.first_card_front = null;
// gameMoves.second_card_front = null;

// console.log('clickedCard',clickedCard.childNodes[1]);
// console.log("front", front);
// console.log("back", back);
