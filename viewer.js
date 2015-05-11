define(["knockout", "./address", "./data"],
	function (ko, Address, componentData) {

		function ViewModel(data) {

			data = data || {};

			this.displayOptions = initDisplayOptions(data);
			this.instanceName = data.instanceName;
			this.address = ko.observable(new Address(ko.unwrap(data.address)), [], []);

			this.showCountry = ko.pureComputed(function () {
				var opts = this.displayOptions;
				if (opts.showCountryOnlyIfInternational)
					return this.address() && !this.address().isUS();
				return true;
			}, this);
		}


		function initDisplayOptions(data) {
			var options = data.displayOptions ? data.displayOptions : {};

			options.showCountryOnlyIfInternational = ko.utils.unwrapObservable(options.showCountryOnlyIfInternational) === false ? false : true;

			return options;
		}

		return ViewModel;

	});

