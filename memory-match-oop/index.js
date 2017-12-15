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
      accuracy : 0,
      games_played : 0
    }    
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
        card:img,
        class: img,
        info: $("<div>", {
          id: counter,
          card:img,          
          class: img
        })
      };
      matched_Cards.push(item);
      counter++;
      let item2 = {
        id: counter,
        card:img,        
        class: img,
        info: $("<div>", {
          id: counter,
          card:img,          
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

  display_stats() {
    let gameAttempt = this.game_stats['attempt'];
    let gameAccuracy = this.game_stats['accuracy'];
    let gamesPlayed = this.game_stats['games_played'];
    $(".games_played .value").text(games_played);
    $(".attempts .value").text(attempts);
    var accur_percent = Math.floor(match_counter / attempts * 100) + "%";
    $(".accuracy .value").text(accur_percent);
  };

  card_clicked() {
    let gameMatch = this.game_stats['match_counter'];
    let gameMaxMatch = this.game_stats['total_possible_matches'];        
    let gameMoves = this.game_moves;
    let cards_can_be_clicked = true;
    let user_input = event.target.className;
    console.log("user_input", user_input);

    if (gameMoves.first_card_clicked === null) {
      console.log("user_input", user_input);      
      gameMoves['first_card_clicked'] = user_input;
      console.log("gameMoves.first_card_clicked", gameMoves.first_card_clicked);
    }
    else {
      gameMoves.second_card_clicked = user_input; 
      console.log("user_input", user_input);            
      gameMoves['second_card_clicked'] = user_input;
      console.log("gameMoves.second_card_clicked", gameMoves.second_card_clicked);      
      
      if (gameMoves.second_card_clicked === gameMoves.first_card_clicked) {
        console.log("gameMatch", gameMatch);
        gameMatch ++;
        console.log("gameMatch", gameMatch);        
        gameMoves.first_card_clicked = null; 
        gameMoves.second_card_clicked = null;
        gameMatch === gameMaxMatch ? 'you won!':'keep going';
      }
      else{
        console.log('there was no match return state');
        gameMoves.first_card_clicked = null; 
        gameMoves.second_card_clicked =  null;
        console.log(gameMoves.first_card_clicked,gameMoves.second_card_clicked);
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
  };

  reset_stats() {
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
  };
}
