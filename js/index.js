$("#name").focus();

$(".other").hide();

$("#title").change(function(e) {
    if(e.target.value == "other") {
        // console.log(this.value);
        $(".other").show();
    } else {
        $(".other").hide();
    }
});

$("#design").change(function(e) {
    $("#color option").hide();
    if(e.target.value == "js puns") {
        $(".cornflowerblue, .darkslategrey, .gold").show();
    } else if(e.target.value == "heart js") {
        $(".tomato, .steelblue, .dimgrey").show();
    }
});

$("input:checkbox").change(function(e) {
    const schedule = e.target.dataset.dayAndTime;
    if(e.target.checked) {
        // the below 2 lines of code show dates and times of non conflicting selected options
        $(`*[data-day-and-time="${schedule}"]`).parent().hide();
        $(this).parent().show();
    } else {
        // the line below runs once a checkbox is unchecked 
        $(`*[data-day-and-time="${schedule}"]`).parent().show();
    }
});

$("#payment").change(function(e) {
    let value = e.target.value;
    $("#credit-card, #paypal, #bitcoin").show();
    if(value === 'credit-card') {
        $("#paypal, #bitcoin").hide();
    } else if(value === 'bitcoin') {
        $("#credit-card, #paypal").hide();
    } else if(value === 'paypal'){
        $("#credit-card, #bitcoin").hide();
    }
});







