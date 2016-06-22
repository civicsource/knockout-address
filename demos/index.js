var ko = require("knockout");
require("../knockout.address");

var viewModel = {
	address: ko.observable({ address1: "950 Gravier street", address2: "suite 1700", city: "New Orleans", state: "LA", postalCode: "70123", country: "United States" }),
	address2: ko.observable({ address1: "123 main street", city: "New York", state: "New York" }).extend({ address: true })
};

$(function() {
	ko.applyBindings(viewModel);
});