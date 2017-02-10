angular.module('cwlgenerator', ['ui.bootstrap', 'dndLists', 'ngPrettyJson']).controller('GeneratorCtrl', function ($scope, $log) {
	$scope.baseCommandString = '';
	$scope.cwlDoc = {
		"cwlVersion": '',
		"id": '',
		"class": 'CommandLineTool',
		"arguments": [],
		"baseCommand": '',
		"hints": {},
		"requirements": {},
		"inputs": [],
		"outputs": []
	};

	$scope.inputTypes = ["null", "boolean", "int", "long", "float", "double", "string", "File", "Directory"];
	$scope.outputTypes = ["null", "boolean", "int", "long", "float", "double", "string", "File", "Directory"]
	$scope.input = {
		"id": '',
		"label": '',
		"doc": '',
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
		"doc": '',
		"type": $scope.inputTypes[0],
		"outputBinding": {
			"glob": ''
		} 
	};

	$scope.argument = '';
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

	// Minimization variables
	$scope.minimizeInputs = false;
	$scope.minimizeOutputs = false;

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

	$scope.addArgument = function() {
		$scope.cwlDoc.arguments.push($scope.argument);
	};

	$scope.updateInputOrder = function() {
		for (var i = 0; i < $scope.cwlDoc.inputs.length; i++) {
			$scope.cwlDoc.inputs[i].inputBinding.position = i;
		}
	};

	$scope.toggleMinimizeInput = function() {
		$scope.minimizeInputs = !$scope.minimizeInputs;
	};

	$scope.toggleMinimizeOutput = function() {
		$scope.minimizeOutputs = !$scope.minimizeOutputs;
	};

	$scope.removeStdErrOutput = function() {
		for (var i = 0; i < $scope.cwlDoc.outputs.length; i++) {
			if($scope.cwlDoc.outputs[i].type == "stderr") {
				delete $scope.cwlDoc.outputs[i];
				$scope.cwlDoc.outputs.splice(i, 1);
				break;
			}
		}
	};

	$scope.removeStdOutOutput = function() {
		for (var i = 0; i < $scope.cwlDoc.outputs.length; i++) {
			if($scope.cwlDoc.outputs[i].type == "stdout") {
				delete $scope.cwlDoc.outputs[i];
				$scope.cwlDoc.outputs.splice(i, 1);
				break;
			}
		}
	};

	$scope.$watch('baseCommandString', function(newValue, oldValue) {
		$scope.cwlDoc.baseCommand = $scope.baseCommandString.split(',').filter(Boolean);
	});

	$scope.$watch('stdout', function(newValue, oldValue) {
		if ((newValue == null || newValue ==  '')) {
			delete $scope.cwlDoc.stdout;
			$scope.removeStdOutOutput();
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
			$scope.removeStdErrOutput();
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
