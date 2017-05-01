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

var precacheConfig = [["00aeaa31f091952cce22.js","793d7d97e97242dea5c68df9db9d3929"],["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["08398eb4267f90cea3fe.js","aa9cef113a541064443d07f0451fb21d"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0facf16009f158e9c779.js","c7afad5e1cd8d772c7af23a63a52f4f6"],["1176d777aa6fcf0e80db.js","eb1bbaba46e81edad08d08548bdce313"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["15ea8a718c28f957299c.js","ca8b7edd0f860c5558a8e89d63005988"],["172e43660ac947653a89.js","dc6af6539d65861588ad99a953273145"],["1dafc0ac08f5248a1259.js","147169cf9f0d239f1b7b3f100c44b3c5"],["1e09d8747721021ae180.js","dc87ff6e1b48df06e706cdd50381c3b5"],["1e3d658df29d91c667fd.js","f4ac910978ed16b5fb1f24191dfa6e2f"],["2064846db2aebaf22eae.js","023817192822c6d13c4b4ed9bc0a8fb0"],["207c44e8ebcdffbf70e3.js","b1baa5fa96b0ea635e96deb03e615d36"],["2299fc335100a4d30159.js","666aa304fedf847117f6f19038809742"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["255a0179c68f872b34a2.js","e6c540e11a0784101e593a29daea4c6a"],["2b1c440dd1ec3956fe06.js","cc1ab8013ea179afc5f5c85c93730cac"],["2d686b318989cf920e70.js","a72c7e4f74e6a44ec5c0c82133f7219d"],["34628bf670bce64b0956.js","fe5a886c5f331b082c90bc0f792c2801"],["37e0634642f4474fcfbd.js","abd931317acae066e0c2cb9617f61505"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3d3f9d9b3ee69b0a4750.js","1fdfb01cd997403999b85c9b247b81db"],["426f5ece510801a4e1d2dae122b6ee60.ttf","426f5ece510801a4e1d2dae122b6ee60"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["4b21f5409e16b6f0cb9a.js","9fa8ee47b15ca935b41f92e17702bb33"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["500ea57066290407a019.js","ca9cb66034724f9e46062bfd3e23fe18"],["502c9eba0ccded79a7ba.js","a65d46967df8d8459b2f351b75f53357"],["549c9ae8be74edd88f14.js","70b9c96c952ab38a48cccd3e69a8c26f"],["54fd6542a55f60bfa8f9.js","307a7a8e3006f39bf2a2303b047e7b43"],["5ac882f4488d3f789f1ea6dc2202f1b0.woff","5ac882f4488d3f789f1ea6dc2202f1b0"],["5b62fcb38198ad729861.js","53c9ec7acc1884bcada694bfcabaa316"],["5c1e0882ac73d91652c7.js","127967dd41ce06ecbe535fe15f60b345"],["6057b3e39f1bc2b99b9c.js","493b2fe68088cbdacf7b42115c26b2ba"],["60777e1cbe7460755a9f3c2ef491a77c.svg","60777e1cbe7460755a9f3c2ef491a77c"],["61aa1d7848afb766acd6.js","77abb28d59ea259b1b20ddf81ab28ff5"],["62f5ae7753f68b59644c.js","af6e90df7a762f3fbcf8ca49e4be682b"],["640bbc994d23532ab4c8.js","909432b864d1ad2b7a344dee9f219d9e"],["6424bb7b772ef3ad1725.js","606e6c087a94026ac48d9d56fb650f80"],["6c32c8e0609b56469ccd.js","39a89348131c6c6190fa5f01f9467ad5"],["6c962045343dbb52bf5a.js","75b550eef5d90ca9b6c03df5844a52a2"],["72379c28a1cd705a79f8.js","d23668dd2a35a031604c6c28c4aa3521"],["760ae584945b5de409bf.js","8af71709a84d0d45dd4072de115a060d"],["767fcf2cb5559f102679.js","34c5a662b10ba88fedb83d9cc78120d7"],["76b9a910fb9b85dedba3.js","a2e3b7ff553d5678fff61ee27db2ebe1"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["7747c3391cb12001ef4f.js","48eb22ca105bb1500a75d4e9b577aa7c"],["78066c38f0696bbc8c18.js","ea6b1e891dfe26baeb7b650cb60b5974"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["7f54af827e15ed002996.js","2f3f4f19b3a3c4c1d0ac78a718bbcb43"],["836203878ef512a3c423.js","67222ac3b8247e5ce25fbe55309e7c46"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["89924379f8b1bb6bc592.js","6c5141a7f98f5bc8137751f6fea66a92"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["92fd151b7b4a8b092f65.js","07d44a1889c221c11e68fc7c582773b2"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["96c59638c9cf13f96e69.js","c262642eb96873187c44afc893f4cb25"],["96d528c1eea615c25420.js","9337bab9d9d40f1e87a39281db8dfd25"],["96f4d64b263af3122f70.js","38f6bdc7bd2ee5b4d433e8a718f672fb"],["98d8a0490afdc0b84fcbc2015a427204.eot","98d8a0490afdc0b84fcbc2015a427204"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9daa241afdf47e514ab0.js","29f22396104a9a2abd478b2001014199"],["CNAME","58e622340325843359475fb423e22b4c"],["a190acded15a4737267c.js","bde82f0797a8191b7abbb50c57d02a94"],["a22394d04cee5a8319ba.js","03078795da9a1e9a637196377e023200"],["a4fb87927792e9278225.js","66f1abc15d2c0afcf7e22cd022c173b0"],["a738f3215fa3fddba96c.js","093909dc75de83086e7d7c7925f9dc40"],["b54acf870f4ca1bc7cfe.js","afee0c03788b3020951de18a7d7645b7"],["b9d6aa7e000535e8cd55.js","a41cc98a5e7819f8e28bbb22e67b2500"],["bd05318eba584c9e07fe.js","f1973e97423fbf836add1742b29bda78"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c36cb346160a7db24160.js","efb1935fb80ef5ffa52bdea912aa2137"],["c39aaf1eee6f9e278a94.js","846e621686f1604098680c7a67294c89"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c7bcc8a9ac1f90138b57.js","0979f986ae5c77c48bd1f9d823d23cb2"],["cab7191d2004d6e2c9a9.js","abca12f77ac5c4ebbf1534bae7dc356d"],["cac2120ff28a08b0e4a7.js","c538d2c77cf8dd51e23e7e60e368395b"],["cdfc53f4333d934bf128.js","181d8175f39ed998e3b1f085ac36e0d8"],["cf31cac57577d1739b50.js","add955df780e3d30832107cbefe0b165"],["d0a2273caaa85d18a72c.js","5557f85b539aaa24c1122758fbbd1999"],["d1b48033a323c923f3ed.js","5dd06bbeaf043319e1a071301880cca2"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e2f140f9b7cb5b4e4d63.js","027b9e9b89205247a6ab8e81c7e738cb"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["ea0ea14603c4863351ef.js","a5a4e49c75ebf44443b4afe420b36dd8"],["eb6eadaa70cbe8d48574.js","c7fb0bd8ddb79bafc6d46640c679e93e"],["ec607491f0293a2e773b.js","e04395a302b98393346689b60df18215"],["ed879feb848518b44156.js","bb4d10e4d91e3ea478793492c3024c74"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["efa29cc4a373738fb982.js","e40670ea24e5592c1cfea5869844577e"],["f033c969e2c5fc767009780c6b880eaa.css","f033c969e2c5fc767009780c6b880eaa"],["f03b6c968002788dab72.js","efec9a888a0f8edf330933de17a0b114"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f50c474cc984f95f4e65.js","0ff45147c048d6fdc698bbb091d72730"],["f7397e529d7f146b40a6.js","95bfad80a992e6931ed9a227fa76100e"],["f8bdb94a55068834ab4e.js","d6e28d1862adcd6d99fccd9c7b47c780"],["f95c2d482be04140998d.js","734d97669d4ee8919a41cc8cfa144ddd"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["fab5f924d9bb0cc27289.js","ea7db90535c9b5da2f9c75fc8048b94d"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fd5c2014ca2c5106e60c.js","055931ea8c183b9ed4b13de8d8f038fd"],["fe5c5e40f7926f358c1c.js","184af4ad78fa34052996017d8f24b6fa"],["fed6785d4c8275454a3b82e22199b7a1.css","fed6785d4c8275454a3b82e22199b7a1"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







