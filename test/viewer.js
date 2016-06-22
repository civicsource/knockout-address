var ko = require("knockout");
var $extend = require("jquery-extend");
var ViewModel = require("../viewer");
var expect = require("chai").expect;

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
			expect(model.address().address1()).to.equal("950 Gravier");
			expect(model.address().address2()).to.equal("1700");
			expect(model.address().city()).to.equal("New Orleans");
			expect(model.address().state()).to.equal("LA");
			expect(model.address().postalCode()).to.equal("70123");
			expect(model.address().country()).to.equal("US");
		}, this);

	});

	describe("When creating a new model and country is US", function () {
		beforeEach(function () {
			model = new ViewModel({ address: data, instanceName: data.instanceName });
		}, this);

		it("should not show country", function () {
			expect(model.showCountry()).to.equal(false);
		}, this);

	});

	describe("When creating a new model and country is not US", function () {
		beforeEach(function () {
			model = new ViewModel({ address: $extend({}, data, { country: "BG" }), instanceName: data.instanceName });
		}, this);

		it("should show country", function () {
			expect(model.showCountry()).to.equal(true);
		}, this);

	});

	describe("When creating a new model with showCountryOnlyIfInternational is false and country is not US", function () {
		beforeEach(function () {
			model = new ViewModel({ address: $extend({}, data, { country: "BG" }), instanceName: data.instanceName, displayOptions: { showCountryOnlyIfInternational: false } });
		}, this);

		it("should show country", function () {
			expect(model.showCountry()).to.equal(true);
		}, this);

	});

	describe("When creating a new model with showCountryOnlyIfInternational is false and country is US", function () {
		beforeEach(function () {
			model = new ViewModel({ address: data, instanceName: data.instanceName, displayOptions: { showCountryOnlyIfInternational: false } });
		}, this);

		it("should show country", function () {
			expect(model.showCountry()).to.equal(true);
		}, this);

	});

});