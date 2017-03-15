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

var precacheConfig = [["0.606e85d867dc08be349b.js","497de8813d884670205e6d833ad11b69"],["1.e838d095acaf191f4daa.js","9def882aef7b85ff29a9b4b855068743"],["10.5093c7f8d11390ad82c9.js","422a25d53927af39cb3526a53173a5fa"],["11.3bab6064f640eb608740.js","66a9f6cb602a7f3282b430845d67dd61"],["12.1088ee2c74c6dce945ec.js","f6cc8341d3996db2a866406b342ee7fd"],["13.bfcf1bdcf80e6555eecf.js","e0716c25aa4b57f65d2b3cd65620a6ae"],["14.52f9dda38de791972b5d.js","17a014cf74e127e3817f1da14c77e37c"],["15.e7292641466efa932e6b.js","65890999f80f6cdad727165856cc313d"],["16.372fd961e9444fec3da6.js","3ba602ab93a12ed268f29b49efd57bfb"],["17.d2eb53e65d40e2347738.js","f1804b6f416ec902a2e0d45c62af5884"],["18.d4d2c6ba80a0ae2f41ee.js","71bb1e95a6bd0a0ee00cfea2f7d96aa1"],["19.e44343c3c9f1b4cb7e0e.js","48aae55a698e714573c20f0e061caa88"],["2.d30dce30baa79e061369.js","7a8f59fcbe0bcd835f140308a2230d8f"],["20.f2f4e152eec082e0b077.js","2c379444e5f3b51db8924d767ea25e39"],["21.88d86812f98781f1a251.js","c8cb4bdd580f719992a92c6e5036a3cc"],["22.15d4d30afea3c69c7638.js","19b3be283fd6db50f9889dccd5d10924"],["24.3cf27a3a76e255e17e53.js","1ef67bfea326d1eec7cf8ccf917f86da"],["3.34e5d5df5739466eced9.js","4d5b6c411e1a337ea2559feae4325240"],["4.ae1261cd05feb50add1f.js","2ba0ed6bdbebefcfca885d1b61e280ab"],["5.721b574f74d1e45f71bc.js","8fbf969de6ee1ab846f1502815fb9246"],["6.744c4c9d76db6f9d32df.js","033245907197b52ee6658327fbc3b521"],["7.e019108626d34c7d5a75.js","94105fe3e003518ca0ca9afb82e95b7d"],["8.fd768cfb16aa9282e394.js","4a8d3ca1a3e2295a35cd720068504bd1"],["9.ac35ba476056e5c165e4.js","8f7d6c49e5ed3bbd4b427c20505738ed"],["CNAME","58e622340325843359475fb423e22b4c"],["app.732ec46fd0244afc3384.js","5c5e4de7fd352ca15969479a4136c235"],["app.dd6fb146ff7653c86d8a9791e8e20e71.css","dd6fb146ff7653c86d8a9791e8e20e71"],["bootstrap.2fe36b8fb0685bfe3ceea85aba2cda1d.css","2fe36b8fb0685bfe3ceea85aba2cda1d"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["glyphicons-halflings-regular.448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["glyphicons-halflings-regular.89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["glyphicons-halflings-regular.e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["glyphicons-halflings-regular.f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["glyphicons-halflings-regular.fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["home-01.dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["home-01@2x.899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["home-02.92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["home-02@2x.c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["iconfont.30e37c3980766e7371abd25fcb45f244.ttf","30e37c3980766e7371abd25fcb45f244"],["iconfont.554125c6746c834d348ebabf7db9e40b.svg","554125c6746c834d348ebabf7db9e40b"],["iconfont.c519ab8f9736e55eddd98b3e9f74c866.woff","c519ab8f9736e55eddd98b3e9f74c866"],["iconfont.e545710268f376f687379a402eb210c8.eot","e545710268f376f687379a402eb210c8"],["member-female.edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["no-item.442a86628ce6a1ba9a0e462385b17233.png","442a86628ce6a1ba9a0e462385b17233"],["vendor.f1235e9901c2448fa12c.js","9a6c67f259c48d9cf8bda60399d97c20"]];
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







