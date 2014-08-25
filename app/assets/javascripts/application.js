// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
  var $body = $('body');
  $body.append("<h1 class='center'>Todoly</h1>");
  $body.append("<form class='center' id='todo'><input name='todo' class='todo-form' id='todo-input' type='text'><br><button class='todo-form' id='input-button'>Create Todo</button></form>")
  $body.append("<h3 class='center'>Todo!</h3>");
  $body.append("<ul id='all-todos'></ul>");

  var $allTodos = $('ul#all-todos');
  var $createTodo = $('#input-button');



  $createTodo.click(function(e){
    e.preventDefault();
    var $input = $('#todo-input');

    $allTodos.append('<li>' + $input.val() + '</li>');
    $('li:nth-child(even)').addClass('gray-back');

    $input.val("");

    var $flash = $('.flash-success');

    if($flash.size() > 0){
      $flash.remove();
      $('ul').prepend("<div class='flash-success center'><p class='flash-text'>Todo created</p><button class='x'>✗</button>");
    } else {
      $('ul').prepend("<div class='flash-success center'><p class='flash-text'>Todo created</p><button class='x'>✗</button>");
    }

    $('button.x').on('click', function(){
      $(this).parents('div').remove();
    });

    $('.flash-success').delay(5000).fadeOut();
  });



});
