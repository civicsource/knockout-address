define(["knockout", "./address", "./data"],
	function (ko, Address, componentData) {

		function ViewModel(data) {

			data = data || {};

			this.displayOptions = initDisplayOptions(data);
			this.instanceName = data.instanceName;
			this.address = getObservableAddress(data.address,null,null,false);

			this.showCountry = ko.pureComputed(function () {
				var opts = this.displayOptions;
				if (opts.showCountryOnlyIfInternational)
					return this.address() && !this.address().isUS();
				return true;
			}, this);
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

		function initDisplayOptions(data) {
			var options = data.displayOptions ? data.displayOptions : {};

			options.showCountryOnlyIfInternational = ko.utils.unwrapObservable(options.showCountryOnlyIfInternational) === false ? false : true;

			return options;
		}

		return ViewModel;

	});

