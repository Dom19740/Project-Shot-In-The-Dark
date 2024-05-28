$(document).ready(function() {
  var players = [];
  var questions = [];
  var currentQuestionIndex = -1;
  var winningPoints = 0;
  var numPlayers = 0;
  var totalPlayers = 0;
  var currentPlayerIndex = 0;
  var askedQuestionsList = [];

  // Show Play Game
  function playGame() {
      $("#home-container").hide();
      $("#rules-container").show();
  }

  // Show Setup Game
  function setupGame() {
      $("#rules-container").hide();
      $("#setup-game-container").show();
  }


  // Setup Player numbers and winning points
  function gameOptions() {
    var numPlayers = parseInt($("#num-players").val());
    winningPoints = parseInt($("#winning-points").val());

    if (isNaN(numPlayers) || numPlayers < 2) {
      alert("Invalid input. Please enter a valid number of players.");
      return;
    }

    totalPlayers = numPlayers;
    currentPlayerIndex = 0;

    // Display the game container and create player input fields
    $("#setup-game-container").hide();
    $("#player-name-container").show();
    $("#player-name-container-input").val("").focus();
  }

  // Function to load questions from CSV
  function loadQuestionsFromCSV() {
    $.ajax({
      type: "GET",
      url: "questions_answers.csv",
      dataType: "text",
      success: function(data) {
        var lines = data.split("\n");
        for (var i = 0; i < lines.length; i++) {
          var parts = lines[i].split(";");
          if (parts.length === 2) {
            var question = parts[0].trim();
            var answer = parts[1].trim();
            questions.push({ question: question, answer: answer });
          }
        }
      },
      error: function() {
        alert("Failed to load questions from CSV.");
      },
    });
    submitPlayer();
  }


  // Submit Players
  function submitPlayer() {
    var playerName = $("#player-name-input").val().trim();

    if (playerName == "") {
      alert("Invalid input. Please enter a valid number of players.");
      return;
    } else {
      players.push({ name: playerName, score: 0 });
      $("#player-scores").append("<li>" + playerName + ": 0 points</li>");

      // Show the next player name input or start the game if all players have been entered
      if (players.length < totalPlayers) {
        $("#player-name-container p").text("Enter the name for Player " + (players.length + 1) + ":");
        $("#player-name-input").val("").focus();
      } else {
        // Hide the player name container and start the game
        $("#player-name-container").hide();
        $("#game-container").show();
        showQuestion();
        generateRadioButtons(); // Generate radio buttons for players
      }
    }
  }

  // Function to populate player list radio buttons
  function generateRadioButtons() {
    var radioContainer = $("#player-list");
    radioContainer.empty(); // Clear existing radio buttons

    for (var i = 0; i < players.length; i++) {
      var player = players[i];

      var radioButton = $("<input>").attr({
        type: "radio",
        name: "player",
        value: i, // Use player index as the value
        class: "player-radio" // Add a class to the radio button
      });

      var label = $("<label>").text(player.name);

      radioContainer.append(radioButton);
      radioContainer.append(label);
      radioContainer.append("<br>");
    }

    // Event listener for radio button click
    $(".player-radio").click(function() {
      currentPlayerIndex = parseInt($(this).val());
    });
  }

  // Function to show a random question
  function showQuestion() {
    // Check if all questions have been asked
    if (askedQuestionsList.length === questions.length) {
      // Handle case when all questions have been asked
      $("#question").text("All questions have been asked");
      return;
    }

    // Loop until a unique question is found
    do {
      currentQuestionIndex = Math.floor(Math.random() * questions.length);
      currentQuestion = questions[currentQuestionIndex];
    } while (askedQuestionsList.includes(currentQuestionIndex));

    askedQuestionsList.push(currentQuestionIndex);

    // clear playerList radio buttons
    $("input[name='player']").prop("checked", false);

    $("#question").text(currentQuestion.question);
    $("#answer").hide();
  }

  // Function to show the answer for the current question
  function showAnswer() {
    var currentQuestion = questions[currentQuestionIndex];
    $("#answer").text(currentQuestion.answer).show();
  }

  // Function to add a point for the selected player and or show next question
  function addPoint() {
    if (currentPlayerIndex !== null) {
      players[currentPlayerIndex].score += 1;
      $("#player-scores li").eq(currentPlayerIndex).text(players[currentPlayerIndex].name + ": " + players[currentPlayerIndex].score + " points");
    }

    if (!checkGameOver()) {
      showQuestion();
    }
  }

  // Function to check if any player has reached the winning points
  function checkGameOver() {
    for (var i = 0; i < players.length; i++) {
      if (players[i].score >= winningPoints) {
        // Game over, display winner information
        $("#player-scores-game-over").empty();
        for (var j = 0; j < players.length; j++) {
          $("#player-scores-game-over").append("<li>" + players[j].name + ": " + players[j].score + " points</li>");
        }
        $("#winner-info").text(players[i].name + " won the game with " + players[i].score + " points!");
        $("#game-container").hide();
        $("#game-over-container").show();
        $("#play-again").show(); // Show the "Play Again" button
        return true;
      }
    }
    return false;
  }

  // Event listener for the "Play Again" button
  function playAgain() {

    // Reset the game state
    players = [];
    console.log("players: ", players)
    console.log("currentPlayerIndex: ", currentPlayerIndex)
    questions = [];
    currentQuestionIndex = -1;

    // Clear the player scores
    $("#player-scores").empty();

    // Reset the input fields
    $("#num-players").val("");
    $("#winning-points").val("");
    $("#player-name-container p").text("Enter the name for Player 1");

    // Hide the game over container and show the player form again
    $("#game-over-container").hide();
    $("#game-container").hide();
    $("#setup-game-container").show();
  }

  // Event listener for the "Quit" button
  function quitGame() {
    $("#quit-game-container").show();
    $("#quit-yes").show();
    $("#quit-no").show();

    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' // Optional: Add smooth scrolling animation
    });
  }

  function quitYes() {
    location.reload();
  }

  function quitNo() {
     $("#quit-game-container").hide();
  }

  // Event listener for the "Home Play" button
  $("#home-play-button").click(playGame);

  // Event listener for the "Rules Continue" button
  $("#rules-setup-button").click(setupGame);

  // Event listener for the "Setup Continue" button
  $("#setup-continue-button").click(gameOptions);

  // Event listener for the "Submit Player" button
  $("#submit-player-name-button").click(loadQuestionsFromCSV);

  // Event listener for the Enter key press in the Submit Player input field
  $("#player-name-input").keydown(function(event) {
    if (event.keyCode === 13) {
      loadQuestionsFromCSV();
    }
  });

  // Event listener for the "Show Answer" button
  $("#show-answer").click(showAnswer);

  // Event listener for the "Next Question" button
  $("#next-question").click(addPoint);

  // Event listener for the "Next Question" button
  $("#play-again").click(playAgain);

  // Event listener for the "Quit" button
  $("#quit-game").click(quitGame);

  // Event listener for the "Yes" button
  $("#quit-yes").click(quitYes);

  // Event listener for the "Yes" button
  $("#quit-no").click(quitNo);

});
