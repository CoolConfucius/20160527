sap.ui.controller("project.views.project_main", {
  
  //bus : sap.ui.getCore().getEventBus(),

  onInit: function() {
    // window.onbeforeunload = function(){
    //   // return "Back button is not available!";
    //   window.history.forward(1);
    // }
    document.onmousedown=disableclick;
    status="Right Click Disabled";
    function disableclick(event)
    {
      if(event.button==2)
       {
         alert(status);
         return false;    
       }
    }
    this.app = sap.ui.getCore().byId("project-app");
    // this.list.attachItemPress(this.listSelection, this);
    this.byId("list").attachItemPress(this.listSelection, this);
    this.fetchdata(); 
    this.makeChart();
  },

  // _handleRouteMatched:function(evt){
  //   if ("project_main") {};
  // }

  onAfterRendering: function() {

  }, 

  dataarray:[],
  tablearray:[],
  olistModel: new sap.ui.model.json.JSONModel(),
  otableModel: new sap.ui.model.json.JSONModel(),

  fetchdata: function() {
    var that = this; 
    var url = "http://localhost:3000/example.json"
    $.ajax({
      url: url,
      type: "GET",
      cache: false, 
      dataType: "json",
      success: function(data) {
        
        that.dataarray = data; 
        console.log(that.dataarray);
        
  
        that.olistModel.setData(that.dataarray);
        // that.list.setModel(that.olistModel);
        that.byId("list").setModel(that.olistModel);
        // that.setModel(that.olistModel, "list");
        // that.list.setModel(that.olistModel, "list");

      }, 
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        sap.m.MessageToast.show("Error: "+XMLHttpRequest.responseText);
      }
    })
  },

  display: function() {
    this.contentTable.removeAllColumns(); 
 
    for (var i = 0; i < obj[currentpage.toString()].length; i++) {

      var $item = new sap.m.Column({
        hAlign : "Center",
        header : new sap.m.Label({
          text: obj[currentpage.toString()][i].toString()
        })
      });

      this.contentTable.addColumn($item); 
    };
  },

  selectFirstItem: function(event) {
    // var item = this.list.getItems()[0];
    var item = this.byId("list").getItems()[0];
    // this.list.setSelectedItem(item, true);
    this.byId("list").setSelectedItem(item, true);
    this.setTableArray(item);
    
  },

  listSelection: function(event) {
    var item = event.getParameter("listItem");
    // console.log("item", item);
    // console.log("event", event);
    console.log("this", this);
    this.setTableArray(item);
  },

  setTableArray: function(item) {
    this.tablearray = [];
    var context = item.getBindingContext();
    this.tablearray.push(context.getObject())
    this.otableModel.setData(this.tablearray);
    // this.table.setModel(this.otableModel);
    this.byId("table").setModel(this.otableModel);
  }, 

  makeChart: function() {
    var oVizFrame = this.getView().byId("idcolumn");
    var oModel = new sap.ui.model.json.JSONModel();
    var data = {
        'Population' : [
                {"Year": "2010","Value": "158626687"},
                {"Year": "2011","Value": "531160986"},
                {"Year": "2012","Value": "915105168"},
                {"Year": "2013","Value": "1093786762"},
                {"Year": "2014","Value": "1274018495"},
               ]};
    oModel.setData(data);

    var oDataset = new sap.viz.ui5.data.FlattenedDataset({
      dimensions : [{
        name : 'Year',
        value : "{Year}"}],
                     
      measures : [{
        name : 'Population',
        value : '{Value}'} ],
                   
      data : {
        path : "/Population"
      }
    });   
    oVizFrame.setDataset(oDataset);
    oVizFrame.setModel(oModel); 
    oVizFrame.setVizType('column');

    oVizFrame.setVizProperties({
            plotArea: {
              colorPalette : d3.scale.category20().range()
                }});
    
    var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
          'uid': "valueAxis",
          'type': "Measure",
          'values': ["Population"]
        }), 
        feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
          'uid': "categoryAxis",
          'type': "Dimension",
          'values': ["Year"]
        });
    oVizFrame.addFeed(feedValueAxis);
    oVizFrame.addFeed(feedCategoryAxis);  
  }
})