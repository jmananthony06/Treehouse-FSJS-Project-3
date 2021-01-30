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
//on page load, everything is hidden by default
$("#credit-card, #paypal, #bitcoin").hide();

//function allows for each payment to show upon selection
$("#payment").change(function(e) {
    let value = e.target.value;
    $("#credit-card, #paypal, #bitcoin").hide();
    if(value === 'credit-card') {
        $("#credit-card").show();
    } else if(value === 'bitcoin') {
        $("#bitcoin").show();
    } else if(value === 'paypal'){
        $("#paypal").show();
    }
});

$('#submitButton').click(function(e) {
    e.preventDefault(); //stops default action of submit button 
    let dataElements = $('#name, #mail, #title, #size, #design, #color');
    dataElements.each(function(){
        let el = $(this);
        let id = el.attr("id"); //what the id is
        let val = el.val(); //what the user wrote
        let validator = validationObj[id]; // accessing piece of an object 
        validator ? validator(val, el) : null; // out of the data, get value of id and get into line 64 object to see if property matches the id of the thing we found. If it exists, call function with value via ternerary operator
        console.log($(this).attr("id"));
        console.log($(this).val());
    });
});

//called on line 57
// if there's a string with a certain length, good, but if no length at all, shoot error
let validationObj = {
    name: function(val, el){
        console.log("checking to see if is valid");
        if(typeof val == "string" && val.length > 0){
            el.removeClass('error');
        } else {
            el.addClass('error');
        }
    }, 
    mail: function(val, el){
        console.log("checking to see if mail is valid");
//         bool isValid = false;

// try
// {
//     MailAddress address = new MailAddress(emailAddress);
//     isValid = (address.Address == emailAddress);
//     // or
//     // isValid = string.IsNullOrEmpty(address.DisplayName);
// }
// catch (FormatException)
// {
//     // address is invalid
}
        if(typeof val == "string" && val.length > 0){
            el.removeClass('error');
        } else {
            el.addClass('error');
        }
    }
}







