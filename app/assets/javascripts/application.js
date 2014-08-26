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


function TodoApp(container, flash) {
  this.flash = flash;
  this.container = container;

  // boot the todo app here

  this.flash.notice("hello");
}


Object.create();



$(document).ready(function() {
  var flash = new Flash($('.flash'));
  var todoApp = new TodoApp($('.todo-app', flash));

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

  var addFlash = function(flashDOM, flashClass, addDOM){
    if(flashDOM.size() > 0){
      flashDOM.remove();
      addDOM.prepend("<div class=" + flashClass + "><p class='flash-text'>Todo created</p><button class='x'>✗</button>");
    } else {
      addDOM.prepend("<div class=" + flashClass + "><p class='flash-text'>Todo created</p><button class='x'>✗</button>");
    }
  };

  $createTodo.click(function(e){
    e.preventDefault();

    $.ajax({
      url: "/tasks",
      type: "post",
      data: {"description": $input.val()},
      success: function(data){
        var $id = data.id;
        var $descrip = data.description;
        $allTodos.append(newTask($id, $descrip));
      }
    });

    $('li:nth-child(even)').addClass('gray-back');
    clearValue($input)

    addFlash($flash, "flash-success", $allTodos);

    $('button.x').on('click', function(){
      removeParent($(this),'div');
    });
  });

  $('button').click(function(){

  });

  $('.check-mark').click(function(){
    $('.completed').show();
    $(this).parents('li').appendTo('.completed-list');
    $(this).remove();

    var $taskComplete = $('.task-flash-complete');

    if($taskComplete.size() > 0){
      $taskComplete.remove();
      $('.completed-list').prepend("<div class='task-flash-complete center'><p class='flash-text'>Todo completed</p><button class='remove-flash'>✗</button>");
    } else {
      $('.completed-list').prepend("<div class='task-flash-complete center'><p class='flash-text'>Todo completed</p><button class='remove-flash'>✗</button>");
    }

    $('.remove-flash').click(function(){
      $(this).parent('div').remove()
    });

    $('.task-flash-complete').delay(5000).fadeOut();


  });

  $('button.task-x').click(function(){

    debugger;

//      var $id = $(this).parent('li').attr('data-id');
//      console.log($id);

    var $clicked = $(this);

//      $.ajax({
//        url: "/tasks",
//        type: "post",
//        data: {},
//        success: function (data) {
//
//        }
//      });

    $(this).parent('li').remove();

    var $taskFlash = $('.task-flash-remove');

    addFlash($taskFlash, 'task-flash-remove', $clicked.parent('ul') );


    $('.task-flash-remove').delay(5000).fadeOut();

    $('.remove-flash').click(function(){
      removeParent($(this),'div');
    });

    if($('.completed li').length < 1){ $('.completed').hide() }

  });


});
