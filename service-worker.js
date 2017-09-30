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

var precacheConfig = [["0056430c8937cf162ad9.js","67493a3ebf690a3b90af48829e44466b"],["0985ff1faf1e58dcf781.js","4e8fc6e6bcb432ae2cd4437a3c8cb13f"],["120c8683d6e09180c667.js","06ca1fe422786cd97377225451b65e5e"],["17dc5c46e3175a01294b.js","27db340613e89227f0b5c8a1b56c050b"],["1c69a9da07ad1fb67753.js","f1b15b361cbb471cf5052ca202ba4826"],["1c74b78e32f1600e8778.js","1e5702fa91e4405bdd25277c8a29e195"],["1decc64dccc985146c73.js","5d032073b77d374a74e3fde6fdb583b4"],["22c011f64dd212fddc51.js","6ba4f38977bb9f7113c56cb84ca8f3c9"],["277af2b43229fe3ce10a.js","9f8ed8d2635068cfb069cf77a409adf7"],["2c44dd5f9fa0bb3a8877.js","684341dcbe6746cf65ab1568ffdcef18"],["37e2832fd85d77531be4.js","114c48f8fd682ca79ff44324c26e505d"],["3a5026c23b4df284d7ea.js","3c30fa4d34f7bf695075908208c6c4d0"],["3b6d767d7d073919a272.js","83852eea730c4109541de60654f84021"],["400cb637f40684dc51f2.js","e4efdb62f760e59eb3088ce323bbe353"],["432ac6595bfac10d8beb.js","d83ff12c1bb5a6285930b0023aaeb673"],["44ad552d841105fead58.js","6c5b6281376e9785706f630d2cf09e83"],["4c5a8fa7ec48c277bc32.js","66a9fbc18b8791e416b880a918417c97"],["5b48abeb2f05e6559a40.js","0f6864b9f5a35d8ebc4f2fb5bbb8a11c"],["5e065f09dea704f0ef26.js","90f303bcbbc483bb9befeb465c6a74a4"],["5fa333a1f9808840cb85.js","a194127f35538b23e35ad9f9bd02b380"],["6066e74259326a86c215.js","59265492aa9951e8e2dcd4a2bb4b5f25"],["60a649c1c663152f2051.js","a195d2eb1ab6f2260d64504d782be9b5"],["6307f0244e6a67705b09.js","9ec1f0ebe9d0bd23de6220b476ec62eb"],["65fceac921cfb73566c5.js","5b85c09b77a9704db8b6329d48890659"],["677528fc8d0e134eb757.js","e2f9a20e4549a6a8bcb13e18797a907e"],["6aae3424f6bbdb86e62b.js","e43af0811247b06960f8ae3393396156"],["6b21d58e4f164b31f2b0.js","8db2e984a073c74e7cc14c9bc81589ea"],["6c0be6ab667b4b428859.js","d07b290bf0ce62253d75389dea61df50"],["7425af1240dc68c7732a.js","9daf45e7064cac6f84060554787b8785"],["7a31dbc19bb903a704ee.js","7e8ffe79e7f12be0b73c77d0a265162b"],["7fab07910caa048a575e.js","115cff1bda05691da795d3e977d60c42"],["81aec9ed66aae165bdc0.js","44430bcf10399f520f77b4aedc2442ee"],["832f4a0743f4df143b36.js","9b6674d0ad172c59d1810969d91a471c"],["85dd1518baf7ec714eaa.js","b4663619e39491bd3cd64c98f0ea9743"],["88a6c88459b45beff389.js","6ef397726e4b957d78940e1e70583fb2"],["8b6e99211e03bbd1ad14.js","6dcd32f7cab76997b038950d3833a739"],["8d72619c73e1014c6948.js","9492fe18fcc0acf01c734944e886fa6e"],["939be6a49ca41109fda7.js","3310577c936cd7a96b28e6901d64d9de"],["966fb0c786cefbd82b6d.js","f622fe8b260daaad7571c97d5504c09c"],["98b355fe809473040b2b.js","2a0df7d92f90279527ab8c3ac697f1cd"],["98d66e46299fed38641a.js","9ac696851a54964e8f33bf29323af535"],["9bfc234495b6b3c04c6f.js","c9cfa4e3fa17d1788400b6bb8c425702"],["9c3b7e7a763fe8f28e48.js","ae681babc3ddd08c139698fb441740cf"],["9df77806728e72ff3376.js","3a01ca21aa2855a8eef6dfd326ed5fd0"],["9fd8a3000fa86070abc1.js","b2e249fd08d347fce57e83f8f4759bd8"],["CNAME","58e622340325843359475fb423e22b4c"],["a01bb1f99e22d661393e.js","a12a69a22ec2d1f78ccb7b4bb563b7cd"],["a3e48e9350fc292727a5.js","a90e10c182101d1370c1d12cdbb8cc4b"],["a924a58c2415820468a8.js","9d230d0de3760eea61b6c60c076a0426"],["b1982654d30ff3c08e5e.js","c039538f929353ef4fcfee311e5a2f8c"],["b2523b8f4bc31a1728b6.js","fc25705d97becfabd62605068a3a34ce"],["b2eda44e396db30a0d7c.js","56f4f0628a6e717acba627e41502bebc"],["b59d3d0843fb1c94a070.js","7d393eeef3180bd7bdcc9909a5ef4a4f"],["b7940ca9757e484ac821.js","a314fa43f224639669cac530a5c17fea"],["b79ef53b67e71490a557.js","5ab4c077320bbd7e1084e83d36b4982e"],["c00e9f1af5bf59a4157a.js","cae63b22b034e45ea830f3010a0fc830"],["c1ae25f2efa9c1bcb724.js","4d75589463eddc5007fc4c5aac26d180"],["c409fe619eb324fe79c0.js","8e3d1269a6a2fcc1d2ce1323bc56aa47"],["c55ea19238e6042d08db.js","daff9503c676403a7241aef1345d9a0f"],["cd5175e70f8ebb87d27b.js","9605c48bd001ac60841f90cb14aca65f"],["cdbb3fbee5fc17137705.js","fe610e3e12433ec92e5e23ac45a329e4"],["ce38f6f25ca360c6b7a9.js","fd4575b781eb79aa0e45d84d6dd28261"],["d4650382e3bd4ff3e7fe.js","92628943b5211f50bfcadae185ddc471"],["d5b06d3ed94813782983.js","3fe75e1407e67c5fe433170b763e040a"],["d7ae379c8a17e18b738d.js","a902b7c66d0409a103b19e37b5558824"],["d9824a2e18ba83eabc87.js","74d45fc6e683f1c9f82af6d179d2ddeb"],["dab719079a51344942b3.js","1330819eb3347050d8afb5c525aa44a0"],["dadd00438de64fdfc44c.js","4402b5ba1f60b77b9c6d07a477649b8d"],["e65f028c84493793e0c9.js","4ae1a3a8ae5340fec05dfaaceed166dc"],["ea0e35d88d4be83fcb42.js","631ebc9ce315e20056eae28fbc363e93"],["ecfc23cd47c2693c75cb.js","daaf56cd4e1bfa28905faaec064696ab"],["f50cc6e2d249d1591f4b.js","ee6294ece7798a90bbb0980201804ccc"],["f5bcfdf4d9b2ac2b5d90.js","3d1d579e01604f97af0ec1b6652305a9"],["f5d037d779094c119f7f.js","ab4eb2bcf5d13f606810ef2fadc49bc4"],["f6b5fe03bb76596696f0.js","1862dcef34d199b28d73f42ac3731aea"],["f7710ea0c346d72bb3ba.js","21744a53f3c66647bd676971e604e7dc"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fc7759133f24c50e125f.js","edf42a1596ddfd0e22d7766049c8a6f5"],["fe45cea93648fafb198c.js","e8216ed2a8ba078abf8c0f0d35683413"]];
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
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

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

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
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







