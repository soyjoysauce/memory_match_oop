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
    $(".reset").on("click", function() {
      let container = $(".card_img_container");
      container.bind(
        memory_match.__proto__.handleResetClick(container.find("neckob"))
      );
    });
  }
}
class memoryMatch {
  constructor() {
    this.game_stats = {
      total_possible_matches: 9,
      attempt: 0,
      accuracy: 0,
      games_played: 0,
      match_counter: 0,
      mis_match_counter: 0
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
    this.cards_can_be_clicked = true;
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
          class: "cardStack"
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
      cardStack.info.append(item.info, card_back.info).clone();
      // counter++;
    });
  }

  card_clicked(clickedCard, front, back) {
    let clicked_card = clickedCard;
    let clicked_card_back = clickedCard.childNodes[1];
    let clicked_card_front = clickedCard.childNodes[0];
    let back_class = (clicked_card_back.className).toString() ;
    let catString = "nekob";
    let front_card = front;
    let back_card = back;
    // if the card is same as the last one return
    if (memory_match.game_moves.first_card_back === clicked_card_back) {
      console.log("they be the same");
      return;
    }
    //if you can flip cards and its not one that has already been flipped
    if (memory_match.cards_can_be_clicked === true && back_class === catString) {
      $(clicked_card_back).addClass("flipped");
      console.log("flipped");
      //if first and second card is null assign first card to event
      if (
        memory_match.game_moves.first_card_front === null &&
        memory_match.game_moves.second_card_front === null
      ) {
        memory_match.game_moves.first_card_front = front_card;
        memory_match.game_moves.first_card_back = clicked_card_back;
        console.log("first_card", memory_match.game_moves.first_card_front);
      }
      //if first card is not empty and second card is assign second card
      else if (
        memory_match.game_moves.first_card_front !== null &&
        memory_match.game_moves.second_card_front === null
      ) {
        memory_match.game_moves.second_card_front = front_card;
        memory_match.game_moves.second_card_back = clicked_card_back;
        console.log("second_card", memory_match.game_moves.second_card_front);
        //card 1 and card 2 MATCHES
        if (
          memory_match.game_moves.first_card_front ===
          memory_match.game_moves.second_card_front
        ) {
          //increment attempt
          memory_match.game_stats.attempt = memory_match.game_stats.attempt + 1;
          console.log(
            "matched and increment attempt: ",
            memory_match.game_stats.attempt
          );
          //increment match counter
          memory_match.game_stats.match_counter =
            memory_match.game_stats.match_counter + 1;
          console.log(
            "matched and increment match_counter: ",
            memory_match.game_stats.match_counter
          );
          memory_match.display_stats();

          // if matchCounter is same as GameMax you win
          memory_match.cards_can_be_clicked = true;
          memory_match.game_stats.match_counter ===
          memory_match.game_stats.total_possible_matches
            ? console.log("you won!")
            : console.log("keep going");

          // empty the memory of front
          memory_match.game_moves.first_card_front = null;
          memory_match.game_moves.second_card_front = null;
          memory_match.game_moves.first_card_back = null;
          memory_match.game_moves.second_card_back = null;
        }
        //card 1 and card 2 DOES NOT MATCH flip back
        else {
          memory_match.cards_can_be_clicked = false;
          //increment attempt
          memory_match.game_stats.attempt = memory_match.game_stats.attempt + 1;
          console.log(
            "matched and increment attempt: ",
            memory_match.game_stats.attempt
          );
          // memory_match.flipPause();
          setTimeout(function() {
            $(memory_match.game_moves.first_card_back).removeClass("flipped");
            $(memory_match.game_moves.second_card_back).removeClass("flipped");
            memory_match.cards_can_be_clicked = true;
            // empty the memory of front
            memory_match.game_moves.first_card_front = null;
            memory_match.game_moves.second_card_front = null;
            memory_match.game_moves.first_card_back = null;
            memory_match.game_moves.second_card_back = null;
          }, 3000);
          // increment mis-match counter
          memory_match.game_stats.mis_match_counter =
            memory_match.game_stats.mis_match_counter + 1;
          memory_match.display_stats();
        }
      }
    }
  }

  display_stats() {
    let gameAccuracy = memory_match.game_stats.accuracy;
    gameAccuracy =
      Math.floor(
        (memory_match.game_stats.match_counter -
          memory_match.game_stats.mis_match_counter) /
          memory_match.game_stats.total_possible_matches *
          100
      ) + "%";

    $("#games_played").text(memory_match.game_stats.games_played);
    $("#attempt").text(memory_match.game_stats.attempt);
    $("#accuracy").text(gameAccuracy);

    console.log("gameAccuracy", gameAccuracy);
    console.log("displaying gameAttempt :", memory_match.game_stats.attempt);
    console.log("displaying gameAccuracy :", memory_match.game_stats.accuracy);
    console.log(
      "displaying gamesPlayed :",
      memory_match.game_stats.games_played
    );
    console.log(
      "displaying matchCounter :",
      memory_match.game_stats.match_counter
    );
  }

  handleResetClick() {
    console.log("reset clicked");
    let cardContainer = $(".card_img_container").find(".cardStack");
    let cardStack = $(cardContainer).find("#neckob");
    $(cardContainer).each(function(index) {
      let item = cardStack.prevObject[index].childNodes[1];
      $(item).removeClass("flipped");
    });
    memory_match.display_stats(memory_match.reset_stats());
    //make a fucntion that will randomize the array again
    // memory_match.stackShuffle();
  }

  reset_stats() {
    memory_match.game_stats.attempt = 0;
    memory_match.game_stats.accuracy = 0;
    memory_match.game_stats.match_counter = 0;
    memory_match.game_stats.games_played = 0;
    console.log("gameAttempt reset : ", memory_match.game_stats.attempt);
    console.log("gameAccuracy reset : ", memory_match.game_stats.accuracy);
    console.log("gamesPlayed reset : ", memory_match.game_stats.games_played);
    console.log("matchCounter reset :", memory_match.game_stats.match_counter);
  }
}

var memory_match = null;
var event_controller = null;

