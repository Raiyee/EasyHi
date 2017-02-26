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

var precacheConfig = [["0.f4af5cc46d3d0faeed1e.js","8e485f92b593406fc991741f087bacf7"],["1.00882eda317ee2b44ae2.js","fe1e7f7e4f117acf57c6779d86fd6895"],["10.fd01c875182a9709e07e.js","aa47b63307f61df7325e10ad0a185418"],["11.e25bd88877dff158d5bb.js","170b8f105ed98d3c8bd42ef93dee47d1"],["12.3b60965795abd0bb8610.js","f5bdf339de5bb89743be24885d515bee"],["13.80cbbd6fd9b50f254f9c.js","fe1dfccd054a74b97f9fbccca972073a"],["14.7fc4ebf04b2a625d5409.js","5fb763f903798f134979ab76b22c1746"],["15.496c505dea83629d91c3.js","e1f3011b8a377cc11efcecd9704e730d"],["16.82fe8c31adb4e7d5405c.js","23249e7c39aec6c673fc263e1cbe1538"],["17.4346f09a6f27bc4ff8c3.js","e9d396b69e1d9cc5a9288698ea48ec42"],["18.c085a68973dbe08c76ae.js","4a4a87c788b06a657ae291beb70041f9"],["19.f3be5cc060b152546798.js","4ee70dfb4af22bdeccc334de7acc24fd"],["2.3e23f220307850dde364.js","79cf60b8a189fe1847e55e7abdeb93b8"],["20.3baf1e8779d2a2d00358.js","4c4fef4e2d97100bcff664fc2ca4bf98"],["21.3490542c16801deba174.js","908b0e80ff73fbcb77c50a6a2bb64cb3"],["22.79fb99eae5568fc800e8.js","13b3e79a63f51bf61dbe16e76fbfc3d8"],["24.8dd818190a17b586a1d3.js","30f96a912aa67bf4f41963b2c26fa3e2"],["3.86fddb340f1d2554cc05.js","f452e8e507c9a1957217f46317672180"],["4.3e5c04268d2b426ff53c.js","fe6e426a34cbc5bafcc4f858bac71feb"],["5.1ba00b656485c9b1ca7d.js","294740d3f45416a46240d28a4fdaffea"],["6.8307b35970bc0cb2c5d3.js","32aa3179d19b64ea3c63c4dbf158dfef"],["7.fdd6516688c5674916b9.js","14d6d92ae32ed4a37b73a0cb4767e926"],["8.76cad643d35c08c5a63c.js","7c7348bb3c5f6ff3b3fb5fd06ab28a90"],["9.e70c70fcbf6dbabc7aef.js","e95d35d3824875fc1013274abea84920"],["CNAME","58e622340325843359475fb423e22b4c"],["app.501c79346ccbd10decec09371fc2ee4a.css","501c79346ccbd10decec09371fc2ee4a"],["app.59c1da59ccbfb54f32aa.js","9f8162fd81b66b13fb0b8da511938b5b"],["bootstrap.208fef462dcce0e621fb5bec7a69054d.css","208fef462dcce0e621fb5bec7a69054d"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["glyphicons-halflings-regular.448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["glyphicons-halflings-regular.89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["glyphicons-halflings-regular.e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["glyphicons-halflings-regular.f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["glyphicons-halflings-regular.fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["home-01.02df33497b5857b1c5601a93d1f0e891.jpg","02df33497b5857b1c5601a93d1f0e891"],["home-01@2x.92078c744ea94765a50ed6691f225ce8.jpg","92078c744ea94765a50ed6691f225ce8"],["home-02.665e39e278ae3c7ad05ec1bdefcf1e4b.jpg","665e39e278ae3c7ad05ec1bdefcf1e4b"],["home-02@2x.0f2801bca3142ebd3333a5be9add0ffa.jpg","0f2801bca3142ebd3333a5be9add0ffa"],["iconfont.30e37c3980766e7371abd25fcb45f244.ttf","30e37c3980766e7371abd25fcb45f244"],["iconfont.554125c6746c834d348ebabf7db9e40b.svg","554125c6746c834d348ebabf7db9e40b"],["iconfont.c519ab8f9736e55eddd98b3e9f74c866.woff","c519ab8f9736e55eddd98b3e9f74c866"],["iconfont.e545710268f376f687379a402eb210c8.eot","e545710268f376f687379a402eb210c8"],["member-female.f0028f3a40df12e895c1a9b6f6ba5394.jpg","f0028f3a40df12e895c1a9b6f6ba5394"],["no-item.442a86628ce6a1ba9a0e462385b17233.png","442a86628ce6a1ba9a0e462385b17233"],["vendor.c3c521483fe477249c54.js","8add3507c1a827f90e8e73edef5118e3"],["yoga.b124d4aa1794ed4ac0ec0be1879afdaa.jpg","b124d4aa1794ed4ac0ec0be1879afdaa"]];
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







