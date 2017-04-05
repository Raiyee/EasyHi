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

var precacheConfig = [["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["06c07425ea6aa8ef2f11.js","4c748185c2d61060c6d17765b6b4ae5e"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0ab1f176509e7dbb9d62.js","e025dac5dcd9cab01902e90b50025627"],["1258916694312dd533f8.js","8eb855119972b5fc13f0e779e836ba71"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["16b3f2d0790329607694.js","04907d85d4c31ec8486596e7efdaccac"],["1869bbbe5a2ca07bfadf.js","58734657f8a59e220d76187aa523f3ac"],["196a1f74a25d3d5366bc.js","4557c25d25f3083cadb6ee1ed99cbe40"],["1ba2927d61aff7c814ae.js","a1a99f021e59aee78ab8fa95b87402c4"],["1f3f23520d6ae17ec463.js","c9ff51b3bd77145c4561c3ed569a9cff"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["243c4c59df2a87afce60.js","37e968123935710394d14ba5e8d4ba73"],["24b5451b243a7bb9b4c6.js","c2fa0b70594427357495d5b050105cb5"],["27c4f69c98e232af2a46.js","b4bb515b8cbcb00601d13ca647bb3573"],["28b32c3369710269a036.js","08fe811f163318f9fc86b173b3434537"],["2e16400aaedcb96b5795.js","ec55c049b44c6d3a8add8f58022e9f98"],["3264cff5d4c2f19f571e.js","cb16b52005847a9e52413083c9f98c6c"],["37c920e82c70dbfbd7341fb38013a4ac.css","37c920e82c70dbfbd7341fb38013a4ac"],["38a7aae90202e2f59c38.js","fd7e496ea99f03e6e270cef8b3080b02"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3a5e3c18343ccd9c884c.js","8297b713a194f305920e2b9f4163dbdf"],["3b44133bd2f00f82d62f40cac3c5cb56.css","3b44133bd2f00f82d62f40cac3c5cb56"],["41215899cfac7c469596.js","5d44206250395b71925fb9f24fb0492f"],["426f5ece510801a4e1d2dae122b6ee60.ttf","426f5ece510801a4e1d2dae122b6ee60"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["46677cd029be5adfcc0c.js","eefda3999b56e395503bceb5aa360882"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["482dec2ea83289691c7e.js","ea7901dad5597d9b6f765cf0094ed07d"],["48b1a8ae56d87e52236c.js","35d7818b6b502d3c61da220ea43fd52e"],["4a9ee3ae18b4ba40017f.js","9d8edd78069d21a90f9398a3fc7add1e"],["4b61072014a0ce7b6e74.js","e0438f818fb18c4fd81c5fa318723e2f"],["4e25f7f3940f4490aad8.js","6ccf4ca35184c29fda0300fd053ab82d"],["4e70791e189ae991a7ca.js","55522bdec78902638fd211ce3bf122fb"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["5284fbb95e0c98ac2018.js","b2664c9137b2d77ba3bf89adf5ee6f3c"],["58cb1770b005774ca3a9.js","997de619bcdf155e6398a9d125184964"],["5ac882f4488d3f789f1ea6dc2202f1b0.woff","5ac882f4488d3f789f1ea6dc2202f1b0"],["5f2b5fa4bc8126fd575a.js","5ece675513301e2dae422e754f5efdce"],["60777e1cbe7460755a9f3c2ef491a77c.svg","60777e1cbe7460755a9f3c2ef491a77c"],["64c2919d74cba81014ef.js","4f0d0430377eddccee844e5470a21bf7"],["65947aa9fbc1d94805b0.js","ea9b54713d9dbc53f09243023a269587"],["66e0193b9e4339bcbec8.js","e9e28bd9aa01749bfff595b2a2468c1a"],["6813684dcf44aa785b08.js","4f5dc5ed23d9165bd4a5afac9fee5c09"],["71e74a93591748470046.js","1549ff000dbe9dc553a0eb53b7bd7a57"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["78a254e3c3479e8fe62a.js","47831cf8f1e195684fdf522b0e08557a"],["7bf107a22a742db943ad.js","b4b94d624c074b79c7ca6c40cd95b8d7"],["7e3c84cee2034957cc11.js","4649a2467a55fcabe02229032aadbd13"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["86265bf44a7db3192ecc.js","7af267eee6d1808e901d3cb4c924a374"],["86d7c4d48f805302dc7d.js","329a82924751b8ee53c8e344d001a419"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8b3891f7bf7e8100e12f.js","fe6bcabce8f06328e2512b8460f328e8"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["92af0736f56a7fd5d2fd.js","ca9e48dafa8e0e7d43e5c93d99302e5e"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["95f868f783e43ba1834f.js","f8b2dee2692e5388577caa4f71817001"],["98d8a0490afdc0b84fcbc2015a427204.eot","98d8a0490afdc0b84fcbc2015a427204"],["99c1b471818e55a6b149.js","e262381c2c059cbe56ff2daefde28e96"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9c2801b45911b3f17357.js","2ead900730109d814eceb607626c469b"],["CNAME","58e622340325843359475fb423e22b4c"],["a001d12315163baeac4c.js","180732a8d3ee12125458c27122f3e6ac"],["a55a49c82ff9fabc0722.js","5465ed4871992c6bf4aecf2f1394154f"],["afe72b7faa4d6bc5822b.js","e2c923c81d80a3f7b7b8452555af65fb"],["b0bd812c0dc89e240cb0.js","d4b3d77f551b52a97251385954404205"],["b310e93baceaf9e83a78.js","74c7e8f4474012ede6c1009f84366b4d"],["b4052e26319d462c721f.js","cc6b89d4dea67679226c3807f9c2684a"],["b5d09d79820a9f948e8c.js","e6124f185cd27f01460ee5529af57bdc"],["b8c9529609dd1ea5f1bc.js","d9e484b11fc94844b7940273e634209a"],["ba26ceaa214a5bf67884.js","073e11f658f92e6cce9d951008179685"],["c097cb0f721d39c91e7f.js","b031923af08a82b0ce30ad29adec3305"],["c1cca222d2ab54b8e60b.js","facdb692a07376064cce811dd28abcab"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c4360f67a72729d7dccd.js","e1d385b17f5445eb3d472878473fd60c"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c72e69b9f1701f2a6737.js","9882a025d500bfe237acd4dd05fd9bc3"],["cbb80c191b14c666443a.js","a2d41689683e3501bceb652ef7847430"],["d54496abd7f12794ef58.js","b2f082ce9438df6eae996780808f6841"],["d64089f4ad43ef5bc031.js","6fb1a1a1a59b3588d0e2bf30d7622207"],["d6bbfd685cf280e9452e.js","56297720be03538ca0118a3663648248"],["d762fbcdee67c6bc3131.js","bd3ef1853365c2ecdd879a8b7b4811c8"],["dc42c3a1046145c4747b.js","aa531fd53796e2a6290cb70aa15ba217"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["de44290f1ed35c949f87.js","76c36332396566fc328458a710802d33"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["dffb46f38250824c0b79.js","b980a159e918c2a5cd74c9f85116f1d4"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e57b226803a3da38698c.js","5e2edd0a1d5e257abd1ee0ee0c313a68"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["ed674b853118110d8c33.js","3ccfadb3a717b7dba84a48dcc5cb0f7e"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["eec887bfac740d216857.js","41364feacd4747ca7ac514286c31da06"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f94b7458da92554e668f.js","a4d13feafbe2dd48148a028cc9bfbee1"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["fa59e78dcf60fcaa9db4.js","e169e4fbe326edd59b30b0e81b40292e"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







