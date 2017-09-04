(function() {
  function Tasks($firebaseArray) {
    var Tasks = {};
    var ref = firebase.database().ref();
    var t = $firebaseArray(ref.child("Tasks"));
    console.log(t);

    Tasks.newTask = function() {
      var task = $("#new-task-input");
      if (task.val().length > 0) {
        ref.child("numTasks").once("value").then(function(snapshot) {
            var num = snapshot.child("value").val();
            ref.child("Tasks").child(task.val()).set({ "value": task.val(), "id": num+1, "timeSpent": 0 });
            ref.child("numTasks").set({ "value": num+1 });
            task.val("");
        });
      } else {
        alert("Error: You must enter the name of your todo item.");
      }
    };

    Tasks.deleteTask = function(task) {
      if (confirm('Are you sure you want to delete "' + task + '"?')) {
        if (Tasks.currentTask.value == task) {
          Tasks.currentTask = undefined;
          $("#current-task").addClass("hide");
          $("#current-task-time").addClass("hide");
        }
        ref.child("Tasks").child(task).remove();
      }

    };

    Tasks.unsetTask = function() {
      Tasks.currentTask = undefined;
      $("#current-task").addClass("hide");
      $("#current-task-time").addClass("hide");
    };

    Tasks.setTask = function(task) {
      if (Tasks.currentTask == task) {
        Tasks.unsetTask();
      } else {
        Tasks.currentTask = task;
        $("#current-task").removeClass("hide");
        $("#current-task").html("<h4>Current task:</h4><h2>" + Tasks.currentTask.value + "</h2>");
        $("#current-task-time").removeClass("hide");
      }
    };


    Tasks.updateTime = function(task) {
      ref.child("Tasks").child(task.value).set({ "value": task.value, "id": task.id, "timeSpent": task.timeSpent+1 });
    };

    return {all: t, Tasks: Tasks};
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
 })();
