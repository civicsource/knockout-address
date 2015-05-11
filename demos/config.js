requirejs.config({

	baseUrl: './',

	paths: {
		bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
		jquery: "../bower_components/jquery/dist/jquery",
		knockout: '../bower_components/knockout/dist/knockout',
		'knockout.punches': '../bower_components/knockout.punches/knockout.punches',
		'knockout.validation': '../bower_components/Knockout.Validation/Dist/knockout.validation',
		lodash: '../bower_components/lodash/lodash',
		stringTemplateEngine: '../bower_components/knockout-require-templates/stringTemplateEngine',
		template: '../bower_components/knockout-require-templates/template',
		text: '../bower_components/requirejs-text/text',
	},
	shim:
		{
			bootstrap: {
				deps: ['jquery'],
				exports: 'Bootstrap'
			},
			knockout: {
				exports: 'ko'
			}
		}
});

require(['knockout','../knockout.address', 'bootstrap'], function (ko) {
	var viewModel = {
		address: ko.observable({address1: '950 Gravier street', address2: 'suite 1700', city: 'New Orleans', state: 'LA', postalCode: '70123', country: 'United States' }),
		address2: ko.observable().extend({address: {valdiate: false}})
		};
	ko.applyBindings(viewModel);
});