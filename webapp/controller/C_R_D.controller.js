sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/Device"
], function(Controller, ODataModel, JSONModel, MessageToast, Device) {
	"use strict";

	return Controller.extend("sap.training.controller.C_R_D", {

		onInit: function() {
			var sUrl = "/destinations/ODATA_ORG/V2/(S(3yfvnc35gesha001zxni5fij))/OData/OData.svc/";
			var oModel = new ODataModel(sUrl);
			this.getView().setModel(oModel);

			this.getView().setModel(new JSONModel(), "newProduct");
		},

		onCreateProduct: function() {
			var oNewProduct = this.getView().getModel("newProduct").getData();

			//Values for property 'Price' of type 'decimal' must be quoted in the payload
			oNewProduct.Price = oNewProduct.Price + "";

			// Send OData Create request
			var oModel = this.getView().getModel();
			oModel.create("/Products", oNewProduct, {
				success: function(oData, response) {
					MessageToast.show("Product created");
				},
				error: function(oError) {
					MessageToast.show(oError.message);
				}
			});

		},

		onDeleteProduct: function(oEvent) {
			var productId = oEvent.getSource().data("productId");

			// Send OData Delete request
			var oModel = this.getView().getModel();
			oModel.remove("/Products(" + productId + ")", {
				success: function(oData, response) {
					MessageToast.show("Product deleted");
				},
				error: function(oError) {
					MessageToast.show(oError.message);
				}
			});

		},

		onGetHighestId: function() {

			this.getView().getModel().read("/Products", {
				urlParameters: {
					"$top": 1,
					"$orderby": "ID desc",
					"$select": "ID"
				},
				success: function(oData, response) {
					MessageToast.show("Highest Id: " + oData.results[0].ID);
				},
				error: function(oError) {
					MessageToast.show(oError.message);
				}
			});
		}

	});

});