sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel", "sap/m/MessageToast", "sap/ui/Device"
], function(Controller, ODataModel, MessageToast, Device) {
	"use strict";

	return Controller.extend("sap.training.controller.U_TwoWay", {

		onInit: function() {
			var sUrl = "/destinations/ODATA_ORG/V2/(S(5bvlqi3vwckp2c2pz5edfcgb))/OData/OData.svc/";
			var oModel = new ODataModel(sUrl);
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(oModel);
		},

		onSaveProduct: function() {

			var oModel = this.getView().getModel();

			oModel.submitChanges({
				success: function(oData) {
					MessageToast.show("Changes are saved!");
				},
				error: function(oError) {
					MessageToast.show(oError.message);
				}
			});
		},

		onResetProduct: function() {
			var oModel = this.getView().getModel();
			oModel.resetChanges();
		}

	});

});