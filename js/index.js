$("#name").focus(); //automatically puts focus on the name id element on the page 

$(".other").hide(); // automatically hides input field upon page load until option is selected from drop down menu

$("#title").change(function(e) { //this function fires when the "other" option from drop down menu is selected
    if(e.target.value == "other") {
        // console.log(this.value);
        $(".other").show();
    } else {
        $(".other").hide();
    }
});

$("#design").change(function(e) { //this controls what colors and themes appear depending on the option selected for the shirt size
    $("#color option").hide();
    $("#color").val("");
    if(e.target.value == "js puns") {
        $(".cornflowerblue, .darkslategrey, .gold").show();
    } else if(e.target.value == "heart js") {
        $(".tomato, .steelblue, .dimgrey").show();
    }
});

$("input:checkbox").change(function(e) { // this function makes sure which times can and cannot be selected in conjunction together 
    const schedule = e.target.dataset.dayAndTime;
    if(e.target.checked) {
        // the below 2 lines of code show dates and times of conflicting selected options
        $(`*[data-day-and-time="${schedule}"]`).prop("disabled", true);
        $(this).prop("disabled", false);
        // $(`*[data-day-and-time="${schedule}"]`).hide();
        // $(this).parent().show();
    } else {
        // the line below runs once a checkbox is unchecked 
        $(`*[data-day-and-time="${schedule}"]`).prop("disabled", false);
        // $(`*[data-day-and-time="${schedule}"]`).parent().show();
    }
});
//on page load, everything is hidden by default
$("#paypal, #bitcoin").hide(); //these payment options are automatically hidden until an option is selected for payment 

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

$('#submitButton').click(function(e) { // this function allows you to submit as long as there are activity check boxes checked

    $(".errorMessage").remove();
    let formIsValid = true; // assuming form is valid  
    let elementsToCheck = '#name, #mail, #title, #size, #design, #color';



    if($("#payment").val() === "credit-card") {
     let ccElements = ', #cc-num, #zip, #cvv'; 
     elementsToCheck += ccElements; // appends the cc elements to the other elements (elementsToCheck) of the form for this specific use case 
    //  console.log(elementsToCheck);  
    }

    let dataElements = $(elementsToCheck);

    dataElements.each(function(){ 
        let el = $(this); // in this scope, we're selecting jQuery list elements from the each loop, accesses current element that is selected 
        let id = el.attr("id"); //what the id is
        let val = el.val(); //what the user wrote
        let validator = validationObj[id]; // accessing piece of an object, specifically the validationObj starting on line 87
        // 62 checks to make sure we found a function to call. If found, it's called
        let thisIsValid = validator ? validator(val, el) : true; // out of the data, get value of id and get into the object to see if property matches the id of the thing we found. If it exists, call function with value via ternerary operator
        //if the function is found, then call it
        
        // console.log($(this).attr("id")); -- lines 65 & 66 used for debugging purposes 
        // console.log($(this).val());
        
        if (!thisIsValid) { // if the form isn't for whatever reason, don't allow form to submit 
            formIsValid = false;
        }
    });

    let checkedCheckboxes = $(".activities input:checked"); // make the checkboxes
    let activityEl = $(".activities"); // check the activity boxes

    if (!validationObj.checkBoxes(checkedCheckboxes, activityEl)) { // this function handles the checkboxes section differently than the previous functions handling the rest of the form in that 
        formIsValid = false;
    }
    if(!formIsValid) {
        e.preventDefault(); //stops default action of submit button 
    }
    console.log("form is valid:", formIsValid);
});

//called on line 57
// if there's a string with a certain length, good, but if no length at all, shoot error
let validationObj = {
    name: function(val, el){ // 
        console.log("checking to see if name is valid");
        if(typeof val == "string" && val.length > 0){
            el.removeClass('error');
            return true;
        } else {
            el.addClass('error');
            appendAfter(el, "Invalid. Must have first and/or last name");
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
            appendAfter(el, "Invalid. Must input valid email address");
            return false;
        }
    },
    // @# CREDIT CARD VALIDATION  
    checkBoxes: function(boxes, activityEl) {
        if(boxes.length == 0) {
            activityEl.addClass('error');
            appendAfter(activityEl, "Must have at least one activity selected");
            return false;
        } else {
            activityEl.removeClass('error');
            return true;
        }
    },
    "cc-num": function(val, el) {
        console.log("validating: cc-num", typeof val);
        let validCCNum = parseInt(val);
        console.log(validCCNum);

        if(val.length >= 13 && val.length <= 16 && typeof validCCNum === "number") {
            el.removeClass('error');
            return true;
        } else {
            el.addClass('error');
            appendAfter(el, "Invalid. Must be a number between 13 and 16 digits");
            return false;
        }
    },
    "zip": function(val, el) {
        console.log("validating: zip", typeof val);
        let validZip = parseInt(val);
        console.log(validZip);

        if(val.length == 5 && typeof validZip === "number") {
            el.removeClass('error');
            return true;
        } else {
            el.addClass('error');
            appendAfter(el, "Invalid. Must be 5 digits.");
            return false;
        }
    },
    "cvv": function(val, el) {
        console.log("validating: cvv", typeof val);
        let validCVV = parseInt(val);
        console.log(validCVV);

        if(val.length == 3 && typeof validCVV === "number") {
            el.removeClass('error');
            return true;
        } else {
            el.addClass('error');
            appendAfter(el, "Invalid. Must be 3 digits.");
            return false;
        }
    }

}

function appendAfter(target, message){
    $(target).after(`<p class="errorMessage">${message}</p>`);
}


//validates email address with regex - copied and pasted this specific line from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

