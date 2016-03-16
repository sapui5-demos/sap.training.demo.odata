sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, ODataModel, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("sap.training.controller.U_OneWay", {

		onInit: function() {

			var sUrl = "/destinations/ODATA_ORG/V2/(S(5bvlqi3vwckp2c2pz5edfcgb))/OData/OData.svc/";
			var oModel = new ODataModel(sUrl);
			this.getView().setModel(oModel);

			this.getView().setModel(new JSONModel(), "updatedProductData");
		},

		onUpdateProduct: function() {

			var oUpdatedProductData = this.getView().getModel("updatedProductData").getData();

			//Values for property 'Price' of type 'decimal' must be quoted in the payload
			oUpdatedProductData.Price = oUpdatedProductData.Price + "";

			// Send OData Update request
			var oModel = this.getView().getModel();

			oModel.update("/Products(" + oUpdatedProductData.ID + ")", oUpdatedProductData, {
				success: function() {
					MessageToast.show("Product updated");
				},
				error: function(oError) {
					MessageToast.show(oError.message);
				}
			});

		}
	});

});