var ko = require("knockout");
var Address = require("./address");
var componentData = require("./data");

function ViewModel(data) {

	data = data || {};

	this.displayOptions = initDisplayOptions(data);
	this.states = ko.observableArray(componentData.states);
	this.countries = ko.observableArray(componentData.countries);
	this.instanceName = data.instanceName;
	this.address = getObservableAddress(data.address, this.states, this.countries, !!data.validate);
	this.namePrefix = data.namePrefix || "";
}

function initDisplayOptions(data) {
	var options = data.displayOptions ? data.displayOptions : {};

	options.showCountry = ko.unwrap(options.showCountry) === false ? false : true;
	options.inputSize = "input-" + (ko.unwrap(options.inputSize) || "");

	return options;
}

function getObservableAddress(obj, states, countries, validate) {
	if (ko.isObservable(obj) && ko.unwrap(obj) instanceof Address) {
		return obj;
	} else {
		if (ko.isObservable(obj)) {
			obj(new Address(obj, states, countries, validate));
			return obj;
		} else {
			return ko.observable(new Address(obj, states, countries, validate));
		}
	}
}

module.exports = ViewModel;