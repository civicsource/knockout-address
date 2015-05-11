define(["knockout", "lodash", "./builder", "./viewer", "./address",
	"knockout.punches",
	"template!./templates/address-builder-index.html!address-index",
	"template!./templates/address-builder.html!address-builder",
	"template!./templates/address-viewer.html!address-viewer",
],
	function (ko, _, Builder, Viewer, Address) {

		ko.punches.enableAll();
		ko.punches.interpolationMarkup.enable();
		ko.punches.attributeInterpolationMarkup.enable();

		var instanceName;

		ko.bindingHandlers.addressBuilder = {
			init: function (element) {
				instanceName = _.uniqueId("addy-build--");
				return { controlsDescendantBindings: true };
			},
			update: function (element, valueAccessor, allBindings) {
				var data = {};
				data.address = valueAccessor();
				data.instanceName = instanceName;
				data.displayOptions = ko.unwrap(allBindings.get('displayOptions'));
				data.validate = ko.unwrap(allBindings.get('validate'));
				var model = new Builder(data);
				ko.renderTemplate("address-index", model, null, element, "replaceChildren");
			}
		};

		ko.bindingHandlers.addressViewer = {
			init: function (element) {
				instanceName = _.uniqueId("addy-view--");
				return { controlsDescendantBindings: true };
			},
			update: function (element, valueAccessor, allBindings) {
				var data = {};
				data.address = valueAccessor();
				data.instanceName = instanceName;
				data.displayOptions = ko.unwrap(allBindings.get('displayOptions'));
				var template = ko.unwrap(allBindings.get('template')) || "viewer";
				var model = new Viewer(data);
				ko.renderTemplate("address-" + template, model, null, element, "replaceChildren");
			}
		};

		ko.extenders.address = function (target, defaultValue) {
			var validate = (defaultValue && defaultValue.validate === true) || false;
			var result = ko.computed({
				read: function () {
					return ko.unwrap(target) instanceof Address ? target : target(new Address({}, null, null, validate));
				},
				write: function (value) {
					target(new Address(value, null, null, validate));
				}
			});

			result.formatted = ko.computed(function () {
				return !!target() && target().formatted ? target().formatted() : '';
			});

			return result;
		};

		ko.virtualElements.allowedBindings.addressBuilder = true;
		ko.virtualElements.allowedBindings.addressViewer = true;
	});