//Define an angular module for our app
var app = angular.module('myApp', []);

app.controller('tasksController', function($scope, $http) {
    getTask(); // Load all available tasks
    $scope.tasks = [];
    $scope.task = {
        id: '',
        status: '',
        task: ''
    }

    $scope.addTask = function (task) {
        $http.post("app/ajax/addTask.php?task="+task).success(function(data){
            getTask();
            $scope.taskInput = "";
        });
    };

    $scope.deleteTask = function (task) {
        if(confirm("¿Estás seguro que desea eliminar esta tarea?")){
            $http.post("app/ajax/deleteTask.php?taskID="+task).success(function(data){
                getTask();
            });
        }
    };

    $scope.toggleStatus = function(item, status, task) {
        if(status=='2'){status='0';}else{status='2';}
        $http.post("app/ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
            getTask();
        });
    };

    function getTask(){
        $http.post("app/ajax/getTask.php").success(function(data){
            $scope.tasks = data;
        });
    };
});
