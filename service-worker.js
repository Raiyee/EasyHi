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

var precacheConfig = [["01d1c5ed8ca1fbbe005c.js","16d6bb3478914194bd342ec543e21c07"],["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["044f6e79f69199d4b1a8.js","cd195b896aa9d1fe27567fde35a080d6"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["08398eb4267f90cea3fe.js","aa9cef113a541064443d07f0451fb21d"],["09c6bdb289456620c46e.js","b55a1225e8d7809dc6764204074c021b"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0d888a0e68f11ee11c56.js","4725033d9d6f53bc183609eeef43ba25"],["10d6c4b10c6380cd7544.js","4650da77da9997ed0f398b798ac1c9e5"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["14a7a935dc64b9e9accb.js","07840eb0c6410a1d7a3cfd19c92a6c9f"],["15b373aca82744abd23a.js","3d7a851644d40935d9f650b7b9096dde"],["1be7239666a476dccd45.js","5e44b4a6e8a71d7291b13db8807dd209"],["1c18e66145c2280cf704.js","de41d53ad51e48a5051f6b40bf8c03a8"],["1f34fb27a96adc38fed3.js","5a34296f10a4986a8b36824064e269b4"],["20e1dc938c93341736b3.js","c1d7a311ad8dcede61f6ef9dc08ce2f7"],["234a12f49af30c2c0c7e.js","c6c3054eb1a01e1ef3215723b53a6a15"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["26d4fbbbba2db0ecce72.js","221c07c437fdc244cf2bd04f0689e0a3"],["2c877765301c580e4470.js","95c9410511bc1e6e639738a285f9382f"],["2eef55f3ee32f4b66b3d.js","0fd7ce6e2b1c9dc134d5295c1809c1fc"],["2fd0c626fa5c6810dba4.js","0ee37aee802def15d2b70c7493c8f44a"],["35a84ceb1c469c0ea686.js","8f04c2abaa26837cefec136537a42696"],["372fab4edd0817f00803.js","f7905ddb2b9a329e1a34e50e51d73466"],["38b28cb8b262e5b3241a.js","2dba96e6b387ea053618d2a0dbf7ba08"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3f076fba95fc8d2ff88d.js","ba87636f05e74308c818d841ba6f060b"],["41bb346632bcd95335dd.js","09fc4fbf21708ee4b11e852dca0500a6"],["426f5ece510801a4e1d2dae122b6ee60.ttf","426f5ece510801a4e1d2dae122b6ee60"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["460e65137cf1e3f540d6.js","8eced23ea80f68fc0ce70fd286e4e994"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["49331c2557d49b618212.js","3fd00394553435755768d36194e65e29"],["4aa9294eacd48033412d.js","1cd87f42dec7f32a94dcd042f2053d42"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["4fa6503899680606c804.js","7f70f7f684b714a7ce8fb2e59dfa33a0"],["5992ba0e3b401167d659.js","d26b7a9fbd61589573ccf0a1188f997f"],["5ac882f4488d3f789f1ea6dc2202f1b0.woff","5ac882f4488d3f789f1ea6dc2202f1b0"],["5b62fcb38198ad729861.js","53c9ec7acc1884bcada694bfcabaa316"],["5eb1e39be199da72d993.js","6037fc3c28c1eff2510bf4edc5d274c9"],["5ff65ea38aed4a290352.js","028f3e7fc51d713000457d19f46951fe"],["60777e1cbe7460755a9f3c2ef491a77c.svg","60777e1cbe7460755a9f3c2ef491a77c"],["62c48b359c58002f385d.js","21dec02905f13fe54a01fb1f721251b7"],["6a5cf6db99ebde55a027.js","264e098920f07f8ae264fa213620ecfd"],["6c962045343dbb52bf5a.js","75b550eef5d90ca9b6c03df5844a52a2"],["762c1150ffb85c3a4670.js","5245667e3af873c73d8f7da9aa7c84c3"],["76d0489c42d669674951.js","9aef7e6a6ca5db7892a5333aa8689c24"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["78066c38f0696bbc8c18.js","ea6b1e891dfe26baeb7b650cb60b5974"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["7f50fadd4278b991bf36.js","17b9984da3cf7ad7492b3f209a3b79da"],["815ea965ac00645c4231.js","bcc1c0a315c171b98baa5eccb8839d12"],["83453124186e0763a8e7.js","6ef9815978b9b9f377a4f6fe87d81cd1"],["846bbdb0bf8670bf1764.js","ff0adff468beadef4da9190004dcb893"],["85bf0388367ea4d84faa.js","aede75effabd8de8bc48f1ab50719073"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["874a23a7f48d13d63492.js","0700b9478962a3689168834bda489ae2"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8fc4efea6b6c6e4d19b3.js","655c130da2167167413989281b8a680c"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["921de72712549b3d140d.js","57be7eb10706e58c77a1608ceb0ee298"],["925d10d98504959a9816.js","4a2547062c2223b360f6ffc4cfdc7da0"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["96c59638c9cf13f96e69.js","c262642eb96873187c44afc893f4cb25"],["98d8a0490afdc0b84fcbc2015a427204.eot","98d8a0490afdc0b84fcbc2015a427204"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9fc1d0a11cb48aae88d2.js","bb7e22dd520a9bb86a04bcae188fb00f"],["CNAME","58e622340325843359475fb423e22b4c"],["a44fe117338c585dfdb0.js","b7fa1d7015f9f6d415a60f1d095ca6cd"],["a793e7943b8ef6e149be.js","d203843032ca05f6b5292f3da7007a12"],["a96f4dc9e9deb560f567.js","61827ba26e679c867630026d1d903e3a"],["b102795586ca2b85ae96.js","302bcbfe57d56d986abbce71bb026e56"],["b1796fb87560abf66de5.js","558b953b66983a35eba7bc2ab77222ef"],["b96b7e2bf07e50c784f1.js","9001f3bf2d79be33886c3b46baa0e57b"],["bcb6b69dfb0e3eb11b75.js","293ac3c0d62b94013d3275cf442349f8"],["bdb0df248b04ac550e2c.js","f4d39f2924078f827b648b1cc4beb5a1"],["be365fb655e7bab6711d.js","98ec601274f756609f08b3a721735390"],["be3c9ac40e823f9ce4ea.js","6c69824d006f9c6b0e8c66d193999cce"],["bf601941b8246a4b6995.js","9c22dc8312369a40db45ca55e8331e80"],["c0acc4d0a9c9c1ca9df5.js","5e6f8247c91e139aedff63245deb1f40"],["c1235fdc701be97c2c1e.js","3bf0131198c8ea77eebe4be315ef2177"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c6808f782f5d852aba6f.js","4c31ebabcfc872741be2fd8208799641"],["c7b44f06448d829e92ab.js","c6c2d5413df7bc31011f0fe8c4059941"],["caa653f9bf4fa588cae8.js","f8f1a2606dc382e0e2e19b1fdadf7e31"],["ce6215996cb21cd92453.js","bd0bf578b05026267b0725bbb6dae799"],["cf345396d3c44753415a.js","d4f4d0d52258e5eb050e20ee4cced125"],["cfab8aa4554402105088.js","1df7db7178c2517965b12ffa1e5204d0"],["d04b9bd918b09f38f9e0.js","51262d1e5b90d546022f096b0105d1f0"],["d3f28d31d42aa841d2b9.js","124af3ea2806251e41fe890291f2dda9"],["d9b5082119fe6fcdabbb.js","a7f46701bd0fe6d2eaa9187b44c78a1d"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["e0b637d0ef0bb70defb3.js","92eead33b2006ed800c06c2a77c5d8ff"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["ec607491f0293a2e773b.js","e04395a302b98393346689b60df18215"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["f033c969e2c5fc767009780c6b880eaa.css","f033c969e2c5fc767009780c6b880eaa"],["f3fae3828e9b8c368eab.js","43b1542721fc53877b8d2aec26af242f"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f850c4e8bc083f03e1d9.js","43b2d1e3dd53ec87eb49e2e6396e2fc4"],["f95c2d482be04140998d.js","734d97669d4ee8919a41cc8cfa144ddd"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["fa4999e503deac05e57e.js","8dc480922c25fb4bfabb5fc44b6c5797"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fb3fae64b3999a6cd436.js","2615f2cdeea73bb4dbdcfdfcb19146ab"],["fed6785d4c8275454a3b82e22199b7a1.css","fed6785d4c8275454a3b82e22199b7a1"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







