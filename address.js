var ko = require("knockout");
var _find = require("lodash.find");
var _result = require("lodash.result");
var _remove = require("lodash.remove");
var _compact = require("lodash.compact");
var componentData = require("./data");

require("knockout.validation");

function Address(data, states, countries, validate) {

	data = ko.unwrap(data);

	if (!data) {
		data = {};
	}

	this.states = states || ko.observableArray(componentData.states);
	this.countries = countries || ko.observableArray(componentData.countries);
	this.shouldValidate = validate;
	//use the observables of the original object so it is a two way binding
	this.name1 = getObservable(data.name1);
	this.name2 = getObservable(data.name2);
	this.address1 = getObservable(data.address1);
	this.address2 = getObservable(data.address2);
	this.city = getObservable(data.city);
	this._state = getObservable(data.state, true);
	this.postalCode = getObservable(data.postalCode);
	this._country = getObservable(data.country, true);

	this.state = ko.pureComputed({
		read: function () {
			var value = getValue(this._state);
			if (!this.states || !this.states() || !value || value.length == 2)
				return value;

			return _result(_find(this.states(), { name: value }), "abbreviation");
		},
		write: function (value) {
			this._state(value);
		},
		owner: this
	});

	this.country = ko.pureComputed({
		read: function () {
			var value = getValue(this._country);
			if (!this.countries || !this.countries() || !value || value.length == 2)
				return value;

			return _result(_find(this.countries(), { name: value }), "code");
		},
		write: function (value) {
			this._country(value);
		},
		owner: this
	});
	
	if (!this.country()) {
		this.country("US");
	}

	if (this.shouldValidate) {
		this.address1.extend({ required: true });
		this.city.extend({ required: true });
		this.state.extend({ required: true });
		this.postalCode.extend({ required: true });
		this.country.extend({ required: true });
	}

	this.isValid = ko.pureComputed(function () {
		return this.shouldValidate ? this.address1.isValid() && this.city.isValid() && this.state.isValid() && this.postalCode.isValid() && this.country.isValid() : true;
	}, this);

	this.isUS = ko.pureComputed(function () {
		return this.country() && this.country().toLowerCase() == "us";
	}, this);

	function removeConsecutive(array) {
		_remove(array, function (item, idx, array) {
			return idx !== 0 && array[idx - 1] === item;
		});
		return array;
	}

	this.formatted = ko.pureComputed(function () {
		var value = this;
		var isUS = this.isUS();
		return removeConsecutive(_compact([
			ko.unwrap(value.name1), "\n",
			ko.unwrap(value.name2), "\n",
			ko.unwrap(value.address1), "\n",
			ko.unwrap(value.address2), "\n",
			ko.unwrap(value.city), " ",
			isUS ? ko.unwrap(value.state) : "", isUS ? " " : "",
			ko.unwrap(value.postalCode),
			isUS ? "" : "\n",
			isUS ? "" : ko.unwrap(value.country)
		]))
		.join("")
		.trim();
	}, this);
}

function getObservable(obj) {
	if (ko.isObservable(obj)) {
		return obj;
	} else {
		if (obj) {
			return ko.observable(obj);
		} else {
			return ko.observable("");
		}
	}
}

function getValue(data) {
	var val = ko.utils.unwrapObservable(data);
	return (ko.utils.unwrapObservable(val || {}).value) || val || "";
}

module.exports = Address;