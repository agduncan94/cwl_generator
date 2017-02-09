angular.module('cwlgenerator', ['ui.bootstrap', 'dndLists']).controller('GeneratorCtrl', function ($scope, $log) {
	$scope.completeCwlDoc =  {};
	$scope.baseCommandString = '';
	$scope.cwlDoc = {
		"cwlVersion": '',
		"id": '',
		"class": 'CommandLineTool',
		"baseCommand": '',
		"hints": {},
		"inputs": [],
		"outputs": []
	};

	$scope.inputTypes = ["null", "boolean", "int", "long", "float", "double", "string", "File", "Directory"];
	$scope.outputTypes = ["null", "boolean", "int", "long", "float", "double", "string", "File", "Directory"]
	$scope.input = {
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

	// STDOUT/STDERR variables
	$scope.stdout = '';
	$scope.stderr = '';

	$scope.stdoutOutput = {
		"id": 'stdout',
		"type": 'stdout'
	};
	$scope.stderrOutput = {
		"id": 'stderr',
		"type": 'stderr'
	};

	// Docker requirement variables
	$scope.dockerReq = '';
	$scope.dockerReqObject = {
		"dockerPull": ''
	};

	// Initialize
	$scope.cwlDoc.cwlVersion = $scope.cwlVersions[0];

	$scope.addInput = function() {
		$scope.cwlDoc.inputs.push($scope.input);
		$scope.input = {
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

	$scope.$watch('baseCommandString', function(newValue, oldValue) {
		$scope.cwlDoc.baseCommand = $scope.baseCommandString.split(',').filter(Boolean);
	});

	$scope.$watch('stdout', function(newValue, oldValue) {
		if ((newValue == null || newValue ==  '')) {
			delete $scope.cwlDoc.stdout;
		} else {
			if (oldValue == null || oldValue == '') {
				$scope.cwlDoc.outputs.push($scope.stdoutOutput);
			}
			$scope.cwlDoc.stdout = $scope.stdout;
		}
	});

	$scope.$watch('stderr', function(newValue, oldValue) {
		if ((newValue == null || newValue ==  '')) {
			delete $scope.cwlDoc.stderr;
		} else {
			if (oldValue == null || oldValue == '') {
				$scope.cwlDoc.outputs.push($scope.stderrOutput);
			}
			$scope.cwlDoc.stderr = $scope.stderr;
		}
	});

	$scope.$watch('dockerReq', function(newValue, oldValue) {
		if ((newValue == null || newValue ==  '')) {
			delete $scope.cwlDoc.hints.DockerRequirement;
		} else {
			$scope.cwlDoc.hints.DockerRequirement = $scope.dockerReqObject;
			$scope.cwlDoc.hints.DockerRequirement.dockerPull = $scope.dockerReq;
		}
	});
});
