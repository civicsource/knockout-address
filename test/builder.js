var ko = require("knockout");
var ViewModel = require("../builder");
var expect = require("chai").expect;

describe("Address Builder ViewModel", function () {


	var data = {
		address1: ko.observable("950 Gravier"),
		address2: ko.observable("1700"),
		city: ko.observable("New Orleans"),
		state: ko.observable("LA"),
		postalCode: ko.observable("70123"),
		country: ko.observable("United States"),
		instanceName: "addy-1"
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

		it("should have countries", function () {
			expect(model.countries().length > 0).to.equal(true);
		});

		it("should have states", function () {
			expect(model.states().length > 0).to.equal(true);
		});

	});

});