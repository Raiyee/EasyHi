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

var precacheConfig = [["0.77d098bb2ff2022b1784.js","61274a342bcf644eb36c343a8a7b9fea"],["1.725b41d496a2d15bbe45.js","b6bc0f307e9dfb878a6b0d1eaa10b6d2"],["10.99a73207a16e7d09b4c4.js","917fb269c9f96dfdee54a63675d59e38"],["11.f847ce437cc72dc87ed6.js","31d5a51a6ec2fc2ca5ba161c4c3ea22e"],["12.cf05a50903fa1badebcf.js","86fe55bdae23b28df059e5dee4277fce"],["13.08aa77b013883ba8bf00.js","f1709495e9c0d44cef9dc87968cde7b0"],["14.d5fbbddce4ba81396045.js","68ce77bdaafd036528bf96099119465b"],["15.e4868a1dfc50149f7e5d.js","f078f8622f63383760e77db0a50b6dfd"],["16.a32bc256c998ab7d204c.js","f48c09afdb4f8fae35a29638ea55d1c7"],["17.9f4c72da99dc5bda2229.js","67de3c8566a4d9bc46858a15ce559e5b"],["18.44c5c102e267eb0b1b34.js","1ebaa1a2a8c1c7e50d72fc787e51ccca"],["19.8c54551a70d3a65657f4.js","042b91a8edb6f07b530240a19e2608c0"],["2.f73389e703a4086bf1bb.js","83cf49a97f429a5ac3784fc311d35376"],["20.7ca79707cba23dd078d0.js","0ae639aa745ff5d07180b103bcbfb513"],["21.8518c15052402c004277.js","45996bdf3107e248163f8d5c8b6875ae"],["22.afe40ab3d40e92f97836.js","117a76adaf5122299b4c20affffa4459"],["24.d7429e0963905a32254a.js","fbb533cc3f975462b6dad5455e69c646"],["3.790ba0dfa9e0ddade2fd.js","5dbf40e7ee9aeccbc372e42130a0931a"],["4.feef5de5ab9fce22e359.js","19a15ef31302a5958662293aaab87063"],["5.f3cafb7b61ec5dc4f452.js","ffd53d34622a55a9c031801b0f75423f"],["6.6006f90162349810e2f6.js","1268ea7e3a6d758f4b49a58b57fb6b62"],["7.0b28c5de0ffc6d463b99.js","dbd3cebab4c544323be629de82912042"],["8.b2a1b92bea43996ee139.js","ce430c65eb14d190a753547cc58b6e65"],["9.b85c0294218f4d198fa7.js","1481de97c04eee5f53f440703696362c"],["CNAME","58e622340325843359475fb423e22b4c"],["app.501c79346ccbd10decec09371fc2ee4a.css","501c79346ccbd10decec09371fc2ee4a"],["app.fdaa846ad71492bb4e78.js","13b25840b1f8736f56b3f44892146bcb"],["bootstrap.6a8264623fbc8f87c135722cf089760c.css","6a8264623fbc8f87c135722cf089760c"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["glyphicons-halflings-regular.448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["glyphicons-halflings-regular.89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["glyphicons-halflings-regular.e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["glyphicons-halflings-regular.f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["glyphicons-halflings-regular.fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["home-01.02df33497b5857b1c5601a93d1f0e891.jpg","02df33497b5857b1c5601a93d1f0e891"],["home-01@2x.92078c744ea94765a50ed6691f225ce8.jpg","92078c744ea94765a50ed6691f225ce8"],["home-02.665e39e278ae3c7ad05ec1bdefcf1e4b.jpg","665e39e278ae3c7ad05ec1bdefcf1e4b"],["home-02@2x.0f2801bca3142ebd3333a5be9add0ffa.jpg","0f2801bca3142ebd3333a5be9add0ffa"],["iconfont.30e37c3980766e7371abd25fcb45f244.ttf","30e37c3980766e7371abd25fcb45f244"],["iconfont.554125c6746c834d348ebabf7db9e40b.svg","554125c6746c834d348ebabf7db9e40b"],["iconfont.c519ab8f9736e55eddd98b3e9f74c866.woff","c519ab8f9736e55eddd98b3e9f74c866"],["iconfont.e545710268f376f687379a402eb210c8.eot","e545710268f376f687379a402eb210c8"],["member-female.f0028f3a40df12e895c1a9b6f6ba5394.jpg","f0028f3a40df12e895c1a9b6f6ba5394"],["no-item.442a86628ce6a1ba9a0e462385b17233.png","442a86628ce6a1ba9a0e462385b17233"],["vendor.27ee14c676e9ad0c8fdf.js","a82cf401f3cf62dc9497a14c0d5bec58"],["yoga.b124d4aa1794ed4ac0ec0be1879afdaa.jpg","b124d4aa1794ed4ac0ec0be1879afdaa"]];
var cacheName = 'sw-precache-v2-easy-hi-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
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
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
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







