// Let's set a Var to display Today's Date in Jumbotron later
let todayDate = moment().format('dddd, MMM Do YYYY, h:mm a');

function keepTime() {
    //get current num of hours
    var timeNow = moment().hour();

    //need to loop over the time-blocks
    $('.time-block').each(function(){
        //for everytime we loop through one of the .time-blocks we search through the id and split it and parse the in after 'Hour'
        // this allows us to check each div and make sure we set the right one with the right background
        var timeBlock = parseInt($(this).attr('id').split('hour')[1]);

        //need to check the time and add the classes for background color
        if(timeBlock < timeNow) {
            $(this).removeClass('future');
            $(this).removeClass('present');
            $(this).addClass('past');
        } else if(timeBlock === timeNow){
            $(this).removeClass('past');
            $(this).removeClass('future');
            $(this).addClass('present');
        } else {
            $(this).removeClass('present');
            $(this).removeClass('past');
            $(this).addClass('future');
        }

    });
}

$(document).ready(function(){
    $('#currentDay').html(todayDate);
});

keepTime();