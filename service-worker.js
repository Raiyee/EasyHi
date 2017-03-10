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

var precacheConfig = [["0.b6e1db04aedbde8181db.js","45b618ac83efe3de01bb70a72e26fbae"],["1.f7fc190e3ffcf6f39073.js","d89832a1c28f22b78bde077415ff001b"],["10.a7b21688259a7715467a.js","76e8b0d95be4c3ec46c07e87dbeb6a73"],["11.c3670fe507b101679c9e.js","68e49b129ed643cb74602b365f37f0d1"],["12.82581be9a12f21aad416.js","eaf72277177d6f3cdf6a0d8a55f7decb"],["13.ef3370b1cba334ff9137.js","fc0d31b61e7cd34b1358e39ff1a0af9b"],["14.6d8e1e1ba334f4958c95.js","6a9b8210f54ec4e9018d78c10a77061c"],["15.a2d7163eaa370e9dba82.js","eebd75d15c229610e9187933c36ffd6b"],["16.1094a6b1503c8d0886c4.js","e2b4ea3263064d2e55fe7a917f145965"],["17.37b283fcfd923c331cdb.js","3ca26058d67d486ab2c38f8514872482"],["18.8e2f7d20d701b70e398b.js","244d4b41770cb8259eaee3d5450fcb43"],["19.71187f9fa6696c457e5b.js","35ef9ff89f8aebbf4c35c0f1aa0a812a"],["2.89759b526a643cc246fd.js","144a946528530ed162b1795b23587817"],["20.bbd09a167905a5c753dd.js","f49a1d190668bae561360ef01ec5a0e2"],["21.0e8807249d1e11ace183.js","2011b030ed78a30e8b708becfa6cdd16"],["22.19fe7fae77890b964ed7.js","b58a9a87146e79f07fb0a2033d110302"],["24.d4731384b26697d433fc.js","c88c8571e718cc6dbbc9f084be31d753"],["3.1a6692e4bca02eb73ec7.js","7937e5fbdf1a1b01bca24a3648830a20"],["4.d12701808ad598cebf01.js","7bbedf4d4ca301250df43275c09a7109"],["5.e94d6ea9b39ec724fc25.js","b635ea2b37451459eaf3d158666a7b08"],["6.0f67cd1ab66cc5ab03b2.js","d10697275b25ff7adcef15e2d177749b"],["7.5150fae6e8f892b0856d.js","e8c3f93dff56aa2610b72bee66178e99"],["8.6bb8770f8162e89aa5cb.js","6588dc3d4880361faf82d974a6b8d408"],["9.8b07672d7c44a0aa3c1b.js","15f3593cb00bf8435cb6d0a055bbf045"],["CNAME","58e622340325843359475fb423e22b4c"],["app.2499ea33b978383d855d.js","04d99525347501e0354af4710d08cf04"],["app.dd6fb146ff7653c86d8a9791e8e20e71.css","dd6fb146ff7653c86d8a9791e8e20e71"],["bootstrap.2fe36b8fb0685bfe3ceea85aba2cda1d.css","2fe36b8fb0685bfe3ceea85aba2cda1d"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["glyphicons-halflings-regular.448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["glyphicons-halflings-regular.89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["glyphicons-halflings-regular.e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["glyphicons-halflings-regular.f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["glyphicons-halflings-regular.fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["home-01.02df33497b5857b1c5601a93d1f0e891.jpg","02df33497b5857b1c5601a93d1f0e891"],["home-01@2x.92078c744ea94765a50ed6691f225ce8.jpg","92078c744ea94765a50ed6691f225ce8"],["home-02.665e39e278ae3c7ad05ec1bdefcf1e4b.jpg","665e39e278ae3c7ad05ec1bdefcf1e4b"],["home-02@2x.0f2801bca3142ebd3333a5be9add0ffa.jpg","0f2801bca3142ebd3333a5be9add0ffa"],["iconfont.30e37c3980766e7371abd25fcb45f244.ttf","30e37c3980766e7371abd25fcb45f244"],["iconfont.554125c6746c834d348ebabf7db9e40b.svg","554125c6746c834d348ebabf7db9e40b"],["iconfont.c519ab8f9736e55eddd98b3e9f74c866.woff","c519ab8f9736e55eddd98b3e9f74c866"],["iconfont.e545710268f376f687379a402eb210c8.eot","e545710268f376f687379a402eb210c8"],["member-female.f0028f3a40df12e895c1a9b6f6ba5394.jpg","f0028f3a40df12e895c1a9b6f6ba5394"],["no-item.442a86628ce6a1ba9a0e462385b17233.png","442a86628ce6a1ba9a0e462385b17233"],["vendor.516cef208d6dd789c453.js","2680e2427be9726e97a0470d10c73b6d"],["yoga.b124d4aa1794ed4ac0ec0be1879afdaa.jpg","b124d4aa1794ed4ac0ec0be1879afdaa"]];
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







