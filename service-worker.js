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

var precacheConfig = [["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["02b48fd3f9eff8f8c04e.js","c2a72bc871343054ceb9c9087b9661ec"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["08398eb4267f90cea3fe.js","aa9cef113a541064443d07f0451fb21d"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["11160c75cf4c7d1923a3.js","a57405f26f5092fe41760ec2b1f5c4e4"],["11254140b8fd9b110e50.js","6af1bc04fe54f9d9ce625bc76862f575"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["171559a57581a826cfbb.js","e9bc8d2e70e562143c914667aec00ba0"],["209c3e18af82b050e508.js","2f7fb4fe57de89ebb86040366166cd8c"],["23977671bf942e84e880.js","3beb4cd6e397c9c1703f65390c7ac44b"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["2e4bab4ceb34a9d1610a.js","10a827a3d0e14b4b9df1c45a9eb24553"],["369bad93f8ea652902c9.js","885b2cb5eae93feda6a3e6b9832a3b21"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3fdfde9ab19a2be23742.js","c6dd04698b7923e16dad3209e3732c5a"],["42613616567432d3f237.js","a630686099ab32f1c57ff8fe16911a3b"],["426f5ece510801a4e1d2dae122b6ee60.ttf","426f5ece510801a4e1d2dae122b6ee60"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["448c776cd1ce148a8f94.js","357894ee4b8bc53f41fb42cf75e2c3d3"],["45476a76692f26623bbe.js","6dbe2af1efa4c10cd8cecd5d025c55ea"],["45c7f423e7d4110adaac.js","c54a10d68565336bebf484c06f41d721"],["47b1ee232eb148b5f299.js","de3126be7fef7e3a88bbfd78bac86c2d"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["4cddcfd38425675ccb36.js","12114c01fe40d4b0107358593cec7b17"],["4e8a4fd835ec87da24a3.js","d7f90ea16139efa9f542ef2eedd8c547"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["5098f0797af1c78a94c4.js","4f5371be0ac3d7041354fe9027dfb2a8"],["59cc6154c4e68d2d8d72.js","f5b5a61bc5223bf7f6f0876faf8de3f7"],["59ec7ad978ed94319168.js","a4d69d43127c3f6e11854fc3280f3583"],["5ac882f4488d3f789f1ea6dc2202f1b0.woff","5ac882f4488d3f789f1ea6dc2202f1b0"],["5b62fcb38198ad729861.js","53c9ec7acc1884bcada694bfcabaa316"],["5f47fe957f5e52c9c295.js","825322429515ee9feba1448cec20d955"],["60777e1cbe7460755a9f3c2ef491a77c.svg","60777e1cbe7460755a9f3c2ef491a77c"],["609268bdeaa12a4834e5.js","a2196509cdc3051ddff2e10aa748a6e9"],["612cf6b682777986da06.js","e8f1f4f7fd116fed475fc0d7a443c6ed"],["62ebdbe518ec205449d7.js","f7a130c8a9b9038289f38dbfbf49eb5b"],["64e6d1d827bad05c3e2b.js","aa255503e99305636d40ba4d61bcf672"],["65ae7d33200c1f4815c2.js","cffdbe006ee50bffb1770e54336e7deb"],["67d4f6a9646405d025f8.js","750b4821195d595eb4f882ea7fbf3b24"],["6a2185596b8fb02824f1.js","e3c144da3860d47f8c7d064f347b64b9"],["6c962045343dbb52bf5a.js","75b550eef5d90ca9b6c03df5844a52a2"],["709c8993ac19ca30a471.js","bff1afe601945a97a5110f0cc708f463"],["70b86f83ffa9040cdfae.js","ffe6f0c6b5eca00e449ac76b1d98d278"],["760ae584945b5de409bf.js","8af71709a84d0d45dd4072de115a060d"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["771c5cb6398c5c0bb294.js","163f15e42614c599be959d5f9dc88633"],["78066c38f0696bbc8c18.js","ea6b1e891dfe26baeb7b650cb60b5974"],["7d064a849ef1c50bbfb7.js","635bc1a163f401f9e5a83fe092827561"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["80ee7cd3702222a2c4d1.js","fbce2aa232dab17018049f988f4a6487"],["82aa76d583c02f1fe915.js","980fb0d7f62eff7d096ecb6bec66f29b"],["8393d3fc8161a49b9c7a.js","af95eb5723725e40afc3c3e6cf596715"],["839a8c22f0a1bf36c294.js","396ef013bc2833ec32e7bd8d5ae8fc6e"],["8480472fd01ac8023da5.js","6118f5d58c2de3c79953330a9aea0ce2"],["85cd20ab83bb24cbb2c2.js","d172612989868671aa3053bafcae1d3f"],["8627e769887c6bb2f2c5.js","b3643b236a603b1f8a65b1a83d9e0d18"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["8848c0ca10058c8f444f.js","87416bc92ec4001682e14e577d87d8ac"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8fce683b9044646c4f5b.js","4fb0c5483a22b498e30fc9167059fe02"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["913ad4c320568d6c52f5.js","9760eba64a34007456b57f4b0009bf9d"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["96c59638c9cf13f96e69.js","c262642eb96873187c44afc893f4cb25"],["984f049b28b145fb41ab.js","770418f52889e1c3d0eac0edd6bc3626"],["98d8a0490afdc0b84fcbc2015a427204.eot","98d8a0490afdc0b84fcbc2015a427204"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9af4456aadba86ea02ed.js","ce926a54e99d11afcf5973885cbe0439"],["9d3dad42277bd366a613.js","badcd4cf48c48e5e5541cd3f820721f5"],["CNAME","58e622340325843359475fb423e22b4c"],["a7184feebe4db5d0f319.js","d1fab41884457ec817e576ca49fd7532"],["a8c3d93e824cf0ab115c.js","eacc583252c86eb459e05627df4594a4"],["a8fa7149f107adf89b48.js","8550ee9834c193feda148f66f79c95b1"],["ab8d317602b50a58f32d.js","3b04b4f0bcec745442601f78cdb189dc"],["af12832f206d735bf9d5.js","065bef7113941f8919455225a1e141b0"],["b4abc1070a3e92904b0a.js","157810d8242499ff357d07b91c77b1c2"],["b8f6df9dc46d82eb552b.js","687de3751ca34c677e21284cfa7b1417"],["b9beeb9a0709d6b3c45a.js","87ea589413e70673b8f6f202f2e3018d"],["bcf76a6e4b65e4508d2f.js","8adb42d4973d9fc5ef37ff0f5792d8ee"],["be64e905d8f7ccb06984.js","6fc4f29653756d03cce5569f7341210e"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c20c657c83c42fb41754.js","62edab8d1c85eb1ebcc09dca99563fe0"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c9ed62ef365598f9414c.js","7ec0b3b925cd0453a0f16863d7688c71"],["dc7698028592e136024b.js","c9dd66788fb5c5f463ba577b599134de"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["de67a7400f04b91215ec.js","c1fad221ffaa2e2625908fef8115fa17"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e1daab41853b2ad6e842.js","76bef7b87a9c3473ef258e77ba07a541"],["e2e277cda44bf1d9a4b4.js","0686390606e6903ddd7241c152782c53"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e58576bbc0e82cbb79ae.js","9cef92d2d182077563e72bef1b6b3bb3"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["e7d990fe212096a6001d.js","02cd435d14a5056991f02fc60d602364"],["e8655ce3e2f8d80acfcf.js","7cee2def9e4d460aca056efdd5f14fe6"],["eb81b66cc25a97751f1b.js","8eaa9e3c7445c9dbfa6e96583aee1268"],["ec607491f0293a2e773b.js","e04395a302b98393346689b60df18215"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["efd8cb94b89218ea7ed1.js","cf67bd528fd9552532cc6b60e76064bc"],["f033c969e2c5fc767009780c6b880eaa.css","f033c969e2c5fc767009780c6b880eaa"],["f2ea3af3d8a6f65110cc.js","3c2d39e829c9598ffd7fd5833101cee1"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f95c2d482be04140998d.js","734d97669d4ee8919a41cc8cfa144ddd"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fd523dc7a65eed951b8a.js","6cc467fd14e31d788fec72638ade91e2"],["fe1db99f881d37826fb3.js","05fa0044110abadbd15fadeac3ee5ad9"],["fed6785d4c8275454a3b82e22199b7a1.css","fed6785d4c8275454a3b82e22199b7a1"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







