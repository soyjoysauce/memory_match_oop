// written by soyjoysauce on Dec 3 2017
$(document).ready(function() {
  $(this.memory_Match).bind(this);
  console.log("memory made");
  let memory_Match = new memoryMatch();
});

class memoryMatch {
  constructor() {
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
    let image_Array = this.imageArray;
    let counter = 0;
    let matched_Cards = [];

    image_Array.forEach(function(img) {
      let randomNum = Math.floor(Math.random() * image_Array.length);
      let item = {
        id: counter,
        card: img,
        class: img,
        info: $("<div>", {
          id: counter,
          card: img,
          class: img
        })
      };
      matched_Cards.push(item);
      counter++;
      let item2 = {
        id: counter,
        card: img,
        class: img,
        info: $("<div>", {
          id: counter,
          card: img,
          class: img
        })
      };
      matched_Cards.push(item2);
      counter++;
      console.log("matched_Cards", matched_Cards);
    });
    function randomize_list(array) {
      let m = array.length,
        t,
        i;
      //fisher-yates shuffle
      // While there are elements yet to be shuffled
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
    console.log("randomized_Cards", randomized_Cards);
    randomized_Cards.forEach(function(item) {
      $(".card_img_container").append(item.info.clone());
    });
  }

  card_clicked() {
    let user_input = event.target.className;
    let gameMoves = this.game_moves;
    console.log("user_input", user_input);
    let cards_can_be_clicked = true;

    let total_possible_matches = 9;
    let match_counter = 0;

    if (gameMoves.first_card_clicked === null) {
      console.log("user_input", user_input);
      gameMoves["first_card_clicked"] = user_input;
      console.log("gameMoves.first_card_clicked", gameMoves.first_card_clicked);

      if (
        gameMoves.second_card_clicked === null &&
        gameMoves.first_card_clicked === null
      ) {
        console.log("user_input", user_input);
        gameMoves["second_card_clicked"] = user_input;
        console.log(
          "gameMoves.second_card_clicked",
          gameMoves.second_card_clicked
        );

        if (gameMoves.second_card_clicked === gameMoves.first_card_clicked) {
          console.log("match_counter", match_counter);
          match_counter++;
          gameMoves.first_card_clicked === null &&
            gameMoves.second_card_clicked === null;
          return;
        }
      }
    }
  }
}
