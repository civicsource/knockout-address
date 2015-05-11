define(["knockout", "jquery", "./viewer",
	"mock-ajax"],
	function (ko, $, ViewModel) {

		describe("Address Viewer ViewModel", function () {

			var data = {
				address1: ko.observable("950 Gravier"),
				address2: ko.observable("1700"),
				city: ko.observable("New Orleans"),
				state: ko.observable("LA"),
				postalCode: ko.observable("70123"),
				country: ko.observable("US"),
				instanceName: "addy-viewer-1"
			};

			var model;

			describe("When creating a new model with address data", function () {
				beforeEach(function () {
					model = new ViewModel({ address: data, instanceName: data.instanceName });
				}, this);

				it("should be populated with an address of observable values", function () {
					expect(model.address().address1()).toEqual("950 Gravier");
					expect(model.address().address2()).toEqual("1700");
					expect(model.address().city()).toEqual("New Orleans");
					expect(model.address().state()).toEqual("LA");
					expect(model.address().postalCode()).toEqual("70123");
					expect(model.address().country()).toEqual("US");
				}, this);

			});

			describe("When creating a new model and country is US", function () {
				beforeEach(function () {
					model = new ViewModel({ address: data, instanceName: data.instanceName });
				}, this);

				it("should not show country", function () {
					expect(model.showCountry()).toEqual(false);
				}, this);

			});

			describe("When creating a new model and country is not US", function () {
				beforeEach(function () {
					model = new ViewModel({ address: $.extend({}, data, { country: "BG" }), instanceName: data.instanceName });
				}, this);

				it("should show country", function () {
					expect(model.showCountry()).toEqual(true);
				}, this);

			});

			describe("When creating a new model with showCountryOnlyIfInternational is false and country is not US", function () {
				beforeEach(function () {
					model = new ViewModel({ address: $.extend({}, data, { country: "BG" }), instanceName: data.instanceName, displayOptions: { showCountryOnlyIfInternational: false } });
				}, this);

				it("should show country", function () {
					expect(model.showCountry()).toEqual(true);
				}, this);

			});

			describe("When creating a new model with showCountryOnlyIfInternational is false and country is US", function () {
				beforeEach(function () {
					model = new ViewModel({ address: data, instanceName: data.instanceName, displayOptions: { showCountryOnlyIfInternational: false } });
				}, this);

				it("should show country", function () {
					expect(model.showCountry()).toEqual(true);
				}, this);

			});

		});
	});