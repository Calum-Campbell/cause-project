angular
.module('cause-app')
.controller('ProjectsController', ProjectsController);

ProjectsController.$inject = ["Project", "User","$http", "CurrentUser", 'TokenService', 'Theme']
function ProjectsController(Project, User, $http, CurrentUser, TokenService, Theme){
  var self = this;

  self.all     = [];
  self.users   = [];
  self.user    = {};
  self.userProjects = [];
  self.project = {};
  self.themes = []

  self.getUsers = function(){
    User.query(function(data){
      return self.users = data.users;
    });
  }

  self.getProjects = function(){
    Project.query(function(data){
      return self.all = data;
    })
  }

  self.projectShow = function(project){
    Project.get({id : project._id}, function(data){
      self.project = data;
    })
  }

  self.alreadyAddedValues = function() {
    var themeArray = [];
    for (var i = 0; i < self.user.themes.length; i++) {
      themeArray.push(self.user.themes[i].name)
    };
    return themeArray;
  }

  self.themeFilter = function(item) {
    return !(self.alreadyAddedValues().indexOf(item.themeName) === -1);
  };


  self.getUser = function(){
    self.user = TokenService.decodeToken();
    User.get({id: self.user._id}, function(data){
      self.user = data.user
      self.userProjects = self.user.projects;
      self.userThemes = self.user.themes;
    })
  };


  self.checkProject = function(projectId){
    return self.userProjects.indexOf(projectId) === -1 ? false : true;
  }

// self.checkUserThemes = function(userThemes){
//  console.log(userThemes)
//  return true
// }

self.addProjectToUser = function(project){
  self.user = TokenService.decodeToken();
  var data = {
    projectId: project._id
  }
  User.addProject({id: self.user._id}, data, function(user){
    self.userProjects.push(project._id);
  });
}

self.removeProjectFromUser = function(project){
  self.user = TokenService.decodeToken();
  var data = {
    projectId: project._id
  }
  // console.log(data)
  User.removeProject({id: self.user._id}, data, function(user){
    var index = self.userProjects.indexOf(project._id);
    self.userProjects.splice(index, 1);
    // self.checkProject(project._id)
  });
}


// self.getLoopProjects(8992);
// self.getWebProject();


self.getProjects();
self.getUsers();
self.getUser();


}