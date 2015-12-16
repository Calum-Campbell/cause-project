angular
.module('cause-app')
.controller('ThemesController', ThemesController);

ThemesController.$inject = ["Theme","$http", "User", "CurrentUser", 'TokenService']

function ThemesController(Theme, $http, User, CurrentUser, TokenService){
  var self = this;

  self.all     = [];
  self.themes   = [];
  self.user    = {};
  self.theme    = {};
  self.userThemes = [];



  self.getUsers = function(){
   User.query(function(data){
    return self.users = data.users;
  });
  }

  self.getThemes = function(){

    Theme.query(function(data){
      return self.all = data;
    })
  }

  self.getUser = function(){
    self.user = TokenService.decodeToken();
    User.get({id: self.user._id}, function(data){
      console.log("GETTING USERS AGAIN")
      self.user = data.user
      self.userThemes = self.user.themes;
    })
  };

  self.checkTheme = function(themeId){
    // self.getUser();
    console.log(self.userThemes)
    for (var i = 0; i < self.userThemes.length; i++) {

      if(self.userThemes[i]._id === themeId) return true
    };
    return false
  };

  self.addThemeToUser = function(theme){
    // self.user = TokenService.decodeToken();
    var data = {
      themeId: theme._id
    }
    User.addTheme({id: self.user._id}, data, function(user){
      self.userThemes.push(theme);
      self.checkTheme(theme._id);
    });
  }

  self.removeThemeFromUser = function(theme){
    self.user = TokenService.decodeToken();
    var data = {
      themeId: theme._id
    }
    User.removeTheme({id: self.user._id}, data, function(user){
      var index = self.userThemes.indexOf(theme._id);
      self.userThemes.splice(index, 1);
    });
  }

  self.getUsers();
  self.getUser();
  self.getThemes();

}