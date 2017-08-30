(function() {
  function Tasks($firebaseArray) {
    var Tasks = {};
    var ref = firebase.database().ref();
    var t = $firebaseArray(ref.child("Tasks"));
    console.log(t);

    // t.orderByChild('id')

    Tasks.newTask = function() {
      var task = $("#new-task-input");
      if (task.val().length > 0) {
        ref.child("numTasks").once("value").then(function(snapshot) {
            var num = snapshot.child("value").val();
            ref.child("Tasks").child(task.val()).set({ "value": task.val(), "id": num+1 });
            ref.child("numTasks").set({ "value": num+1 });
            task.val("");
        });
      } else {
        alert("Error: You must enter the name of your todo item.");
      }
    };

    return {all: t, Tasks: Tasks};
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
 })();
