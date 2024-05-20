//-------------------------

async function handleSubmit(event) {
    var button = document.getElementById("submit-btn");
    var loader = document.getElementById("loader");
    var form = document.getElementById("popup-form");
    var message = document.getElementById("messages");

    var dataForm = new FormData(form);
    button.style.display = "none";
    loader.style.display = "block";
    event.preventDefault();

    if (ValidateField() == true) {
        $.ajax({
            url: event.target.action,
            method: form.method,
            body: dataForm,
            headers: {
                Accept: "application/json",
            },
            data: $("#popup-form").serialize(),
            success: function (data) {
                console.log(data);

                if (data.type == "success") {
                    form.reset();

                    message.classList.add("success");
                    message.innerHTML = data.message;

                    loader.style.display = "none";
                } else {
                    message.classList.add("danger");
                    message.innerHTML =
                        "There was an error while submitting the form. Please try again later";

                    loader.style.display = "none";
                    button.style.display = "block";
                }
            },
            error:
                function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);

                    message.classList.add("danger");
                    message.innerHTML =
                        "Oops, something went wrong while submitting the form. Please try again later";

                    loader.style.display = "none";
                    button.style.display = "block";
                },
        });
        return false;
    } else {
        button.style.display = "block";
        loader.style.display = "none";
    }
}

document.addEventListener("submit", handleSubmit);

function ValidateField() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email");
    var messageinp = document.getElementById("message").value;

    var message = document.getElementById("messages");
    message.classList.remove("danger");
    message.classList.remove("success");

    var emailValidation = ValidateEmail(email);
    var phoneValidation = ValidatePhone(phone);
    var nameValidation = ValidateName(name);
    var messageValidation = ValidateMessage(messageinp);

    if (
        emailValidation == false ||
        phoneValidation == false ||
        nameValidation == false ||
        messageValidation == false
    ) {
        return false;
    } else {
        return true;
    }
}

function ValidateEmail(input) {
    var error = document.getElementById("email-error");
    var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value == "") {
        error.classList.add("danger");
        error.innerHTML = "Email field can't be empty.";
        return false;
    } else if (input.value.match(validRegex)) {
        error.classList.remove("danger");
        return true;
    } else {
        error.classList.add("danger");
        return false;
    }
}

function ValidatePhone(input) {
    var error = document.getElementById("phone-error");
    var validRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (input.value == "" || input.value.match(validRegex)) {
        error.classList.remove("danger");
        return true;
    } else {
        error.classList.add("danger");
        return false;
    }
}

function ValidateName(name) {
    var nameError = document.getElementById("name-error");
    if (name.trim() == "") {
        nameError.classList.add("danger");
        return false;
    } else {
        nameError.classList.remove("danger");
        return true;
    }
}

function ValidateMessage(message) {
    var messageError = document.getElementById("message-error");
    if (message.trim() == "") {
        messageError.classList.add("danger");
        return false;
    } else {
        messageError.classList.remove("danger");
        return true;
    }
}
