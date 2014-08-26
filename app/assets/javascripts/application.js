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


//function Flash(){
//
//}
//
//function Todo(){
//
//}
//
//function TodoApp(container, flash) {
//  this.flash = flash;
//  this.container = container;
//
//  // boot the todo app here
//
//  this.flash.notice("hello");
//}
//
//var flash = new Flash($('.flash'));
//var todoApp = new TodoApp($('.todo-app', flash));
//Object.create();



$(document).ready(function() {

  var $body = $('body');
  $body.append("<h1 class='center'>Todoly</h1>");
  $body.append("<form class='center' id='todo'><input name='todo' class='todo-form' id='todo-input' type='text'><br><button class='todo-form' id='input-button'>Create Todo</button></form>")
  $body.append("<h3 class='center'>Todo!</h3>");
  $body.append("<ul id='all-todos'></ul>");
  $body.append("<div class='completed'><h3 class='center'>Complete</h3><ul class='completed-list'></ul></div>");

  var $allTodos = $('ul#all-todos');
  var $createTodo = $('#input-button');
  var $input = $('#todo-input');
  var $flash = $('.flash-success');

  $('.completed').hide();

  var newTask = function(id,description){
    return ('<li data-id=' + id + '>' + description + "<button class='check-mark'>✓</button>" + "<button class='task-x'>✗</button>" + '</li>');
  };

  var removeParent = function(item,element){
    item.parents(element).remove()
  };

  var clearValue = function(element){
    element.val("");
  };

  var addFlash = function(flashDOM, flashClass, addDOM, msg){
    if(flashDOM.size() > 0){
      flashDOM.remove();
      addDOM.prepend("<div class=" + flashClass + "><p class='flash-text'>" + msg + "</p><button class='x'>✗</button>");
    } else {
      addDOM.prepend("<div class=" + flashClass + "><p class='flash-text'>" + msg + "</p><button class='x'>✗</button>");
    }
  };

  $createTodo.click(function(e){
    e.preventDefault();

    $.ajax({
      url: "/tasks",
      type: "post",
      data: {"description": $input.val()},
      success: function(data){
        var id = data.id;
        var descrip = data.description;
        $allTodos.append(newTask(id, descrip));

        $('button.task-x').click(function(){

          var id = parseInt($(this).parent('li').attr('data-id'));
          console.log(id);

          var $clicked = $(this);

          $.ajax({
            url: "/tasks/" + id,
            type: "delete"
          });

          $(this).parent('li').remove();

          var $taskFlash = $('.task-flash-remove');
          var $parent = $clicked.parent('ul');

          if($taskFlash.size() > 0){
            $taskFlash.remove();
               $('ul').prepend("<div class='task-flash-remove center'><p class='flash-text'>Todo deleted</p><button class='remove-flash'>✗</button>");
               $clicked.parent('ul').prepend("<div class='task-flash-remove center'><p class='flash-text'>Todo deleted</p><button class='remove-flash'>✗</button>");
          } else {
               $('ul').prepend("<div class='task-flash-remove center'><p class='flash-text'>Todo deleted</p><button class='remove-flash'>✗</button>");
               $clicked.parent('ul').prepend("<div class='task-flash-remove center'><p class='flash-text'>Todo deleted</p><button class='remove-flash'>✗</button>");
          }


          $('.task-flash-remove').delay(5000).fadeOut();

          $('.remove-flash').click(function(){
            removeParent($(this),'div');
          });

          if($('.completed li').length < 1){ $('.completed').hide() }

        });

        $('.check-mark').click(function(){
          $('.completed').show();

          var id = parseInt($('.check-mark').parent('li').attr('data-id'));

          $.ajax({
            url: '/tasks/' + id,
            type: "patch"
          });

          $(this).parents('li').appendTo('.completed-list');
          $(this).remove();

          var $taskComplete = $('.task-flash-complete');

          addFlash($taskComplete, 'task-flash-complete', $('.completed-list'), 'Task Complete');

          $('.remove-flash').click(function(){
            $(this).parent('div').remove()
          });

          $('.task-flash-complete').delay(5000).fadeOut();
        });
      }
    });

    $('li:nth-child(even)').addClass('gray-back');
    clearValue($input)

    addFlash($flash, "flash-success", $allTodos, 'Task Created');
    $('.flash-success').delay(5000).fadeOut();

    $('button.x').on('click', function(){
      removeParent($(this),'div');
    });
  });
});
