/**
 * Author: Josh Bakos
 * Student ID: 100652490
 * Date Completed: 2020-03-07
 */


class Contact {
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "") {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}


class User {
    constructor(firstName = "", lastName = "", username = "", email = "", password = "") {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}


"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function (app) {

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();

    /**
     * Variable initialization in this function
     *
     */
    function Start() {
        PageSwitcher();

        Main();
    }

    function PageSwitcher() {
        let name = window.location.pathname;

        let pageName = name.substring(1, name.length - 5);

        switch (pageName) {
            case "index":
                DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

        // add a class of active to the active link
        $("#" + pageName).addClass("active");
    }

    function DisplayHomePageContent() {
        document.getElementById("home").className = "nav-item active";
        /* $("button").click(()=>{
            location.href = "projects.html";
        }); */

        document.title = "WEBD6201 - Home";

        let progressbar = $("#progressBar").progressbar({
            value: 37
        });

        console.log(progressbar);

        $("#projectsButton").click(function () {
            $(this).fadeOut(3000, "linear", () => {
                $(this).fadeIn(1000, "linear", () => {
                    location.href = "projects.html";
                });
            });
        });
    }

    function DisplayProductsContent() {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent() {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent() {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent() {
        document.title = "WEBD6201 - Contact Us";
        function clearForm() {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage) {
            if (condition) {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e) => {
            validateInput("#contactName", ($("#contactName").val().length < 2), "Contact Name is Too Short");
        });

        $("#contactName").focus((e) => {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e) => {
            validateInput("#emailAddress", ($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")), "Invalid Email Address");
        });

        $("#emailAddress").focus((e) => {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e) => {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber", (!phonePattern.test(phoneNumber)), "Invalid Contact Number");
        });

        $("#contactNumber").focus((e) => {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e) => {
            validateInput("#contactMessage", ($("#contactMessage").val().length < 2), "Contact Message Too Short");
        });

        $("#contactMessage").focus((e) => {
            $("#contactMessage").select();
        });


        $("#contactForm").submit((e) => {
            if (document.getElementById("contactForm").checkValidity() == false) {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }


            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e) => {
            e.preventDefault();
            
            if (confirm("Are You Sure?")) {
                clearForm();
            }


        });
    }

    function DisplayProjectsContent() {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent() {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit((e) => {

            // Get the navbar
            let navbar = document.getElementsByClassName("navbar-nav ml-auto")[0];

            // Create new navbar-text element
            let username_display = document.createElement('span');
            username_display.setAttribute('class', 'navbar-text');
            username_display.setAttribute('style', 'padding-left: 10px; padding-right: 10px;')

            // Get the login username and set the element content
            let username_display_content = $("#contactName").val();
            username_display.innerHTML = username_display_content;

            // Insert the element
            navbar.insertBefore(username_display, navbar.children[5]);

            e.preventDefault();
            e.stopPropagation();
            $("#loginForm")[0].reset();
            $("#login").hide();
            $("#logout").show();
        });

    }

    function DisplayRegisterContent() {
        document.title = "WEBD6201 - Register";

        // Simple re-usable function for validating input
        function validateInput(selector, condition, errorMessage) {
            if (condition) {
                $("#ErrorMessage").show();
                $("#ErrorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else {
                $("#ErrorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        // When the page loads initially, hide the error message and select the first input
        $("#ErrorMessage").hide();
        $("#FirstName").select();


        // First Name Events
        $("#FirstName").blur((e) => {
            validateInput("#FirstName", ($("#FirstName").val().length < 2), "First Name is too short");
        });

        $("#FirstName").focus((e) => {
            $("#FirstName").select();
        });


        // Last Name Events
        $("#lastName").blur((e) => {
            validateInput("#lastName", ($("#lastName").val().length < 2), "Last Name is too short");
        });

        $("#lastName").focus((e) => {
            $("#lastName").select();
        });


        // Email Events
        $("#emailAddress").blur((e) => {
            validateInput("#emailAddress", ($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")), "Invalid Email Address");
        });

        $("#emailAddress").focus((e) => {
            $("#emailAddress").select();
        });


        // Password Events
        $("#password").blur((e) => {
            // Check if the first password is of valid length, then you don't need to check the other (redundant)
            validateInput("#password", ($("#password").val().length < 6), "Passwords must be at least 6 characters");
        });

        $("#password").focus((e) => {
            $("#password").select();
        });

        $("#confirmPassword").blur((e) => {
            // Check if the two password inputs are equal
            validateInput("#confirmPassword", ($("#confirmPassword").val() != $("#password").val()), "Passwords do not match");
        });

        $("#confirmPassword").focus((e) => {
            $("#confirmPassword").select();
        });


        // Simple form clearing method
        function clearForm() {
            $("#registerForm")[0].reset();
            $("#ErrorMessage").hide();
        }


        // When the user presses register
        $("#registerForm").submit((e) => {
            // Prevent default form opterations
            e.preventDefault();
            e.stopPropagation();

            // Get all the values from the register form
            // Not sure where to grab username - username is not a part of the register inputs
            let firstName = $("#FirstName").val();
            let lastName = $("#lastName").val();
            let username = $("#username").val();
            let email = $("#emailAddress").val();
            let password = $("#password").val();

            // Create a new user and then log to the console
            let userObject = new User(firstName, lastName, username, email, password);
            console.log(userObject);

            // Clear the form
            clearForm();
        });
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main() {

    }



    window.addEventListener("load", Start);
})(app || (app = {}));

