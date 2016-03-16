sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel", "sap/m/MessageToast"
], function(Controller, ODataModel, MessageToast) {
	"use strict";

	return Controller.extend("sap.training.controller.U_TwoWay", {

		onInit: function() {

			var sUrl = "/destinations/ODATA_ORG/V2/(S(5bvlqi3vwckp2c2pz5edfcgb))/OData/OData.svc/";
			var oModel = new ODataModel(sUrl);
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(oModel);
		},

		onProductChange: function(oEvent) {

			var oModel = this.getView().getModel();

			//Ändern eines neuen Produkts soll nur möglich sein, wenn gegebenenfalls vorgenommene Änderungen am 
			//aktuellen Produkt zuvor gespeichert oder verworfen werden
			if (oModel.hasPendingChanges()) {
				MessageToast.show("Please save or reset your pending changes!");
			} else {
				// get the binding context of the selected row
				var selectedRowContext = oEvent.getParameter("rowContext");
				var oForm = this.getView().byId("ProductForm");
				oForm.bindElement(selectedRowContext.getPath());
			}

			//Über das V2-Model können aber auch mehrere Entities simultan geändert werden. Um dies auf dem UI zu erlauben,
			//wird in der nachfolgenden Implementierung keine Abfrage auf pending Changes vorgenommen

			// get the binding context of the selected row
			// 		var selectedRowContext = oEvent.getParameter("rowContext");
			// 		var oForm = this.getView().byId("ProductForm");
			// 		oForm.bindElement(selectedRowContext.getPath());

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