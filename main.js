angular.module('cwlgenerator', ['ui.bootstrap', 'dndLists']).controller('GeneratorCtrl', function ($scope, $log) {
	$scope.cwlDoc = {
		"cwlVersion": '',
		"id": '',
		"class": 'CommandLineTool',
		"baseCommand": '',
		"inputs": [],
		"outputs": []
	};

	$scope.inputTypes = ["null", "boolean", "int", "long", "float", "double", "string", "File", "Directory"];
	$scope.input = {
		"ioType": "input",
		"id": '',
		"label": '',
		"type": $scope.inputTypes[0],
		"inputBinding": {
			"position": 0,
			"prefix": '',
			"separate": true
		} 
	};
	$scope.output = {
		"ioType": "output",
		"id": '',
		"label": '',
		"type": $scope.inputTypes[0],
		"outputBinding": {
			"glob": ''
		} 
	};
	$scope.cwlVersions = ["v1.0"];
	$scope.inputArray = ["input"];
	$scope.outputArray = ["output"];


	// Initialize
	$scope.cwlDoc.cwlVersion = $scope.cwlVersions[0];

	$scope.addInput = function() {
		$scope.cwlDoc.inputs.push($scope.input);
		$scope.input = {
			"ioType": "input",
			"id": '',
			"label": '',
			"type": $scope.inputTypes[0],
			"inputBinding": {
				"position": $scope.cwlDoc.inputs.length,
				"prefix": '',
				"separate": true
			}
		};
	};

	$scope.addOutput = function() {
		$scope.cwlDoc.outputs.push($scope.output);
		$scope.output = {
			"ioType": "output",
			"id": '',
			"label": '',
			"type": $scope.inputTypes[0],
			"outputBinding": {
				"glob": ''
			} 
		};
	};

	$scope.updateInputOrder = function() {
		for (var i = 0; i < $scope.cwlDoc.inputs.length; i++) {
			$scope.cwlDoc.inputs[i].inputBinding.position = i;
		}
	};
});
