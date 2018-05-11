sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel", "sap/ui/Device"
], function(Controller, ODataModel, Device) {
	"use strict";

	return Controller.extend("sap.training.controller.Creating_Entities", {

		onInit: function() {

			// apply compact density if touch is not supported, the standard cozy design otherwise
			this.getView().addStyleClass(Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");

			var sUrl = "/destinations/ODATA_ORG/V2/(S(5ewsfhze3qrhi4qifgvsxlu5))/OData/OData.svc/";
			var oModel = new ODataModel(sUrl);
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(oModel);

			oModel.attachMetadataLoaded(function() {
				var oContext = oModel.createEntry("/Products");
				var oSimpleForm = this.getView().byId("NewProductSF");
				oSimpleForm.setBindingContext(oContext);
			}, this);
		},

		onSaveProduct: function() {
			var oModel = this.getView().getModel();
			oModel.submitChanges();
		}

	});

});