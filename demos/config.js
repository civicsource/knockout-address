requirejs.config({

	baseUrl: './',

	paths: {
		bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
		jquery: "../../bower_components/jquery/jquery",
		knockout: '../../bower_components/knockout/dist/knockout',
		'knockout.punches': '../../bower_components/knockout.punches/knockout.punches',
		'knockout.validation': '../../bower_components/Knockout-Validation/dist/knockout.validation',
		lodash: '../../bower_components/lodash/dist/lodash',
		stringTemplateEngine: '../../lib/stringTemplateEngine',
		template: '../../lib/template',
		text: '../../lib/text',
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

require(['knockout', '../main', 'bootstrap'], function (ko) {
	var address = { address: { address1: '950 Gravier', address2: '1700', city: 'New Orleans', state: 'LA', postalCode: '70123', country: 'United States' } };
	ko.applyBindings(address);
});