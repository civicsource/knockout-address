
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["knockout", "lodash", "./builder", "./viewer", "./address",
				"knockout.punches",
				"template!./templates/address-builder-index.html!address-index",
				"template!./templates/address-builder.html!address-builder",
				"template!./templates/address-viewer.html!address-viewer",
], factory);
    } else {
        // Browser globals
        factory(ko, $, Builder, Viewer, Address);
    }
}(this, function(ko, $, Builder, Viewer, Address) {
    ko.punches.enableAll();
		ko.punches.interpolationMarkup.enable();
		ko.punches.attributeInterpolationMarkup.enable();

		ko.bindingHandlers.addressBuilder = {
			init: function (element) {
				element.instanceName = _.uniqueId("addy-build--");
				return { controlsDescendantBindings: true };
			},
			update: function (element, valueAccessor, allBindings) {
				var data = {};
				data.address = valueAccessor();
				data.instanceName = element.instanceName;
				data.displayOptions = ko.unwrap(allBindings.get('displayOptions'));
				data.validate = ko.unwrap(allBindings.get('validate'));
				var model = new Builder(data);
				ko.renderTemplate("address-index", model, null, element, "replaceChildren");
			}
		};

		ko.bindingHandlers.addressViewer = {
			init: function (element) {
				element.instanceName = _.uniqueId("addy-view--");
				return { controlsDescendantBindings: true };
			},
			update: function (element, valueAccessor, allBindings) {
				var data = {};
				data.address = valueAccessor();
				data.instanceName = element.instanceName;
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
					return ko.unwrap(target) instanceof Address ? target : target(new Address(ko.unwrap(target), null, null, validate));
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
}));
