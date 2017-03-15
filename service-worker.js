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

var precacheConfig = [["0.95e4c0a917cf335fc49b.js","8ec6ddc9956dccf617095c32e91bc67b"],["1.4c635a0baebedd532783.js","7adf4fc83c692b8a1824761442e97a63"],["10.278d369fff4f813bc300.js","699756d48e02c1485ccd33b61f7c2fcc"],["11.d8f4e041939255656711.js","1f158bd0cf9efd3bdd2dc0f12e71ff9e"],["12.7d9e0239d3dc18543f80.js","97440c6cb8e201c6c812a67ee968b389"],["13.8e569330ac59eea0a791.js","a6eea131400c8716dd89a7e66913a2aa"],["14.2bcb4bde2cf0d2cb21f4.js","11233409e2f81cd73f84bee6e08c7160"],["15.dc7dfbc9587b4aa68d04.js","e61b0add842d4053017d34276833b415"],["16.8004909f3df252b9f14d.js","68ba85013e96411df603e26f7cc8a4e2"],["17.f86a3216095f0df64bde.js","28c2298a7621cb679ceafb2ed1dc72a4"],["18.f60cb20d55d347e507ad.js","d4780983723565ea0175502d4a6f446a"],["19.afd62eef3ae85758d72f.js","90ff8950f925c15d9282169f7deed17e"],["2.47bd276b405e89772a34.js","38a368db2aff6e4ee5e4770af5cdc7b4"],["20.ea1f05a809e76b933076.js","b7dd4c3258935233cb32a1c7d286e238"],["21.9c10f455a15fbf36ea44.js","2aaa5b0a758ffcc1ad1dc11fcea7616f"],["22.037ecb4b77bf0a5b8814.js","09354eca956b34b16cbadaf97c1e104c"],["24.46520ab7b1b96462a710.js","b5cb126019633d548093898b88ccbaae"],["3.c395e07ca5b8fd08322f.js","f80b87d3765cb03b13ab6b116a57c320"],["4.2f6c369f1ec6e8ff0966.js","eaab395dbb3c5c78018371f4611ae883"],["5.f5f2160a94e2f688df59.js","21c7d13886a15b420feb210d51d07653"],["6.23964c05296fda9f21ac.js","f71d17e35ad7097aae8055722344c92e"],["7.c120d9a9edbf0c9fc0d2.js","8fa3105cf7bd8dc8fe41f93a970fe63c"],["8.49d41c72dc4afe9a8433.js","3bbcf9ef858d0fa4163478a11f220747"],["9.9ab1674d9c2e38668ac3.js","c2b1f02e8e73573db2a69dc34e48b1b2"],["CNAME","58e622340325843359475fb423e22b4c"],["app.7636390282e78db5a823.js","8ae498229464f58a31ab5b65ad697321"],["app.dd6fb146ff7653c86d8a9791e8e20e71.css","dd6fb146ff7653c86d8a9791e8e20e71"],["bootstrap.2fe36b8fb0685bfe3ceea85aba2cda1d.css","2fe36b8fb0685bfe3ceea85aba2cda1d"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["glyphicons-halflings-regular.448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["glyphicons-halflings-regular.89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["glyphicons-halflings-regular.e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["glyphicons-halflings-regular.f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["glyphicons-halflings-regular.fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["home-01.dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["home-01@2x.899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["home-02.92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["home-02@2x.c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["iconfont.30e37c3980766e7371abd25fcb45f244.ttf","30e37c3980766e7371abd25fcb45f244"],["iconfont.554125c6746c834d348ebabf7db9e40b.svg","554125c6746c834d348ebabf7db9e40b"],["iconfont.c519ab8f9736e55eddd98b3e9f74c866.woff","c519ab8f9736e55eddd98b3e9f74c866"],["iconfont.e545710268f376f687379a402eb210c8.eot","e545710268f376f687379a402eb210c8"],["member-female.edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["no-item.442a86628ce6a1ba9a0e462385b17233.png","442a86628ce6a1ba9a0e462385b17233"],["vendor.90ce1d19029e5c699eab.js","15d4ef1cd741fe9b3dd89ed27cfc226a"]];
var cacheName = 'sw-precache-v3-easy-hi-' + (self.registration ? self.registration.scope : '');


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







