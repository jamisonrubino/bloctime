(function() {
  function Tasks($firebaseArray) {
    var Tasks = {};
    var ref = firebase.database().ref();
    var num = firebase.database().ref('numTasks/value')
    var t = $firebaseArray(ref.child("Tasks"));
    var n = $firebaseArray(ref.child("numTasks"));
    console.log(t);
    console.log(n);

    console.log(num.value);
    // t.orderByChild('id')

    Tasks.newTask = function() {
      var task = $("#new-task-input");
      if (task.val().length > 0) {
        ref.child("Tasks").on("value", function(snapshot) {
          Tasks.num = snapshot.numChildren();
        });
        ref.child("Tasks").child(task.val()).set({ "value": task.val(), "id": id });
        task.val("");
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
