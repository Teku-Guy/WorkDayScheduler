// Let's set a Var to display Today's Date in Jumbotron later
let todayDate = moment().format('dddd, MMM Do YYYY, h:mm a');

let createTimeBlocks = (blockId, blockText) => {
    let $timeContainer = $('.container');
    let idHour = 9;
    let ampm = "am";
    let timeCounter = 9;
    for(var i = 0; i < 9; i++){
        //let timeBlockDivEl = document.createElement('div').addClass('row time-block');
        $('.container').append("<div id='hour" + idHour + "'class='row time-block'></div>");
        if(idHour === 12){
            ampm = 'pm';
        }
        $('#hour' +idHour).append("<div class='col-md-1 hour'>"+ timeCounter + " " + ampm + "</div>");
        let blockTextarea = $("<textarea type='text'>").addClass('col-md-10 description').text(blockText);
        $('#hour' + idHour).append(blockTextarea);
        $('#hour' + idHour).append("<button class='btn saveBtn col-md-1'><i class='fas fa-save'></i></button>");
        timeCounter++;
        if(idHour === 12){
            timeCounter = 1;
        }
        idHour++;
    }
}

function keepTime() {
    //get current num of hours
    let timeNow = moment().hour();

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

let loadBlocks = () => {
   //load any saved data from LocalStorage - do this for each hour created. Should follow html 24 hour to 12 hour conversion.
   $("#hour8 .description").val(localStorage.getItem("hour8"));
   $("#hour9 .description").val(localStorage.getItem("hour9"));
   $("#hour10 .description").val(localStorage.getItem("hour10"));
   $("#hour11 .description").val(localStorage.getItem("hour11"));
   $("#hour12 .description").val(localStorage.getItem("hour12"));
   $("#hour13 .description").val(localStorage.getItem("hour13"));
   $("#hour14 .description").val(localStorage.getItem("hour14"));
   $("#hour15 .description").val(localStorage.getItem("hour15"));
   $("#hour16 .description").val(localStorage.getItem("hour16"));
   $("#hour17 .description").val(localStorage.getItem("hour17"));
};

let saveBlock = (text, time) => {
    localStorage.setItem(time, text);
};


$(document).ready(function(){
    $('#currentDay').html(todayDate);
    createTimeBlocks();
    keepTime();
    loadBlocks()
    $(".saveBtn").on("click", function () {
        //get nearby values.
        console.log(this);
        var text = $(this).siblings(".description").val(); // taken the change from the sibling html description attribute
        var time = $(this).parent().attr("id"); // taken the change from the parent html id attribute

        //set items in local storage.
        saveBlock(text, time);
    })
});