$(document).ready(function () {
    if ($("#name").val('')) {
        $("#name").val('Meu nome é Igor, qual é o seu?');
    }
    $('#name').focus(function () {
        if ($('#name').val() == 'Meu nome é Igor, qual é o seu?') {
            $('#name').val("");
        }

    });
    $('#name').blur(function () {
        var nameRegex = /^[A-Za-z]+$/;
        // var fname = document.getElementById("name").value;
        var fname = $("#name").val();
       

        if (!(nameRegex.test(fname))) {
            $("#name").attr("placeholder", "Ainda não sei seu nome").addClass("human-form-input-error");
            $("#human-name-return").text("");

        } else if (fname == " ") {
           $("#name").attr("placeholder", "Ainda não sei seu nome").addClass("human-form-input-error");
            $("#human-name-return").text("");
        } else {
            $("#name").removeClass("human-form-input-error");
            $("#human-name-return").addClass("fadeIn animated").text("Muito prazer, " + $("#name").val());
           
        }


    });

});

$("#humanform").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        alert("Acho que faltou alguns campos.");
    } else {
        event.preventDefault();
        submitForm();
    }
});

function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#humanform").addClass("hidden");
    $( "#human-return" ).removeClass( "hidden" ).addClass("fadeIn animated").append("Muito prazer, " + $("#name").val() + ".");
}
function formError(){
    $("#humanform").addClass('shake animated');
}
function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "fadeIn animated";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#human-return").removeClass().addClass(msgClasses).text(msg);
}
