var gamePattern = new Array();
var userClickedPattern = new Array();
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;
function nextSequence(){
    level++;
    $("#level-title").text("Level-"+level);
    userClickedPattern = new Array();
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    playSound(randomChosenColor);
};
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    var audioPlay = audio.play();
}
function animatedPressed(name){
    var button = $("#"+name);
    button.addClass("pressed");
    setTimeout(function(){
        button.removeClass("pressed");
    },500);
};
function checkAnswer(index){
        if(gamePattern[index]==userClickedPattern[index]){
            if(gamePattern.length == userClickedPattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
            playSound("wrong");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            startOver();
        }
};
function startOver(){
    gamePattern = new Array();
    start = false;
    level = 0;
    
}
$(".btn").click(function(){
    var userChosenColour  = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPressed(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(start===false){
        $("#level-title").text("Level-"+level);
        start = true;  
        nextSequence();
    }
});
