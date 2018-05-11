sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel", "sap/ui/Device"
], function(Controller, ODataModel, Device) {
	"use strict";

	return Controller.extend("sap.training.controller.Binding_Specific_Parameters", {

		onInit: function() {
			var sUrl = "/destinations/ODATA_ORG/V2/OData/OData.svc/";
			var oModel = new ODataModel(sUrl);
			this.getView().setModel(oModel);

			// apply compact density if touch is not supported, the standard cozy design otherwise
			this.getView().addStyleClass(Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
		}

	});

});