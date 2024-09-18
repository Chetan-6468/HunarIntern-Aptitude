// Global variables
let COUNT = 1;
let array;

// Main function
$(document).ready(function() {
    console.log("fun called");
    getJSON();
    result();
    let mark = 0; 
    sessionStorage.setItem("mark", mark);
    startTimer();
});

// Result function
function result() {
    let marksession = sessionStorage.getItem("mark");
    let mark1 = parseInt(marksession, 10); // Use radix 10
    console.log(mark1);
    $("#result").text(mark1);
}

// Function to get data from JSON file
function getJSON() {
    $.getJSON("ques-db.json", function(json) {
        array = json;
        getFunction();
    });
}

// Function to print question
function getFunction() {
    if (COUNT <= 25) {
        const keys = Object.values(array);
        let randIndex = Math.floor(Math.random() * keys.length); // Ensure it stays within bounds
        let value = keys[randIndex];
        
        if (value) { // Check if value exists
            $("#queno").text(COUNT);
            $("#que").text(value.question);
            $("#value1").text(value.options[0]);
            $("#value2").text(value.options[1]);
            $("#value3").text(value.options[2]);
            $("#value4").text(value.options[3]);
            sessionStorage.setItem("que", value.question);
            sessionStorage.setItem("ans", value.answer);
            $("#nextBtn").hide(); // Hide the "Next" button initially
            $(".btn").attr("disabled", false); // Enable all options
        }
    } else {
        $("#value1").attr("disabled", true);
        $("#value2").attr("disabled", true);
        $("#value3").attr("disabled", true);
        $("#value4").attr("disabled", true);
        $("#nextBtn").hide();
        $("#submitBtn").show(); // Show the "Submit" button after all questions are answered
    }
}

// Function to check answers and show the "Next" button
function process(value) {
    let selectedValue = value.innerText;
    let ans = sessionStorage.getItem("ans");
    if (ans === selectedValue) {
        let mark = sessionStorage.getItem("mark");
        let mark1 = parseInt(mark, 10); // Use radix 10
        mark1++;
        sessionStorage.setItem("mark", mark1);
    }
    $(".btn").attr("disabled", true); // Disable all options after selection
    $("#nextBtn").show(); // Show the "Next" button when an option is selected
}

// Function to move to the next question
function nextQuestion() {
    COUNT++;
    getFunction();
}

// Function to set timer
function startTimer() {
    var time_in_minutes = 30;
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + time_in_minutes * 60 * 1000);

    function time_remaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return { 'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
    }

    function run_clock(id, endtime) {
        var clock = document.getElementById(id);
        function update_clock() {
            var t = time_remaining(endtime);
            clock.innerHTML = t.minutes + ':' + (t.seconds < 10 ? '0' : '') + t.seconds;
            if (t.total <= 0) {
                clearInterval(timeinterval);
                location.replace("index2.html");
            }
        }
        update_clock();
        var timeinterval = setInterval(update_clock, 1000);
    }

    run_clock('timer', deadline);
}
