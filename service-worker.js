/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["00147d66b962c90461cc.js","1fbedaa8d8cf751bb6fc51f1c63a7bb4"],["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03078df6a1918bbe89dd.js","62ee8d2a031de20c6196bea214a2461e"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0ab1f176509e7dbb9d62.js","1abc972c40b09260800d951ef7ec4fd6"],["10466fac306b54965d40.js","6700dc9096a60f0d1d857d580f3c02b3"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["167a8738eaf45d0515b9.js","0e0d152e709dece94235ae63499c39d4"],["1869bbbe5a2ca07bfadf.js","963d860fc541463174136ebcaf1a3c82"],["1ba2927d61aff7c814ae.js","ed6acf1f5740c25593fe830bcd9be8bc"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["243c4c59df2a87afce60.js","3d78d697556924121eb0c581108113a3"],["24b5451b243a7bb9b4c6.js","57467cf952e17c578d49d5ed76dbe0b0"],["2bf673ec889952048d46.js","aec1d61ff4a80842376e1ea17bfaf0d6"],["2ffcafcf1506b850376b.js","aea20a5a4fd3c8fb8e1497a22defe3d0"],["3264cff5d4c2f19f571e.js","b962d8bebde35f079f2ebf04a2ef04c4"],["37c920e82c70dbfbd7341fb38013a4ac.css","37c920e82c70dbfbd7341fb38013a4ac"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3a5e3c18343ccd9c884c.js","395f171d8a4a80a47123300b15041666"],["3b44133bd2f00f82d62f40cac3c5cb56.css","3b44133bd2f00f82d62f40cac3c5cb56"],["3ef53aff2d85f76827b5.js","fb36a63ca26668a94a078a23b9f58d9f"],["426f5ece510801a4e1d2dae122b6ee60.ttf","426f5ece510801a4e1d2dae122b6ee60"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["48b1a8ae56d87e52236c.js","6e33046a3359816cd49ddfd98657051f"],["4e25f7f3940f4490aad8.js","d865bdad1ba46abbb338931ed1ff6438"],["4e400582fab4c0fe5f57.js","127bcf3e929bb6baa1c445110d198913"],["4e69e79acfffbc6224d4.js","7efb4f583ffe32990c1c350568e220cb"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["5284fbb95e0c98ac2018.js","ea588c578340e6d511907ebf521d5afc"],["5ac882f4488d3f789f1ea6dc2202f1b0.woff","5ac882f4488d3f789f1ea6dc2202f1b0"],["5ec11b8faf59f45a6134.js","af33a1c9723b297a6d53d25876be7501"],["5f2b5fa4bc8126fd575a.js","112636f74546f293de3aa9dfe99103b8"],["5f606992fbe13f4a879a.js","f202a2719f8cc04c4e14d85b4dc33e1e"],["60777e1cbe7460755a9f3c2ef491a77c.svg","60777e1cbe7460755a9f3c2ef491a77c"],["64c2919d74cba81014ef.js","9d44ab4dba7b4e8c6914f5420508f7be"],["66e0193b9e4339bcbec8.js","5696d759fb0faedf85e38a330fdcd1cd"],["71e74a93591748470046.js","bc011bcfc802f4e21ac4ab51300e207e"],["74dffe6cdaa2eec47f65.js","e653eb97fcd15ea54001160a2f711a27"],["7657e3188345f570f114.js","6baa86dae1d43df4be70d5495eaae58d"],["76e1870d39ac2a6ab6b3.js","ea9b54713d9dbc53f09243023a269587"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["772465f22c7e448ef891.js","55ac8afbb0a7f59356a26937631ef31c"],["7bf107a22a742db943ad.js","c5ac5107047929d7f7b13890e5e7d8b1"],["7e3c84cee2034957cc11.js","d54bc8db8ff781aea6c2a9e416d7b135"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["809f0306f38b28c317b9.js","06ac04683d77bc8d8adcb86424f97c43"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8f4b7d57e3a81dca48da.js","961eff0d986dcc081630272df4811558"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["90250c64ecf0182358e9.js","7bb05239d8fdd86a708b4b9cb2970403"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["92af0736f56a7fd5d2fd.js","984c2a383c6fee869301bb315f797dc2"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["93a3c8734fdcea925818.js","f8618f2a43ddc038489a6c58e209fc93"],["98d8a0490afdc0b84fcbc2015a427204.eot","98d8a0490afdc0b84fcbc2015a427204"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["CNAME","58e622340325843359475fb423e22b4c"],["a177941a509b2acd9ac7.js","87e60f79e86b30c9e2deafc05e95176c"],["a55a49c82ff9fabc0722.js","bcfcafa81839cf2937a08d1c77ec441c"],["abd4da6f7c8d02b8958a.js","b8a8e88b3edb32838c62bc72049d7a6f"],["afe72b7faa4d6bc5822b.js","47ff1741bc8acc84c363d9d681a694a9"],["b2dda66d02f584bbc1ad.js","bc47083e962250452f323701952237d1"],["b310e93baceaf9e83a78.js","709a405eed6f079baf9855620d59a87d"],["b352d3b0d45fa6de237a.js","30df361daca8239044eb88b2a58c1389"],["b5d09d79820a9f948e8c.js","e6124f185cd27f01460ee5529af57bdc"],["b644bba9bf653ef0eab9.js","b0a1dce53627f90622058c732be7f586"],["ba26ceaa214a5bf67884.js","249fb063e98af5f345785cb1eaec988a"],["bb96572e022e4357b4e4.js","4989747c63dc8317f61f8d4ff8f0480f"],["bd3023437e9a90bdd0ac.js","4c89fb91f3eb06e89caf8fb2dff68312"],["c1cca222d2ab54b8e60b.js","f626446a3cd8c952b1727e07bb60eec8"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5afe43028f95505c024.js","7855dfc4690cc8a80216bd794b203cd4"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c72e69b9f1701f2a6737.js","2cc4a4eaa11848dd830345dd592612ec"],["cbb80c191b14c666443a.js","a2d41689683e3501bceb652ef7847430"],["ced7b41cec4977bfe771.js","e91c4eaf46056ec1249bff436377f306"],["d2ab7b12929555947144.js","b1882c4ab3272e35d13e2228897e0988"],["d2c9dbf0b7b605aa476b.js","aea5a4a690a04422d251a0a94467191b"],["d4fcdb54427ad005fce7.js","c514da7f2346700d14823c34502536a8"],["d6bbfd685cf280e9452e.js","f61f96d44de5a0894480cd18d6af9af4"],["d762fbcdee67c6bc3131.js","e3e6312e804083a05d53c5a478146f20"],["dc42c3a1046145c4747b.js","14e937b3cc1527467c11687d4a207c0f"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["dddb2b6ce9c838b1a62a.js","407d96ac3c7157aecb849d5496a5ee4b"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["de5819994da9ba4305db.js","7251818ac3540a225844de6148c8898a"],["de86c6503b50253e8765.js","160a35b9c75ad0c9183ad3f6fc17dd62"],["dffb46f38250824c0b79.js","b980a159e918c2a5cd74c9f85116f1d4"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e37801c40062152d1bb3.js","c868fe73b33c4e12db461dd3a963b63b"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["e74514e0f3de9e005642.js","9318e548338702bb7c4877e2c129e076"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["f0c73a3511ee21fc5798.js","f185f83bf7948d46ee2ed0fcf1e6e3b5"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f94b7458da92554e668f.js","27eb2b387cfdbad6a0c1fb014dbcc0dd"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"],["ff4db51ccacf8f92460f.js","1ddc7b61b153981c7a7a7186a49ce249"]];
var cacheName = 'sw-precache-v3-yoga-vision-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /./);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







