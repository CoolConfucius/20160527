jQuery.sap.require("sap.m.MessageBox"); 

sap.ui.jsview("project.views.project_main", {
  getControllerName: function() {
    return "project.views.project_main";
  }, 

  createContent: function(oController) {

    this.setHeight("100%"); 

    // var item = new sap.m.ObjectListItem({
    //   title: "Test"
    // });

  
    var name = new sap.m.Label({
      text: "{name}"
    })

    var email = new sap.m.Label({
      text: "{email}"
    });

    var company = new sap.m.Label({
      text: {
        path: "company",
        formatter: function(company) {
          return "Works at: " + company;
        }
      }
    });

    var itemContainer = new sap.m.VBox({
      items: [name, email, company]
    });

    var item = new sap.m.CustomListItem({
      content: [itemContainer],
      type: 'Active'
    });

    var list = new sap.m.List({
      updateFinished: function(e) {
        oController.selectFirstItem(e);
      }
    }); 
    //list.setModel(oController.olistModel);
    list.bindAggregation("items", "/", item);
    oController.list = list; 

    var label = new sap.m.Label({
      text: "Label"
    }) 

    var button = new sap.m.Button({
      icon: "sap-icon://home",
      text: "Button"
    })

    var bar = new sap.m.Bar({
      contentLeft: [label],
      contentRight: [button]
    })


    var table = new sap.m.Table({
      columns: [
        new sap.m.Column({
          header: new sap.m.Label({
            text: "Name"
          })
        }),
        new sap.m.Column({
          header: new sap.m.Label({
            text: "Email"
          })
        }),
        new sap.m.Column({
          header: new sap.m.Label({
            text: "Age"
          })
        }),
        new sap.m.Column({
          header: new sap.m.Label({
            text: "Eye Color"
          })
        })
        ]
    });

    var oCellTemplate = new sap.m.ColumnListItem({
      cells: [
        new sap.m.Label({
          text: "{name}"
        }),
        new sap.m.Label({
          text: "{email}"
        }),
        new sap.m.Label({
          text: "{age}"
        }),
        new sap.m.Label({
          text: "{eyeColor}"
        })
      ]
    });
    oController.oCellTemplate = oCellTemplate;


    table.bindAggregation("items", "/", oCellTemplate);
    oController.table = table; 

    var splitapp = new sap.m.SplitApp({});
    
    var masterpage = new sap.m.Page({
      content: [list]
    })
    splitapp.addMasterPage(masterpage);

    var detailpage = new sap.m.Page({
      content: [bar, table]
    })
    oController.detailpage = detailpage;
    splitapp.addDetailPage(detailpage); 

    return splitapp; 
  }

})