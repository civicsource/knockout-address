var ko = require("knockout");
var _uniqueId = require("lodash.uniqueid");
var Builder = require("./builder");
var Viewer = require("./viewer");
var Address = require("./address");

require("knockout.punches");
require("knockout-template?name=address-index!html!./templates/address-builder-index.html");
require("knockout-template?name=address-builder!html!./templates/address-builder.html");
require("knockout-template?name=address-viewer!html!./templates/address-viewer.html");

ko.punches.enableAll();

ko.bindingHandlers.addressBuilder = {
	init: function (element) {
		element.instanceName = _uniqueId("addy-build--");
		return { controlsDescendantBindings: true };
	},
	update: function (element, valueAccessor, allBindings) {
		var data = {};
		data.address = valueAccessor();
		data.instanceName = element.instanceName;
		data.displayOptions = ko.unwrap(allBindings.get("displayOptions"));
		data.validate = ko.unwrap(allBindings.get("validate"));
		var model = new Builder(data);
		ko.renderTemplate("address-index", model, null, element, "replaceChildren");
	}
};

ko.bindingHandlers.addressViewer = {
	init: function (element) {
		element.instanceName = _uniqueId("addy-view--");
		return { controlsDescendantBindings: true };
	},
	update: function (element, valueAccessor, allBindings) {
		var data = {};
		data.address = valueAccessor();
		data.instanceName = element.instanceName;
		data.displayOptions = ko.unwrap(allBindings.get("displayOptions"));
		var template = ko.unwrap(allBindings.get("template")) || "viewer";
		var model = new Viewer(data);
		ko.renderTemplate("address-" + template, model, null, element, "replaceChildren");
	}
};

ko.extenders.address = function (target, defaultValue) {
	var validate = (defaultValue && defaultValue.validate === true) || false;
	var result = ko.computed({
		read: function () {
			return ko.unwrap(target) instanceof Address ? target : target(new Address(ko.unwrap(target), null, null, validate));
		},
		write: function (value) {
			target(new Address(value, null, null, validate));
		}
	});

	result.formatted = ko.computed(function () {
		return !!target() && target().formatted ? target().formatted() : "";
	});

	return result;
};

ko.virtualElements.allowedBindings.addressBuilder = true;
ko.virtualElements.allowedBindings.addressViewer = true;