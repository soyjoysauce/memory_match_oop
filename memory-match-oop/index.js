// written by soyjoysauce on Dec 3 2017
$(document).ready(function() {
  $(this.memory_Match).bind(this);
  console.log("memory made");
  let memory_Match = new memoryMatch();
});

class memoryMatch {
  constructor() {
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

  clickHandlers(){
    $(".card_img_container").on('click','div',this.card_clicked.bind(this));
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
        info: $("<div>", {
          id: counter,
          card: img
        })
      };
      matched_Cards.push(item);
      counter++;
      let item2 = {
        id: counter,
        card: img,
        info: $("<div>", {
          id: counter,
          card: img
        })
      };
      matched_Cards.push(item2);
      counter++;
      console.log("matched_Cards", matched_Cards);
    });
    function randomize_list(array){
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
    let user_input = event.target.card.outerHTML;
    console.log('this.user_input',user_input)
    //variables for functions (to track matches)
    let cards_can_be_clicked = true;
    
    let first_card_clicked = null;
    let second_card_clicked = null;
    
    let total_possible_matches = 9;
    let match_counter = 0;

    second_card_clicked === null && first_card_clicked === null ? first_card_clicked = user_input  : 'cards are locked';
    
    first_card_clicked !== null && second_card_clicked === null ? second_card_clicked = user_input  : 'cards are false';    
    cards_can_be_clicked === true && first_card_clicked !== null ? cards_can_be_clicked = false  : 'cards are locked';
    console.log('first_card_clicked', first_card_clicked);
    console.log('second_card_clicked', second_card_clicked);
    first_card_clicked === second_card_clicked ? match_counter++ : first_card_clicked === null && second_card_clicked === null;

    // console.log('match_counter',match_counter)
  }
}
