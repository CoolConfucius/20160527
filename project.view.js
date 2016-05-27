//(function() {
  //'use strict';

  sap.ui.jsview("project.project", {

    getControllerName: function() {
      return "project.project"; 
    }, 

    createContent: function(oController) {
      this.setDisplayBlock(true); 

      return new sap.m.App("project-app", {}); 
    }
  })
//})