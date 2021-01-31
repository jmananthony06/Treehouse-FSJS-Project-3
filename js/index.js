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
    let checkedCheckboxes = $(".activities input:checked");
    let activityEl = $(".activities");
    //console.log(checkedCheckboxes);
    //console.log(checkedCheckboxes.length);
    
    // checkedCheckboxes.each();
    
    let formIsValid = true;

    dataElements.each(function(){
        let el = $(this);
        let id = el.attr("id"); //what the id is
        let val = el.val(); //what the user wrote
        let validator = validationObj[id]; // accessing piece of an object 
        let thisIsValid = validator ? validator(val, el) : true; // out of the data, get value of id and get into the object to see if property matches the id of the thing we found. If it exists, call function with value via ternerary operator
        //if the function is found, then call it
        
        //console.log($(this).attr("id"));
        //console.log($(this).val());
        
        if (!thisIsValid) {
            formIsValid = false;
        }
    });
    if (!validationObj.checkBoxes(checkedCheckboxes, activityEl)) {
        formIsValid = false;
    }
    console.log("form is valid:", formIsValid);
});

//called on line 57
// if there's a string with a certain length, good, but if no length at all, shoot error
let validationObj = {
    name: function(val, el){
        console.log("checking to see if is valid");
        if(typeof val == "string" && val.length > 0){
            el.removeClass('error');
            return true;
        } else {
            el.addClass('error');
            return false;
        }
    }, 
    mail: function(val, el){
        console.log("checking to see if mail is valid");
        if (validateEmail(val)){
            el.removeClass('error');
            return true;
        } else {
            el.addClass('error');
            return false;
        }
    },
    // @# CREDIT CARD VALIDATION  
    checkBoxes: function(boxes, activityEl) {
        if(boxes.length == 0) {
            activityEl.addClass('error');
            return false;
        } else {
            activityEl.removeClass('error');
            return true;
        }
    }
}

//validates email address with regex - copied and pasted this specific line from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

