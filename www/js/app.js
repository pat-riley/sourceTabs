// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers', 
  'starter.services'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Set up an abstract state for the login directive
  .state('landing', {
      url: '/landing',
      templateUrl: 'templates/landing.html',
      controller: 'loginCtrl'
  })
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
       controller: 'loginCtrl'
  })
  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'loginCtrl'
  })


  // setup an abstract state for the tabs directive
  .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tabs.home', {
    url: '/home',
    views: {
      'home-tab': {
        templateUrl: 'templates/home.html'
      }
    }
  })
  .state('tabs.explore', {
    url: '/explore',
    views: {
      'explore-tab': {
        templateUrl: 'templates/explore.html'
      }
    }
  })
  .state('tabs.notifications', {
    url: '/notifications',
    views: {
      'notifications-tab': {
        templateUrl: 'templates/notifications.html'
      }
    }
  })
  .state('tabs.profile', {
    url: '/profile',
    views: {
      'profile-tab': {
        templateUrl: 'templates/profile.html'
      }
    }
  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');






});
