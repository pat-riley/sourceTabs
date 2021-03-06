angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ProfileCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



.controller('loginCtrl', function($scope, auth, $state, $location, $http, API, store) {
  // SETUP

   $scope.loginForm = {
      email: "",
      password: ""
   };

   $scope.signupForm = {
      email: "",
      username: "",
      password: ""
   };


  // LOGIN ============================================

  $scope.login = function() {

    auth.signin({
      connection: 'Username-Password-Authentication',
      username:   $scope.loginForm.email,
      password:   $scope.loginForm.password
    }, onLoginSuccess, onLoginFailed);

  };


  function onLoginSuccess(profile, token) {
    console.log("Login Success!");
    // Store these things in local storage
    store.set('profile', profile);
    store.set('token', token);
    setCurrentUser(profile);
    $state.go('tabs.home');
  }

  function onLoginFailed() {
    console.log("Your login attempt failed");
    alert('Login failed');
  }

  // the goal of this function is to set the mongoID in the localstorage
  // It takes profile as a parameter
  function setCurrentUser(profile) {

    var id = profile.user_id;

    API.getAuth(id)
      .success(function (user, status, headers, config) {
        // need to store it here without strings
        window.localStorage['SourceID'] = user._id;
        // store.set('SourceID', user._id);
      })
      .error(function (user, status, headers, config) {
        console.log("woops")
      });

  };





  // SIGNUP ============================================
  $scope.signup = function () {

    var email       = $scope.signupForm.email
    var password    = $scope.signupForm.password
    var username    = $scope.signupForm.username

    var newUser = {
      email: email,
      password: password,
      username: username
    };

    // Creates a User in Auth0 Database
    $http({
      method: 'POST', 
      url: 'http://localhost:8080/signup',
      data: {
        email:      newUser.email,
        username:   newUser.username,
        password:   newUser.password
      }
    })


    .success(function (data, status, headers, config, profile) {
      if (status === 200) {
        auth.signin({
          connection: 'Username-Password-Authentication',
          username:   newUser.email,
          password:   newUser.password
        }, onSignupSuccess, onSignupFailed);

      }
    })
    .error(function (data, status, headers, config) {
      alert('Error creating account for user');
    });
  };

  function onSignupSuccess(profile, token, data) {
    console.log("Successfully logged in with your new credentials!");
    store.set('profile', profile);
    store.set('token', token);
    setCurrentUser(profile);
    $state.go('tabs.home');
    createUser(profile);
  }

  function onSignupFailed() {
    console.log("your signup failed bro");
    alert('Login failed');
  }

  // This adds a user to the database
  function createUser(profile) {
    var email       = $scope.signupForm.email
    var username    = $scope.signupForm.username
    var authID      = profile.user_id;
    var gravatarURL = profile.picture;
    console.log(gravatarURL);

    var user = {
      email: email,
      username: username,
      authID: authID,
      gravatarURL: gravatarURL
    };

    // We know this works
    console.log(user);

    API.postUser(user)
      .success(function (article, status, headers, config) {
        console.log("user created sucessfully")
      })
      .error(function (article, status, headers, config) {
        console.log("Something went wrong when posting user to database")
      });

  };





});