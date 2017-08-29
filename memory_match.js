/**
 * Created by soysauce on 7/24/17.
 */
$(document).ready(function(){
    var atsume = '.card';
    var nekobutt = '.back';
    var nekoface = '.front';
    $(atsume).on('click', card_clicked);
    $('.reset').on('click',handleResetClick);
    stackShuffle()
});

//variable of cards saved
var atsume = '.card';
var nekobutt = '.back';
var nekoface = '.front';

//variables for functions (to track matches)
var first_card_clicked = null;
var second_card_clicked = null;
var first_card_element = null;
var second_card_element = null;
var total_possible_matches = 9;
var match_counter = 0;
var cards_can_be_clicked = true;


//this is what happens when a card is clicked


//declare card_clicked function


    function card_clicked() {

        if (cards_can_be_clicked === true) {
            $(this).find(nekobutt).addClass('flipped');

//check if variable first_card_clicked is null
// checks and the first card clicked, draws the images source and checks null status
            if (first_card_clicked === null) {
                first_card_clicked = $(this).find('.front > img').attr('src');
                first_card_element = this;
            }
            else {
                cards_can_be_clicked = false;
                second_card_clicked = $(this).find('.front >img').attr('src');
                second_card_element = this;

                //if first card and second card is matching, increment counter and return null.
                if (first_card_clicked === second_card_clicked) {
                    match_counter++;
                    attempts++;
                    display_stats();
                    first_card_clicked = null;
                    second_card_clicked = null;

                    //if match counter is equal to possible matches reveal modal.
                    if (match_counter === total_possible_matches) {
                        $('#myModal').modal('show');
                    }

                }

                //if first card and second card is not matched flip it back.
                else {
                    setTimeout(function () {
                        $(first_card_element).find('.back').removeClass('flipped');
                        $(second_card_element).find('.back').removeClass('flipped');
                        first_card_clicked = null;
                        second_card_clicked = null;
                        attempts++;
                        display_stats();
                        cards_can_be_clicked = true;
                    }, 2000);
                }

            }

        }
    }

//memory match 1.0



var attempts = 0;
var accuracy = 0;
var games_played = 0;

    function display_stats (){
            $('.games_played .value').text(games_played);
            $('.attempts .value').text(attempts);
            var accur_percent = (Math.floor((match_counter/attempts)*100))+'%';
            $('.accuracy .value').text(accur_percent);
    }
    function reset_stats(){
        accuracy = 0 ;
        match_counter = 0 ;
        attempts = 0 ;
    }

    function handleResetClick(){
        console.log('reset clicked');
        $('.card').find('.back').removeClass('flipped');
        games_played++;
        display_stats();
        reset_stats();
        stackShuffle();
    }

//get an array of all cards

    function stackShuffle () {
        //loop until array is empty
        var card_index_copy = card_index.slice();

        for (var i = 0; i < card_index.length; i++) {
            //pick an index  from the array at random
            var card_selected = Math.floor(Math.random() * card_index_copy.length);
            //append the element at that index to the game container
            $('#'+i+"> img").attr("src", card_index_copy[card_selected]);
            //remove that element from the array
            card_index_copy.splice(card_selected, 1);
        }
    }
        var card_index = [
            'image/Sapphire_Sprite.png', 'image/Jeeves_Sprite.png', 'image/Whiteshadow_Sprite.png', 'image/SassyFran_Sprite.png', 'image/Guy_Furry_Sprite.png', 'image/Kathmandu_Sprite.png',
            'image/Senor_don_gato_Sprite.png', 'image/Bengal_Jack_Sprite.png', 'image/Sprite_Joe_DiMeowgio.png',
            'image/Sapphire_Sprite.png', 'image/Jeeves_Sprite.png', 'image/Whiteshadow_Sprite.png', 'image/SassyFran_Sprite.png', 'image/Guy_Furry_Sprite.png', 'image/Kathmandu_Sprite.png',
            'image/Senor_don_gato_Sprite.png', 'image/Bengal_Jack_Sprite.png', 'image/Sprite_Joe_DiMeowgio.png'];


//make a function
//get an array of all your .cards (.card/.front/.back)
//loop until your array is empty
//pick an index from the array at random
//append the element at that index to the game container
//remove that element from the array

// var card_index = $('.card').find('.front > img').attr('src');
// var card_object_array = card_index[i];
//