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

var precacheConfig = [["00dde5e237dfc9c9a0ac.js","f1ea1314817528f9243ded18c6384dfb"],["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0c25068b0bae651243f0.js","3d5ad4ca3fc8aa23596d072352ab2f12"],["1218f7a6e874ed916a87.js","28c5b233fb65a07cc7d880905b81a44e"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["1997c626d0e51deea59e.js","82ad3a7e677b24f4629b317b311b0c04"],["1a4986da6f25377baaff.js","f9d7f8feee3ccde424dfa549f27dd796"],["1aba712e4e586843d947.js","6e7761d0a97a615b63526d819088551e"],["1ae17941b1e13eeba0a1.js","7cec066e91bbd353d5fae4836f26d101"],["20ccd6e3f6c63507d69b.js","caa076b2de44edd89cfae1bdf9257cef"],["21a8074439ebee7f1acc.js","9a8cd3c266b1223389fe325e23adcb05"],["2403dadedac2e6294547.js","71fddd0bd86679672338a42e325c5f35"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["2521260320599b9ef4bf.js","0d43aa2ff661fa1f7f2925cd2937aa42"],["272a68ad492875e91d1f.js","7691a4712638f2aee6ae7575313e7d4a"],["2849ec56556533f5b3ec.js","91771a80e772c2a44adb72243a332988"],["28a361dfa7a408686a91.js","6c047eadf6daf5977a049f36eda06f58"],["2ad0ed7c9158da0aac50.js","96404f2d09c9d30a58999b668a161a9f"],["30f5af8c88df4151140d.js","7cdb53a62a138a2c6dee99ca2c7e49c6"],["33b20c4a39c27642d582.js","da891bca645030e279543d4c1b7f863a"],["37c920e82c70dbfbd7341fb38013a4ac.css","37c920e82c70dbfbd7341fb38013a4ac"],["38de56b7ac17b9f3bbe9.js","9ea4951f9ea69150328b8395d0384276"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3a6a72ebcb64e8c8ed8f.js","a28adba973021589775731a6db5cb292"],["3b44133bd2f00f82d62f40cac3c5cb56.css","3b44133bd2f00f82d62f40cac3c5cb56"],["3d7f0d7a523e84a73ee5.js","6ec70c1f9c39d1a91b3185f2471ee24a"],["3eef22327d897bf6ec26.js","559668f9d23d14ea30ad6f4fd825285b"],["426f5ece510801a4e1d2dae122b6ee60.ttf","426f5ece510801a4e1d2dae122b6ee60"],["43a9737bb6f9af1a699e.js","8d5c997c93129ca68de373dcd625f0e4"],["4402504aef9812353513.js","f003c235d70e1d2c9cc82b8a06ba810a"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["44972345db93a2a948a7.js","97f1a861398221f3de289d28bda47adc"],["4548018dba65e9d385fe.js","c40f5cfa5953b322a3e8e370bdc3eda2"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["49325b80dbbaec1f0f10.js","a0cbd73c25c86b37961adefa429a0a0e"],["4a53bd4a14009e3d6e13.js","d52d4971b396133e3bd7ca405303bd50"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["5340f326c01b941782a1.js","37a473677d57c8b2e8767b2835937f86"],["55a488a6a620a276836a.js","afb53e115321eb92ed0e6b2dcee04c9b"],["5ac882f4488d3f789f1ea6dc2202f1b0.woff","5ac882f4488d3f789f1ea6dc2202f1b0"],["60777e1cbe7460755a9f3c2ef491a77c.svg","60777e1cbe7460755a9f3c2ef491a77c"],["61bd4976e1101c1ea86f.js","24cf62e4afdc661250f31d2bb752396d"],["66933168be793807c235.js","0f0b9d0684c12004722e7cc875a3a8db"],["70f16e3c6cc60ddb312a.js","75276d2aada0e8126c00711a95c31822"],["72862c1e33abd740d3e0.js","2768d02d2adea4243e3a9990bc11b736"],["768581ecadc377d406b3.js","5f4923c834a9ef8076cf85ad62373f8d"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["778aac71842c4fd4fa43.js","97dc265036b317b19a31fb4f79847edd"],["7a9b5e698349cc99e930.js","1e33001a6cbf969658b42fd27d2461a7"],["7cd019b8ad33552f9b01.js","7ce545d5fbf19c5f250a5d9d0112b0b2"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["8027c26a93389ec64e63.js","e09bdeb6338c0e957349b451e33896e3"],["808f25b933c0068bcc78.js","21595e606133218c0c92e9cb7176ff8d"],["8170cb54a8c0bbbfee43.js","2bcdbb142c3113d5aabaa8d62267d5ce"],["8533e0820909757aa443.js","36ee251bc435ddac7409dd913bdafe74"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8bfda238889c1ea5082d.js","b1c8f302786779e422c7e2cd94932239"],["8fee14a3732b73711349.js","bbc38cdd498ced2dabc29eda1ce17111"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["93849b20cccb1fad1ce0.js","1d54e84b72a205b2df85f60a1b246de4"],["98d8a0490afdc0b84fcbc2015a427204.eot","98d8a0490afdc0b84fcbc2015a427204"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9ef7b01e7889f000938e.js","f6e306adcda88f34c6f41adebe36c285"],["CNAME","58e622340325843359475fb423e22b4c"],["a0ad0495bae1a3cca936.js","430fe36c43f590ed60b3ebc4a525c57a"],["a8b818f6b9af9ffaa920.js","934b56c186fb8b756ec6d59878523f7a"],["ac36569d15eb1f4e8b1f.js","51cb2d6fa5ac172c9154082361442d53"],["b4270db47ec7be2072a9.js","ba9f98b46c821203a0008f71c161458c"],["bb799d62d4c6d5e867e1.js","7101460a18170b45637f58717a0608bf"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["d0a5f66164170fb59f12.js","4a69017a4340e87a73fb51f054a7a03e"],["d4e9186ef3801aaa6e96.js","b37ca795046ca992bf410b810695cbeb"],["d5b356766a48bba98a2f.js","7273243d84508fa7ecd24bedff8906c7"],["dba0314e9531d6cac3f6.js","e64b5e3835b61352f9fc9ae1315f5fdd"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["df9042621b9a1bce8c82.js","6fd44cc6e1973cc2b2a52a6ff36ddad7"],["e0fc07d4e49ab6ddbbc1.js","d3abaa08a99086dda88ecd414e58a6f2"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e2ead44e3bb15d00393f.js","9f8d794879311d37512ab75d0f1236fb"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["e6fca169c7d3e8a41691.js","8a27b08a30cdd6b6be2500e9025ac6a8"],["e90cbf5902bed6b63009.js","e56dd21c7703f7c4c124a2cfe5585848"],["e9a582c8eebb1c89d97a.js","db2ffc11fb976388497338373b02577c"],["eafbd6a6639f9aebf7ed.js","127b008c05bf879c0ad064442ebc48c6"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["efd21e2c9ebd9e8badde.js","d3b97d82f077958195bd886e142d2014"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f47b969a3450f3de085c.js","3cc6c2fca894f5bb95b1fcd2f201eff3"],["f6fcc493448bfbd554db.js","1a65e0d3960f1ede75042f046d69fcdc"],["f724057ac4e206047d85.js","7e4c9a0b3b28947e8a07b18764e5051b"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["fa42873343688fc0c806.js","db01039695e2e4b3ed54bf6d83dc9a68"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







