$(document).ready(function(){
  
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  right: 0,
  wrong: 0,
  notanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',

  questions: {
    q1: 'what are the 3 starter pokemon in Emeral, Ruby, and Saphire?',
    q2: 'how much does a bike cost in the game?',
    q3: 'who is the last gym leader?',
    q4: 'the pokemon on the cover of Emerald is?',
    q5: 'the pokemon on the cover of Sapphire is?',
    q6: 'pokemon on the cover of Ruby is?',
    q7: 'Who are the 4 final bosses you have to face to prove youre worth something?'
  },
  options: {
    q1: ['apple, orange, snail', 'torchic, treeko, mudkip', 'yes i dip, mudflip, shes a chick'],
    q2: ['just steal one duh', 'like a millioin', 'you get it for free numbnut'],
    q3: [ 'ur dad', 'brock', 'ur mom'],
    q4: ['rayquanza', 'lugia', 'rayquaza'],
    q5: ['kyoto', 'kyogre', 'shrek the ogre'],
    q6: ['groudon', 'groundhog', 'dude its a squirrel'],
    q7: ['the fantastic four', 'the elite four', 'the four horsemen']
  },
  answers: {
    q1: 'torchic, treeko, mudkip',
    q2: 'you get it for free numbnut',
    q3: 'ur dad',
    q4: 'rayquaza',
    q5: 'kyogre',
    q6: 'groudon',
    q7: 'the elite four'
  },
  
  startGame: function(){
 
    trivia.currentSet = 0;
    trivia.right = 0;
    trivia.wrong = 0;
    trivia.notanswered = 0;
    clearInterval(trivia.timerId);
   
    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start').hide();
    $('#remaining-time').show();
    trivia.nextQuestion();
    
  },
  nextQuestion : function(){
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    else if(trivia.timer === -1){
      trivia.notanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.right +'</p>'+
        '<p>Incorrect: '+ trivia.wrong +'</p>'+
        '<p>Unanswered: '+ trivia.notasnwered +'</p>'+
        '<p>Please play again!</p>');
  
      $('#game').hide();
      $('#start').show();
    }
    
  },
  guessChecker : function() {
    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      trivia.right++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    
    else{
     
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.wrong++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },

  guessResult : function(){
    trivia.currentSet++;
        $('.option').remove();
     $('#results h3').remove();
    trivia.nextQuestion();
     
  }

}