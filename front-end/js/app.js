angular
  .module('cause-app', ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor')
  })


  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "home.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "register.html"
      })
      .state('projects', {
        url: "/projects",
        templateUrl: "projects.html",
        controller: "ProjectsController as projects"
      })
      .state('projectsShow', {
        url: "/projects/show",
        templateUrl: "projectShow.html",
        controller: "ProjectsController as projects"
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "profile.html",
      })
      .state('themes', {
        url: "/themes",
        templateUrl: "themes.html",
        controller: "ThemesController as themes"
      })

    $urlRouterProvider.otherwise("/");
  }