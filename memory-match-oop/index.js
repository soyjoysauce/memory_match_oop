// written by soyjoysauce on Dec 3 2017
$(document).ready(function(){
    $(this.memory_Match).bind(this);
    console.log('memory made');
    
});

class memoryMatch {
    constructor(){
        this.cardArray = [];
        this.imageArray = [
            'sapphire_Sprite', 'jeeves_Sprite', 'whiteshadow_Sprite', 
            'sassyFran_Sprite', 'guy_Furry_Sprite', 'kathmandu_Sprite',
            'senor_don_gato_Sprite', 'bengal_Jack_Sprite', 'sprite_Joe_DiMeowgio'
        ];
        this.createCard();
    }
    //Take in imageArray and create two of each and generate random number for random disbursement 
    //multiply the array and then take the doubled array and randomize
    //take the randomized array and append to the card item object. 

    createCard(){
        let image_Array = this.imageArray;
        let doubled_Array = [];
        let randomized_Cards = [];
        let counter = 0;
        image_Array.map(function(img){ doubled_Array.push(img); doubled_Array.push(img);console.log('doubled_Array1',doubled_Array)});
        console.log('doubled_Array2',doubled_Array);            
        
        doubled_Array.map(function(){
            let randomNum = Math.floor(Math.random() * doubled_Array.length);                                                     
            let item = {
                'id': counter,
                'card': doubled_Array[randomNum],
                'info': $('<div>',{
                    id : counter,
                    card : doubled_Array[randomNum],
                })
            };
            $('.card_img_container').append(item.info.clone());
            randomized_Cards.push(item);            
            counter ++ ;
            console.log('item',item);
            console.log('doubled_Array3',doubled_Array)            
        })
    }

}

let memory_Match = new memoryMatch();
