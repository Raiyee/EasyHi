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

var precacheConfig = [["01cbd0e74745964497e5.js","d8dbeb2a0e48a60f73275c979448fa5c"],["0985ff1faf1e58dcf781.js","4e8fc6e6bcb432ae2cd4437a3c8cb13f"],["0b5860e18a54800bb1ac6b09747585c3.jpg","0b5860e18a54800bb1ac6b09747585c3"],["0e2cccd465126048fed6.js","4ddea252b7c79e51c5851b09cafde6d3"],["120c8683d6e09180c667.js","06ca1fe422786cd97377225451b65e5e"],["14346b166dba921df707b1d1f5195338.jpg","14346b166dba921df707b1d1f5195338"],["19b00fbe4ed714a6678015f59a435d45.png","19b00fbe4ed714a6678015f59a435d45"],["1a97b0e64c2a44f10f6c4f71f303f8c0.jpg","1a97b0e64c2a44f10f6c4f71f303f8c0"],["1c69a9da07ad1fb67753.js","f1b15b361cbb471cf5052ca202ba4826"],["1c74b78e32f1600e8778.js","1e5702fa91e4405bdd25277c8a29e195"],["1decc64dccc985146c73.js","5d032073b77d374a74e3fde6fdb583b4"],["203740e748f26a71917681cfc4c37eab.png","203740e748f26a71917681cfc4c37eab"],["2139e9bd2459f988b7e697e8c279dd67.jpg","2139e9bd2459f988b7e697e8c279dd67"],["214f85101134f5a3faff7ff74838f583.jpg","214f85101134f5a3faff7ff74838f583"],["2208292c276039f3dbce.js","1dfc664fbf6e730e7d6c2bb574acc342"],["2344dcab521dde7a5b433ddaa310eb89.jpg","2344dcab521dde7a5b433ddaa310eb89"],["25c6e83cb9c74bf1a601.js","eb70b680fef56e307aecb2d012f87b1a"],["277af2b43229fe3ce10a.js","9f8ed8d2635068cfb069cf77a409adf7"],["2a2db743b432f8e0a0b13e03c7333a3b.jpg","2a2db743b432f8e0a0b13e03c7333a3b"],["2a5e6577937b467464e1.js","b0b71698c219454018b417bcd90e7065"],["2c44dd5f9fa0bb3a8877.js","684341dcbe6746cf65ab1568ffdcef18"],["2cabe5842c77a2bc7ea1.js","20ef4c101f35e61d2ef7b4c56c2eecc3"],["2feee8d11c6de88932f1bc3d3859d693.png","2feee8d11c6de88932f1bc3d3859d693"],["314d834c438ffd0f2e05.js","0603ef38b7b9746a9bdf4b83954e1400"],["33c027a2925c88952bab.js","5521ffa21ca0b8a012d3ce01b7adf049"],["33d0dc72a1cbba38e17d5aa83319791b.jpg","33d0dc72a1cbba38e17d5aa83319791b"],["372c821ae312eeb2a0f4608795d4d860.css","372c821ae312eeb2a0f4608795d4d860"],["37e2832fd85d77531be4.js","114c48f8fd682ca79ff44324c26e505d"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3a5026c23b4df284d7ea.js","3c30fa4d34f7bf695075908208c6c4d0"],["3abd35858d2996af6da62d794d558da4.png","3abd35858d2996af6da62d794d558da4"],["3b638b53048e793606ff3d7a685b6128.jpg","3b638b53048e793606ff3d7a685b6128"],["3b6d767d7d073919a272.js","83852eea730c4109541de60654f84021"],["41ec75dbfa70f824a343814a9f1d3901.css","41ec75dbfa70f824a343814a9f1d3901"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["432ac6595bfac10d8beb.js","d83ff12c1bb5a6285930b0023aaeb673"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["4a88b17e7159f427188cb32c69d6ac85.jpg","4a88b17e7159f427188cb32c69d6ac85"],["4b6e3cb70a25ef18bbf518d73c096c8c.jpg","4b6e3cb70a25ef18bbf518d73c096c8c"],["4c5a8fa7ec48c277bc32.js","66a9fbc18b8791e416b880a918417c97"],["54c331a01287971afa287d4daeacee96.jpg","54c331a01287971afa287d4daeacee96"],["577e77ab407625cc9f30a06941c9fe09.png","577e77ab407625cc9f30a06941c9fe09"],["5a41997f9f7fb21cbdf0280453780b3a.jpg","5a41997f9f7fb21cbdf0280453780b3a"],["5ac1e9a55f3466302bbf.js","4582eb5ebc0674f8460b394239f1385a"],["5b48abeb2f05e6559a40.js","0f6864b9f5a35d8ebc4f2fb5bbb8a11c"],["5e4719268d251372b2d94826b3005f77.jpg","5e4719268d251372b2d94826b3005f77"],["6066e74259326a86c215.js","59265492aa9951e8e2dcd4a2bb4b5f25"],["60a649c1c663152f2051.js","a195d2eb1ab6f2260d64504d782be9b5"],["6307f0244e6a67705b09.js","9ec1f0ebe9d0bd23de6220b476ec62eb"],["663f43ef3e48a61bae68.js","aeec6b935173aa38760b32755eba798f"],["664e53fbae8f6f070ecb24687cb17b2b.png","664e53fbae8f6f070ecb24687cb17b2b"],["6af4d19a369d971c2628.js","f7eb0fc308210c5620d6f4159e6fc37a"],["6b21d58e4f164b31f2b0.js","8db2e984a073c74e7cc14c9bc81589ea"],["6c0be6ab667b4b428859.js","d07b290bf0ce62253d75389dea61df50"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["7425af1240dc68c7732a.js","9daf45e7064cac6f84060554787b8785"],["771cb7c4443d243ee6d2.js","90425323ae0a2ed011b867585edae340"],["77db353723193147a0ee4dd6bd4d12b3.jpg","77db353723193147a0ee4dd6bd4d12b3"],["7980836334b8ed4af7e3205a58b9170f.jpg","7980836334b8ed4af7e3205a58b9170f"],["7a8d98f6ac3fcb2e21fb.js","36cb4172f400e7f19a0594e3c9f23603"],["7fab07910caa048a575e.js","115cff1bda05691da795d3e977d60c42"],["802e416b64f73ee7eca55e625abbf83f.jpg","802e416b64f73ee7eca55e625abbf83f"],["832f4a0743f4df143b36.js","9b6674d0ad172c59d1810969d91a471c"],["86b809b83bd48050a237.js","1e9b5cff81073a71a380e77567c85485"],["86f89fdd456384873172.js","9cbb3cc468569ba71fb86e8e78348ae9"],["88a6c88459b45beff389.js","6ef397726e4b957d78940e1e70583fb2"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["8b29323f74df758c6544193ba1d42396.jpg","8b29323f74df758c6544193ba1d42396"],["8ca232e107295f183129.js","c0951e4e864cd2bccd3bb3ab282bd570"],["8d72619c73e1014c6948.js","9492fe18fcc0acf01c734944e886fa6e"],["8fe40f99fd449bcb9796c336406f9964.png","8fe40f99fd449bcb9796c336406f9964"],["92031e232450b72e2a83.js","ad7a89571ea255bb321f08b0c312166c"],["939be6a49ca41109fda7.js","3310577c936cd7a96b28e6901d64d9de"],["966fb0c786cefbd82b6d.js","f622fe8b260daaad7571c97d5504c09c"],["98b355fe809473040b2b.js","2a0df7d92f90279527ab8c3ac697f1cd"],["98d66e46299fed38641a.js","9ac696851a54964e8f33bf29323af535"],["9b527915732bcabc20427e66f09ad20e.png","9b527915732bcabc20427e66f09ad20e"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9bfc234495b6b3c04c6f.js","c9cfa4e3fa17d1788400b6bb8c425702"],["9c40c3964552e14cb39351b62577f3a8.jpg","9c40c3964552e14cb39351b62577f3a8"],["9d18d49b9f0df6b5996fd952680fdaef.jpg","9d18d49b9f0df6b5996fd952680fdaef"],["9df77806728e72ff3376.js","3a01ca21aa2855a8eef6dfd326ed5fd0"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["9fd8a3000fa86070abc1.js","b2e249fd08d347fce57e83f8f4759bd8"],["CNAME","58e622340325843359475fb423e22b4c"],["a00a22b32dfd36398880b0ef9fa5deb8.jpg","a00a22b32dfd36398880b0ef9fa5deb8"],["a3e48e9350fc292727a5.js","a90e10c182101d1370c1d12cdbb8cc4b"],["a924a58c2415820468a8.js","9d230d0de3760eea61b6c60c076a0426"],["a9cc86190a02cc840d30e3b0303d081e.png","a9cc86190a02cc840d30e3b0303d081e"],["ac85908e562a985724cc.js","43a2f9a089c8482654167e482cd9eb63"],["b0bc1068cfabdc4713f7a26278dcfb5e.jpg","b0bc1068cfabdc4713f7a26278dcfb5e"],["b1982654d30ff3c08e5e.js","c039538f929353ef4fcfee311e5a2f8c"],["b2523b8f4bc31a1728b6.js","fc25705d97becfabd62605068a3a34ce"],["b2eda44e396db30a0d7c.js","56f4f0628a6e717acba627e41502bebc"],["b59d3d0843fb1c94a070.js","7d393eeef3180bd7bdcc9909a5ef4a4f"],["b6bcdedb29be57c3933e.js","33b327c19e5be097c7ab583080707e32"],["b7940ca9757e484ac821.js","a314fa43f224639669cac530a5c17fea"],["ba0a19c5725f1bb57b5c55f413391d20.png","ba0a19c5725f1bb57b5c55f413391d20"],["c1ae25f2efa9c1bcb724.js","4d75589463eddc5007fc4c5aac26d180"],["c2e1da50dce6d35f06eb4ebcf81fba7f.png","c2e1da50dce6d35f06eb4ebcf81fba7f"],["c409fe619eb324fe79c0.js","8e3d1269a6a2fcc1d2ce1323bc56aa47"],["c8e995dfe00779cc6e81.js","404a6d3bdd37960ab123197c7f79c6bf"],["cd5175e70f8ebb87d27b.js","9605c48bd001ac60841f90cb14aca65f"],["cdbb3fbee5fc17137705.js","fe610e3e12433ec92e5e23ac45a329e4"],["ce38f6f25ca360c6b7a9.js","fd4575b781eb79aa0e45d84d6dd28261"],["d4650382e3bd4ff3e7fe.js","92628943b5211f50bfcadae185ddc471"],["d47e45057908f6cccf84.js","ba93dc1bee06ff8da6bc535fb37b8f93"],["d5b06d3ed94813782983.js","3fe75e1407e67c5fe433170b763e040a"],["d7ae379c8a17e18b738d.js","a902b7c66d0409a103b19e37b5558824"],["d96e2c44d58e8a97df834c39ade88936.jpg","d96e2c44d58e8a97df834c39ade88936"],["d9824a2e18ba83eabc87.js","74d45fc6e683f1c9f82af6d179d2ddeb"],["da11685f671840b00312.js","04d4d7eae92e329f778e6f1fc683835f"],["dab719079a51344942b3.js","1330819eb3347050d8afb5c525aa44a0"],["dbfd23d5444c3d525bf64b96324126bd.jpg","dbfd23d5444c3d525bf64b96324126bd"],["deb8cdcc0a73deb677069db3987299ab.jpg","deb8cdcc0a73deb677069db3987299ab"],["dfea8d54f94eebce2d4bb05c58c0e53b.jpg","dfea8d54f94eebce2d4bb05c58c0e53b"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e65f028c84493793e0c9.js","4ae1a3a8ae5340fec05dfaaceed166dc"],["ea0e35d88d4be83fcb42.js","631ebc9ce315e20056eae28fbc363e93"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f50cc6e2d249d1591f4b.js","ee6294ece7798a90bbb0980201804ccc"],["f5bcfdf4d9b2ac2b5d90.js","3d1d579e01604f97af0ec1b6652305a9"],["f5d037d779094c119f7f.js","ab4eb2bcf5d13f606810ef2fadc49bc4"],["f7710ea0c346d72bb3ba.js","21744a53f3c66647bd676971e604e7dc"],["f8b709f9291e87940e39.js","38c8de1c88b41a0ed86bbb29cedf2f74"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fe45cea93648fafb198c.js","e8216ed2a8ba078abf8c0f0d35683413"],["fecf78377e2980cc9d7a85c423f79ab2.jpg","fecf78377e2980cc9d7a85c423f79ab2"],["fedbcc7d7b16a61cb18325d22b1d3fb4.jpg","fedbcc7d7b16a61cb18325d22b1d3fb4"]];
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







