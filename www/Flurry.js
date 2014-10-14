var argscheck = require('cordova/argscheck'), exec = require('cordova/exec')

var flurryExport = {}

flurryExport.AD_SIZE = {BANNER: 'BANNER', SMART_BANNER: 'SMART_BANNER'}

// Creates a new Flurry banner view.
// options : The options used to create a banner.  They should be specified similar to the following:
// {'adId': 'MY_FLURRY_API_KEY', 'adSize': Flurry.AD_SIZE.AD_SIZE_CONSTANT,   'positionAtTop': false}
// adId is the publisher API key from your Flurry site.
// adSize is one of the AdSize constants, and positionAtTop is a boolean to determine whether
// to create the banner above or below the app content.
// A publisher API key and AdSize are required.  The default for postionAtTop is false
// meaning the banner would be shown below the app content.
// success : The function to call if the banner was created successfully.
// error   : The function to call if create banner was unsuccessful.
flurryExport.createBannerView = function (options, success, error) {
 if (flurryExport.bannerLoaded) {
  requestBannerAd (options, success, error)
 } else {
  flurryExport.bannerLoaded = true
  var defaults = {'adId': undefined, 'adSize': undefined, 'bannerAtTop': false}
  var requiredOptions = ['adId', 'adSize']
  // Merge optional settings into defaults.
  for (var key in defaults) {if (typeof options[key] != "undefined") defaults[key] = options[key]}
  // Check for and merge required settings into defaults.
  requiredOptions.forEach(function(key) {
   if (typeof options[key] == "undefined") {error('Failed to specify key: ' + key + '.'); return}
   defaults[key] = options[key]
  })
  cordova.exec (function () {requestAd (options, success, error)}, error, 'Flurry', 'createBannerView', [defaults['adId'], defaults['adSize'], defaults['bannerAtTop']])
 }
 
 // Request a Flurry ad.  This call should not be made until after the banner view has been successfully created.
 // options : The options used to request an ad.  They should be specified similar to the following:
 // {'isTesting': true|false, 'extras': {'key': 'value'}}
 // isTesting is a boolean determining whether or not to request a test ad on an emulator,
 // and extras represents the extras to pass into the request. If no options are passed,
 // the request will have testing set to false and an empty extras.
 // success : The function to call if an ad was requested successfully.
 // error   : The function to call if an ad failed to be requested.
 function requestBannerAd (options, success, error) {
  var defaults = {'isTesting': false, 'extras': {}}
  for (var key in defaults) {if (typeof options[key] != "undefined") defaults[key] = options[key]}
  cordova.exec (success, error, 'Flurry', 'requestAd', [defaults['isTesting'], defaults['extras']])
 }
}

// Destroy the banner view.
flurryExport.destroyBannerView = function (options, success, error) {
 cordova.exec (success, error, 'Flurry', 'destroyBannerView', [])
}

// Creates a new Flurry interstitial view.
// options : The options used to create a interstitial.  They should be specified similar to the following:
// {'adId': 'MY_FLURRY_API_KEY'}
// adId is the publisher API key from your Flurry site, which is required.  
// success : The function to call if the interstitial was created successfully.
// error   : The function to call if create interstitial was unsuccessful.
flurryExport.createInterstitialView = function (options, success, error) {
 if (flurryExport.interstitialLoaded) {
  requestInterstitialAd (options, success, error)
 } else {
  flurryExport.interstitialLoaded = true
  var defaults = {'adId': undefined}
  var requiredOptions = ['adId']
  // Merge optional settings into defaults.
  for (var key in defaults) {if (typeof options[key] != "undefined") defaults[key] = options[key]}
  // Check for and merge required settings into defaults.
  requiredOptions.forEach (function (key) {
   if (typeof options[key] == "undefined") {error ('Failed to specify key: ' + key + '.'); return}
   defaults[key] = options[key];
  })
  cordova.exec (function () {requestInterstitialAd (options, success, error)}, error, 'Flurry', 'createInterstitialView', [defaults['adId']])
 }
 // Request a Flurry interstitial ad.  This call should not be made until after the interstitial view has been successfully created.
 // options : The options used to request an ad.  They should be specified similar to the following.
 // {'isTesting': true|false, 'extras': {'key': 'value'}}
 // isTesting is a boolean determining whether or not to request a test ad on an emulator, and extras.
 // represents the extras to pass into the request. If no options are passed, the request will have
 // testing set to false and an empty extras.
 // success : The function to call if an ad was requested successfully.
 // error   : The function to call if an ad failed to be requested.
 function requestInterstitialAd (options, success, error) {
  console.dir (options)
  flurryExport.showAd (options, success, error)
  var defaults = {'isTesting': true, 'extras': {}}
  for (var key in defaults) {if (typeof options[key] != "undefined") defaults[key] = options[key]}
  console.dir (defaults)
  cordova.exec (success, error, 'Flurry', 'requestInterstitialAd', [defaults['isTesting'], defaults['extras']])
 }
}

// Destroy the interstitial view. Note: it is automatically destroyed when the user clicks the close button.
flurryExport.destroyInterstitialView = function (options, success, error) {
 cordova.exec (success, error, 'Flurry', 'destroyBannerView', [])
}

flurryExport.showAd = function (options, success, error) {
 cordova.exec (success, error, 'Flurry', 'showAd', [])
}

flurryExport.showInterstitialAd = function (options, success, error) {
 flurryExport.showAd (options, success, error)
}
module.exports = flurryExport
