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

var precacheConfig = [["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["06c07425ea6aa8ef2f11.js","a46df0a8794f24917b2159cc7794da03"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0ab1f176509e7dbb9d62.js","1abc972c40b09260800d951ef7ec4fd6"],["10466fac306b54965d40.js","6700dc9096a60f0d1d857d580f3c02b3"],["1258916694312dd533f8.js","8a11477ed5f62eef17862b0817c09b0c"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["16b3f2d0790329607694.js","239764158ad7e0ac370d1221efd51f62"],["1869bbbe5a2ca07bfadf.js","963d860fc541463174136ebcaf1a3c82"],["1ba2927d61aff7c814ae.js","ed6acf1f5740c25593fe830bcd9be8bc"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["243c4c59df2a87afce60.js","3d78d697556924121eb0c581108113a3"],["24591033951be2cbdba9.js","59fc43c7bf98b300eb6a2a3b66715c18"],["24b5451b243a7bb9b4c6.js","57467cf952e17c578d49d5ed76dbe0b0"],["28b32c3369710269a036.js","08fe811f163318f9fc86b173b3434537"],["2c9fdea529c4afdc0b17.js","aa81ae6cef876c32b4fdee13478fecd8"],["2e16400aaedcb96b5795.js","d6622e5e28889fc4030370c79b97bafb"],["3264cff5d4c2f19f571e.js","b962d8bebde35f079f2ebf04a2ef04c4"],["37c920e82c70dbfbd7341fb38013a4ac.css","37c920e82c70dbfbd7341fb38013a4ac"],["38a7aae90202e2f59c38.js","859409f792ac9ef980e9068eed3735d6"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["39efa9c25c3a7272bf9a.js","d3c2c5707127e84388a594faa6033019"],["3a5e3c18343ccd9c884c.js","395f171d8a4a80a47123300b15041666"],["3b44133bd2f00f82d62f40cac3c5cb56.css","3b44133bd2f00f82d62f40cac3c5cb56"],["41215899cfac7c469596.js","fae29f604c94c98c8bed58c342211985"],["426f5ece510801a4e1d2dae122b6ee60.ttf","426f5ece510801a4e1d2dae122b6ee60"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["46677cd029be5adfcc0c.js","ef498547f448f8063eed7e5a1c7d0a56"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["48b1a8ae56d87e52236c.js","6e33046a3359816cd49ddfd98657051f"],["4b61072014a0ce7b6e74.js","1bb8aa3d2c7c8a1ee6b0733388d2cf2b"],["4e25f7f3940f4490aad8.js","d865bdad1ba46abbb338931ed1ff6438"],["4e69e79acfffbc6224d4.js","7efb4f583ffe32990c1c350568e220cb"],["4e70791e189ae991a7ca.js","aaabaedacd52f07d6e8133438242977c"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["5284fbb95e0c98ac2018.js","ea588c578340e6d511907ebf521d5afc"],["5ac882f4488d3f789f1ea6dc2202f1b0.woff","5ac882f4488d3f789f1ea6dc2202f1b0"],["5f2b5fa4bc8126fd575a.js","112636f74546f293de3aa9dfe99103b8"],["60777e1cbe7460755a9f3c2ef491a77c.svg","60777e1cbe7460755a9f3c2ef491a77c"],["64c2919d74cba81014ef.js","9d44ab4dba7b4e8c6914f5420508f7be"],["66e0193b9e4339bcbec8.js","5696d759fb0faedf85e38a330fdcd1cd"],["6813684dcf44aa785b08.js","f16fcfb0f686532cf0e3ac4d7ccc40d0"],["71e74a93591748470046.js","bc011bcfc802f4e21ac4ab51300e207e"],["76e1870d39ac2a6ab6b3.js","ea9b54713d9dbc53f09243023a269587"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["78a254e3c3479e8fe62a.js","7adc80a9f74c42158e6a3a2056eb3e7e"],["7bf107a22a742db943ad.js","c5ac5107047929d7f7b13890e5e7d8b1"],["7c72a959b30075b7b489.js","f97d47270bc518c261fac149045cdd60"],["7e3c84cee2034957cc11.js","d54bc8db8ff781aea6c2a9e416d7b135"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8be4c387dd6bd97c9c6a.js","b5e71a05790c494af9db10cd49d5a081"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["92af0736f56a7fd5d2fd.js","984c2a383c6fee869301bb315f797dc2"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["95f868f783e43ba1834f.js","e3424f4ee7a7b68a07f47ec13b805dbb"],["98d8a0490afdc0b84fcbc2015a427204.eot","98d8a0490afdc0b84fcbc2015a427204"],["99c1b471818e55a6b149.js","c5ac8ded565eebf04b7d4d228a4ccff6"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9c2801b45911b3f17357.js","ccea8ea66ed517796dd4d450f857db50"],["CNAME","58e622340325843359475fb423e22b4c"],["a001d12315163baeac4c.js","66a4bf3e1702b354de9b944a074d1533"],["a177941a509b2acd9ac7.js","87e60f79e86b30c9e2deafc05e95176c"],["a55a49c82ff9fabc0722.js","bcfcafa81839cf2937a08d1c77ec441c"],["afe72b7faa4d6bc5822b.js","47ff1741bc8acc84c363d9d681a694a9"],["b310e93baceaf9e83a78.js","709a405eed6f079baf9855620d59a87d"],["b5d09d79820a9f948e8c.js","e6124f185cd27f01460ee5529af57bdc"],["ba26ceaa214a5bf67884.js","249fb063e98af5f345785cb1eaec988a"],["c097cb0f721d39c91e7f.js","254a6054d1824ee6ef825b6a533112c9"],["c1cca222d2ab54b8e60b.js","f626446a3cd8c952b1727e07bb60eec8"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c72e69b9f1701f2a6737.js","2cc4a4eaa11848dd830345dd592612ec"],["c781ca2c8496a87b02b1.js","bd964f7e596ff81f3c08d2c748eb477e"],["cbb80c191b14c666443a.js","a2d41689683e3501bceb652ef7847430"],["d1ad683b7e43c566dfe3.js","1a088cedc6c0771dc122e83daa33d742"],["d2c9dbf0b7b605aa476b.js","aea5a4a690a04422d251a0a94467191b"],["d54496abd7f12794ef58.js","1b072360aa8da09d30e8eb190a6fd57e"],["d6bbfd685cf280e9452e.js","f61f96d44de5a0894480cd18d6af9af4"],["d762fbcdee67c6bc3131.js","e3e6312e804083a05d53c5a478146f20"],["dc42c3a1046145c4747b.js","14e937b3cc1527467c11687d4a207c0f"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["dddb2b6ce9c838b1a62a.js","407d96ac3c7157aecb849d5496a5ee4b"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["de86c6503b50253e8765.js","160a35b9c75ad0c9183ad3f6fc17dd62"],["dffb46f38250824c0b79.js","b980a159e918c2a5cd74c9f85116f1d4"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e28cbfc2ee8341f1765a.js","7d580cf826697b2100e59dd6db47943b"],["e37801c40062152d1bb3.js","c868fe73b33c4e12db461dd3a963b63b"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["e88ce3c50c8b3ead9c9e.js","8c4da4eb30354952072b08cba6afdc8d"],["eb413314b637aa5cd791.js","2e5c9839659834cccbbd75300cbfbe18"],["ed674b853118110d8c33.js","3571d62901310e13ba3e82f60ec162db"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["eec887bfac740d216857.js","a125d73ee2a91630fbed0e0f5ea793ef"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f94b7458da92554e668f.js","27eb2b387cfdbad6a0c1fb014dbcc0dd"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







