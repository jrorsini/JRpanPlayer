/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: Requires Babel \\\"^7.0.0-0\\\", but was loaded with \\\"6.26.0\\\". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention \\\"@babel/core\\\" or \\\"babel-core\\\" to see what is calling Babel. (While processing preset: \\\"/Applications/MAMP/htdocs/JRpanPlayer/node_modules/@babel/preset-env/lib/index.js\\\")\\n    at throwVersionError (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/@babel/helper-plugin-utils/lib/index.js:64:11)\\n    at Object.assertVersion (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/@babel/helper-plugin-utils/lib/index.js:13:11)\\n    at /Applications/MAMP/htdocs/JRpanPlayer/node_modules/@babel/preset-env/lib/index.js:154:7\\n    at /Applications/MAMP/htdocs/JRpanPlayer/node_modules/@babel/helper-plugin-utils/lib/index.js:18:12\\n    at /Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-core/lib/transformation/file/options/option-manager.js:317:46\\n    at Array.map (<anonymous>)\\n    at OptionManager.resolvePresets (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-core/lib/transformation/file/options/option-manager.js:275:20)\\n    at OptionManager.mergePresets (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-core/lib/transformation/file/options/option-manager.js:264:10)\\n    at OptionManager.mergeOptions (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-core/lib/transformation/file/options/option-manager.js:249:14)\\n    at OptionManager.init (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-core/lib/transformation/file/options/option-manager.js:368:12)\\n    at File.initOptions (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-core/lib/transformation/file/index.js:212:65)\\n    at new File (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-core/lib/transformation/file/index.js:135:24)\\n    at Pipeline.transform (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-core/lib/transformation/pipeline.js:46:16)\\n    at transpile (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-loader/lib/index.js:50:20)\\n    at Object.module.exports (/Applications/MAMP/htdocs/JRpanPlayer/node_modules/babel-loader/lib/index.js:173:20)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });