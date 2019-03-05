(function () {
	'use strict';
	angular
		.module('app.widgets.lastupdate', [])
		.controller('ngLastupdateCtrl', ['$rootScope', '$scope',
			function ($rootScope, $scope) {

				function getLastupdate() {
					try {
						var state = $scope.itemState($scope.config.lastupdate_item);
						var now = new Date();
						var last = new Date(state.slice(0, state.lastIndexOf("+")) + "Z"); //Crappy safari doesnt like timezone format
						var timeDiff = Math.abs(last.getTime() - now.getTime());
						var diffHours = Math.ceil(timeDiff / (1000 * 3600));

						var val = parseInt(diffHours);
						if (val > 100) {
							val = 100;
						} else if (val < 0) {
							val = 0;
						}

						// Create rgb value from val
						if (val <= 50) {
							var r = Math.floor((255 * (val / 50)));
							var g = 255;
							var b = 0;
						} else {
							var r = 255;
							var g = Math.floor((100 - val) / 50 * 255);
							var b = 0;
						}

						$scope.bgIndicator = "rgb(" + r + "," + g + "," + b + ")";
						$scope.textIndicator = val + "h";
					} catch (err) {
						$scope.bgIndicator = "rgb(0, 128, 255))";
						$scope.textIndicator = "?";
					}
				};

				// Run function when items update
				$rootScope.$on('openhab-update', function (event, item) {
					getLastupdate();
				});

				getLastupdate();
			}
		]);
})();