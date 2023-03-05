function chatBot() {

  this.input;
  
  this.respondTo = function (input) {

    this.input = input.toLowerCase();

    if (this.match('(manutenção)'))
   	return "Entendi! Você precisa de uma inspeção ou preventiva?";

    if (this.match('(inspeção|corretiva)'))
   	return "Certo! Vou direcionar sua conversa para um especialista de manutenção🛠️";
    
    if (this.match('(preventiva|revisão)'))
   	return "Certo! Vou direcionar sua conversa para um especialista de manutenção🛠️";
    
    if (this.match('(sinistro|colisão|batida|acidente)'))
   	return "Poxa, espero que ninguém tenha se ferido. Vou direcionar sua conversa para um especialista de emergência🚨";
    
    if (this.match('(financeiro|cobrança|fatura|semanal|pagamento)'))
   	return "Beleza! Vou direcionar sua conversa para um especialista do time de cobrança💲";

    return "Desculpe, não entendi 😕";
  };

  
  this.match = function (regex) {

    return new RegExp(regex).test(this.input);
  };
}


$(function () {

 
  var you = 'Você';
  var robot = 'Vokinho 🚗';

 
  var delayStart = 400;
  var delayEnd = 800;

  
  var bot = new chatBot();
  var chat = $('.chat');
  var waiting = 0;
  $('.busy').text(robot + ' is typing...');

 
  var submitChat = function () {

    var input = $('.input input').val();
    if (input == '') return;

    $('.input input').val('');
    updateChat(you, input);

    var reply = bot.respondTo(input);
    if (reply == null) return;

    var latency = Math.floor(Math.random() * (delayEnd - delayStart) + delayStart);
    $('.busy').css('display', 'block');
    waiting++;
    setTimeout(function () {
      if (typeof reply === 'string') {
        updateChat(robot, reply);
      } else {
        for (var r in reply) {
          updateChat(robot, reply[r]);
        }
      }
      if (--waiting == 0) $('.busy').css('display', 'none');
    }, latency);
  };

  var updateChat = function (party, text) {

    var style = 'you';
    if (party != you) {
      style = 'other';
    }

    var line = $('<div><span class="party"></span> <span class="text"></span></div>');
    line.find('.party').addClass(style).text(party + ':');
    line.find('.text').text(text);

    chat.append(line);

    chat.stop().animate({ scrollTop: chat.prop("scrollHeight") });

  };


  $('.input').bind('keydown', function (e) {
    if (e.keyCode == 13) {
      submitChat();
    }
  });
  $('.input a').bind('click', submitChat);


  updateChat(robot, 'Olá, eu sou o Vokinho! Como posso te ajudar hoje?'); 

});