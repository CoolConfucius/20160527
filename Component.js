jQuery.sap.declare("project.Component");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

jQuery.sap.registerModulePath("project", "./");
jQuery.sap.registerModulePath("project.views", "./views");

sap.ui.core.UIComponent.extend("project.Component", {
  metadata : {
    "name" : "project",
    "version" : "1.0", 
    "includes" : [],
    "dependencies" : {
      "libs" : ["sap.m"/*, "sap.viz.ui5"*/],
      "components" : []
    }, 

    // config : {
    //   resourceBundle: "project"
    // }

    routing: {
      config: {
        viewType : "JS",
        viewPath: "project.views",
        targetAggregation: "pages",
        targetControl: "project-app",
        clearTarget: false 
      }, 
      routes: [
        {
          pattern:"",
          name : "project_main",
          view : "project_main",
          viewType: "XML"
        }
      ]
    }
  },

    // init : function() {
    //   console.log("UNDER INIT ");
    //   //sap.ui.core.UIComponent.prototype.init.apply(this, arguments); 

    //   //this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter());
    //   //this.getRouter().initialize(); 

    // }, 

  createContent : function() {

    //var mConfig = this.getMetadata().getConfig(); 

    // var paginationModel = new sap.ui.model.json.JSONModel({
    //   isTouch : sap.ui.Device.support.touch, 
    //   isNoTouch : !sap.ui.Device.support.touch, 
    //   isPhone : jQuery.device.is.phone, 
    //   isNoPhone : !jQuery.device.is.phone, 
    //   listMode : (jQuery.device.is.phone) ? "None" : "singleSelectMaster", 
    //     listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
    // });
    // paginationModel.setDefaultBindingMode("OneWay"); 

    this.oMainView = sap.ui.view({
      type: sap.ui.core.mvc.ViewType.JS,
      id: "project-view",
      viewName: "project.project"
    });

    //this.oMainView.setModel(paginationModel, "device");
    this.getRouter().initialize();

    return this.oMainView;
  }

  //}
})
