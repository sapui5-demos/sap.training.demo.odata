sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel", "sap/m/MessageToast", "sap/ui/Device"
], function(Controller, ODataModel, MessageToast, Device) {
	"use strict";

	return Controller.extend("sap.training.controller.Accessing_Data_From_Model", {

		onInit: function() {

			var sUrl = "/destinations/ODATA_ORG/V2/OData/OData.svc/";
			var oModel = new ODataModel(sUrl);
			this.getView().setModel(oModel);

			// apply compact density if touch is not supported, the standard cozy design otherwise
			this.getView().addStyleClass(Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
		},

		onRowChange: function(oEvent) {

			// get the binding context of the selected row
			var selectedRowContext = oEvent.getParameter("rowContext");
			var sPath = selectedRowContext.getPath();

			var oModel = this.getView().getModel();

			var oEntity = oModel.getProperty(sPath);

			MessageToast.show("Id: " + oEntity.ID);
		}

	});

});