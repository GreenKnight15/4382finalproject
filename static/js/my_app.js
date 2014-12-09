//declaring module myApp that will be used in angular templates
var app = angular.module('myApp', []);

 app.controller('myController', ['$scope', '$http',

//Brings in all the data from user and pushes it to the $scope
  function($scope, $http){
  $http.get('/user/profile')
    .success(function(data,status,headers,config){

        $scope.users = data;
        $scope.user = data;
        $scope.error = "";
    })
    .error(function(data,status,headers,config){
        $scope.user = {};
        $scope.error = data;
        alert("error");
    });
 }]);

function CommentObj($http) {
    this.getComment = function(commentId, callback) {
        $http.get('/comments/get', {
                params: {
                    commentId: commentId
                }
            })
            .success(function(data, status, headers, config) {
                callback(null, data);
            })
            .error(function(data, status, headers, config) {
                callback(data, {});
            });
    };
    this.addComment = function(rootCommentId, parentId,
        newComment, callback) {
        $http.post('/comments/add', {
                rootCommentId: rootCommentId,
                parentCommentId: parentId,
                newComment: newComment
            })
            .success(function(data, status, headers, config) {
                callback(null, data);
            })
            .error(function(data, status, headers, config) {});
    };
}


app.service('commentSrv', ['$http', CommentObj]);

//controller that is used for comments that dont work
app.controller('photoController', ['$scope', '$http', 'commentSrv',
    function($scope, $http, commentSrv) {
        $http.get('/')
            .success(function(data, status, headers, config) {
                $scope.photos = data;
                $scope.photo = $scope.photos[0];
                $scope.loadComments();
            })
            .error(function(data, status, headers, config) {
                $scope.photos = [];
            });
        $scope.loadComments = function() {
            commentSrv.getComment($scope.photo.commentId,
                function(err, comment) {
                    if (err) {
                        $scope.commentThread = {};
                    }
                    else {
                        $scope.commentThread = comment;
                    }
                });
        };
        $scope.addReply = function(parentCommentId, subject, body) {
            var newComment = {
                subject: subject,
                body: body
            };
            commentSrv.addComment($scope.commentThread._id,
                parentCommentId,
                newComment,
                function(err, comment) {
                    $scope.loadComments();
                });
        };
        $scope.setPhoto = function(photoId) {
            $http.get('/photo', {
                    params: {
                        photoId: photoId
                    }
                })
                .success(function(data, status, headers, config) {
                    $scope.photo = data;
                    $scope.loadComments();
                })
                .error(function(data, status, headers, config) {
                    $scope.photo = {};
                });
        };
    }
]);

//unneeds contoller chapter 27
app.controller('pageController', ['$scope', '$http', 'commentSrv',
    function($scope, $http, commentSrv) {
        $http.get('/', {
                params: {
                    pageName: "Photos Page"
                }
            })
            .success(function(data, status, headers, config) {
                $scope.page = data;
                $scope.loadComments();
            })
            .error(function(data, status, headers, config) {
                $scope.Page = {};
            });
        $scope.addReply = function(parentCommentId, subject, body) {
            var newComment = {
                subject: subject,
                body: body
            };
            commentSrv.addComment($scope.commentThread._id,
                parentCommentId,
                newComment,
                function(err, comment) {
                    $scope.loadComments();
                });
        };
        $scope.loadComments = function() {
            commentSrv.getComment($scope.page.commentId,
                function(err, comment) {
                    if (err) {
                        $scope.commentThread = {};
                    }
                    else {
                        $scope.commentThread = comment;
                    }
                });
        };
    }
]);


app.controller('studController', ['$scope', '$http',
//Gets all of the data from users and puts it into $scope
  function($scope, $http){
  $http.get('/studlist')
    .success(function(data,status,headers,config){

        $scope.users = data;
        //$scope.user = $scope.users[0];
        $scope.error = "";
    })
    .error(function(data,status,headers,config){
        $scope.users = {};
        $scope.error = data;
        alert("error");
    });
 }]);