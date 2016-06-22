var ko = require("knockout");
var Address = require("../address");
var $extend = require("jquery-extend");
var Model = require("../builder"	);
var expect = require("chai").expect;

describe("Address Builder Address", function () {

	var viewModel = new Model({});
	var states = viewModel.states;
	var countries = viewModel.countries;

	var data1 = {
		address1: "950 Gravier",
		address2: "1700",
		city: "New Orleans",
		state: "LA",
		postalCode: "70123",
		country: "CA"
	};

	var data2 = {
		address1: ko.observable("950 Gravier"),
		address2: ko.observable("1700"),
		city: ko.observable("New Orleans"),
		state: ko.observable("LA"),
		postalCode: ko.observable("70123"),
		country: ko.observable("CA")
	};

	var data3 = {
		address1: ko.observable("950 Gravier"),
		address2: ko.observable("1700"),
		city: ko.observable("New Orleans"),
		state: ko.observable("LA"),
		postalCode: ko.observable("70123"),
		country: ko.observable("")
	};

	var model;

	describe("When creating a new model with address data of non observable values", function () {
		beforeEach(function () {
			model = new Address(data1);
		}, this);

		it("should be populated with an address of observable values", function () {
			expect(model.address1()).to.equal("950 Gravier");
			expect(model.address2()).to.equal("1700");
			expect(model.city()).to.equal("New Orleans");
			expect(model.state()).to.equal("LA");
			expect(model.postalCode()).to.equal("70123");
			expect(model.country()).to.equal("CA");
		}, this);

	});

	describe("When creating a new model with address data of observable values", function () {
		beforeEach(function () {
			model = new Address(data2);
		}, this);

		it("should be populated with an address of observable values", function () {
			expect(model.address1()).to.equal("950 Gravier");
			expect(model.address2()).to.equal("1700");
			expect(model.city()).to.equal("New Orleans");
			expect(model.state()).to.equal("LA");
			expect(model.postalCode()).to.equal("70123");
			expect(model.country()).to.equal("CA");
		}, this);

	});

	describe("When creating a new address with null or undefined data", function () {
		beforeEach(function () {
			model = new Address(null);
		}, this);

		it("should be populated with an address of observables with empty strings", function () {
			expect(model.address1()).to.equal("");
			expect(model.address2()).to.equal("");
			expect(model.city()).to.equal("");
			expect(model.state()).to.equal("");
			expect(model.postalCode()).to.equal("");
		}, this);

		it("should default country to United States", function () {
			expect(model.country()).to.equal("US");
		}, this);

	});

	describe("When creating a new address with no country", function () {
		beforeEach(function () {
			model = new Address(data3);
		}, this);

		it("should default country to United States", function () {
			expect(model.country()).to.equal("US");
		}, this);

	});

	describe("When creating a new address w/ state and country as a description instead of a code", function () {
		beforeEach(function () {
			model = new Address($extend({}, data1, { state: "Louisiana", country: "United States" }), states, countries);
		}, this);

		describe("", function () {
			behavesLikeShouldHaveStateAndCountry("LA", "US");
		});

	});

	describe("When creating a new address a state and country as objects", function () {
		beforeEach(function () {
			model = new Address($extend({}, data1, { state: { value: "WA", description: "Washington" }, country: { value: "US", description: "United States" } }), states, countries);
		}, this);

		describe("", function () {
			behavesLikeShouldHaveStateAndCountry("WA", "US");
		});

	});

	describe("When creating a new address a state and country as objects with both values as description", function () {
		beforeEach(function () {
			model = new Address($extend({}, data1, { state: { value: "Illinois", description: "Illinois" }, country: { value: "United States", description: "United States" } }), states, countries);
		}, this);

		describe("", function () {
			behavesLikeShouldHaveStateAndCountry("IL", "US");
		});

	});

	function behavesLikeShouldHaveStateAndCountry(state, country, continueWith) {
		describe("behaves like has proper state and country", function () {

			it("should have a 2 letter state", function () {
				expect(model.state().length).to.equal(2);
				expect(model.state()).to.equal(state);
			});

			it("should have a 2 letter country", function () {
				expect(model.country().length).to.equal(2);
				expect(model.country()).to.equal(country);
			});

			describe("continue with", function () {
				if (typeof continueWith === "function")
					continueWith();
			});
		});
	}

	describe("When creating a new address with validation enabled and every property populated", function () {
		beforeEach(function () {
			model = new Address(data1, states, countries, true);
		}, this);

		it("should be valid", function () {
			expect(model.isValid()).to.equal(true);
		});

	});

	describe("When creating a new address with validation disabled and every property populated", function () {
		beforeEach(function () {
			model = new Address(data1, states, countries);
		}, this);

		it("should be valid", function () {
			expect(model.isValid()).to.equal(true);
		});

	});

	describe("When creating a new address with validation disabled and required properties are missing values", function () {
		beforeEach(function () {
			model = new Address($extend({}, data1, { address1: "" }), states, countries);
		}, this);

		it("should be valid", function () {
			expect(model.isValid()).to.equal(true);
		});

	});

	describe("When creating a new address with validation enabled and required properties are missing values", function () {
		beforeEach(function () {
			model = new Address($extend({}, data1, { address1: "" }), states, countries, true);
		}, this);

		it("should not be valid", function () {
			expect(model.isValid()).to.equal(false);
		});

	});

});