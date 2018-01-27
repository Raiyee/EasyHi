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

var precacheConfig = [["014abe86465260bac888.js","b9a3938d104a5ef417939fae81568f7a"],["02c557219eaf113797ad.js","ad4cf065f6aeeb8fcd066001dcf96ccd"],["02f53e161d09b8873f23.js","92ad231e557f7a93473acf1dea5f88f9"],["0839b5450d3b4ec447d4.js","c5caee5902bb575c286684e8f4787bc1"],["0b5860e18a54800bb1ac6b09747585c3.jpg","0b5860e18a54800bb1ac6b09747585c3"],["0cb96f5df3ddacaed094.js","742970780cff68c786cd09b453266e48"],["0d47d48aaf0f8b62a844.js","d017bd22ece5112e01460a70e62cf29a"],["0daa2fa2ca4008e140c5.js","12256e2c64647b067faa5ce74073e463"],["14346b166dba921df707b1d1f5195338.jpg","14346b166dba921df707b1d1f5195338"],["14e765e17ca6d5a26917.js","ad8eefe20a72d2716e8de4d6843a1bea"],["14ee6331c5ee035befcb.js","f4993ca70c932363225a22995063ff98"],["16c8f0deb6d3995b387a.js","e29c2162dd95f84c5fce6cce82bda3ed"],["17e84ecb659b759557d7.js","cf52e4d5af4aad297f20bd0f36f1ecc7"],["196813365096e3524e8d.js","21ab0b6eef7c40aa8153334b62d5d2de"],["198a0fa726892a9d9e6c.js","2b2b973a8cdfa5241ec90c82e8635e8c"],["19b00fbe4ed714a6678015f59a435d45.png","19b00fbe4ed714a6678015f59a435d45"],["19b10248d5e87e59a263.js","9065ba3b8b7f658073b11937e512d980"],["1a97b0e64c2a44f10f6c4f71f303f8c0.jpg","1a97b0e64c2a44f10f6c4f71f303f8c0"],["1b8659c8cff87dbba491.js","73a7278ab5d5d169bcc4841ed239513c"],["1ba0146611c30ea8a3bf.js","d1093ae1be4bef317d18156ffc3a3bd0"],["1c37c5d97f59533eca0c.js","7f3b09be7306c7196d494704daaa0a1d"],["1f52e3ea5647f49b2c39.js","43bf7e033c046b541bc209eead9088a6"],["203740e748f26a71917681cfc4c37eab.png","203740e748f26a71917681cfc4c37eab"],["2139e9bd2459f988b7e697e8c279dd67.jpg","2139e9bd2459f988b7e697e8c279dd67"],["214f85101134f5a3faff7ff74838f583.jpg","214f85101134f5a3faff7ff74838f583"],["2344dcab521dde7a5b433ddaa310eb89.jpg","2344dcab521dde7a5b433ddaa310eb89"],["25fec20b21a3071d6c56.js","8ce1e60916346e996b5ec5a6ff664a3a"],["28f01a0fe988d6e11a65.js","9381e6ae68c92a1f0ab485adb62e06f1"],["2a2db743b432f8e0a0b13e03c7333a3b.jpg","2a2db743b432f8e0a0b13e03c7333a3b"],["2b3cec36c0faa5599a87.js","04e6c29a49299d0fd8ea20e38cb5e921"],["2e960e9177fc9451ce62.js","1590d790ac27f048150ec9768a9088df"],["2feee8d11c6de88932f1bc3d3859d693.png","2feee8d11c6de88932f1bc3d3859d693"],["3308354853eddda08bdb.js","003cb295a43be08e92e8875bab565d44"],["33d0dc72a1cbba38e17d5aa83319791b.jpg","33d0dc72a1cbba38e17d5aa83319791b"],["372c821ae312eeb2a0f4608795d4d860.css","372c821ae312eeb2a0f4608795d4d860"],["38f86fa32c09071842c7.js","57c57cfee01307c89862c2568e85150a"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3a28c590446127a12b17.js","7232a03bf3b9a9f08d5d877e6dd703ce"],["3a3c9d43e0fd6c191e59.js","3f944aa792e400b91ea1e579e79513a5"],["3abd35858d2996af6da62d794d558da4.png","3abd35858d2996af6da62d794d558da4"],["3b638b53048e793606ff3d7a685b6128.jpg","3b638b53048e793606ff3d7a685b6128"],["3b9a8b6a288d002aa612.js","9aad4ae51521929c97db30c9a8f5fb9d"],["3c832355aea4c9306e1e.js","47dc2a5294f042f1d21ed5c3cfefb7f9"],["4037e176651bf8549485.js","ee04612de2aaaa2553a460fb56225b59"],["41ec75dbfa70f824a343814a9f1d3901.css","41ec75dbfa70f824a343814a9f1d3901"],["4239983e2155fd633f03.js","2daa9ace094c453bb9375bc770cf8747"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47933c8e0e056fc11462.js","3c323a8a1bc943a416a18e3d0945ef94"],["4a88b17e7159f427188cb32c69d6ac85.jpg","4a88b17e7159f427188cb32c69d6ac85"],["4b4808c46d002b876288.js","ec832cc700ce322c1aceb553ff950ca9"],["4b6e3cb70a25ef18bbf518d73c096c8c.jpg","4b6e3cb70a25ef18bbf518d73c096c8c"],["4ffd64d5afa490037512.js","eec956777fe79b130fcf62a55e5bfe83"],["51b037cbfd6120a779a5.js","e0ac866d59b7acbd9b1991aa1fa217f7"],["54c331a01287971afa287d4daeacee96.jpg","54c331a01287971afa287d4daeacee96"],["5583977a81879e6da665.js","9afe14beef0d2d1a5db09cb9979b3ffc"],["55c9e7505c92a3b0dce2.js","b8888e17fb801ed7e33f3d9e12479d7e"],["577e77ab407625cc9f30a06941c9fe09.png","577e77ab407625cc9f30a06941c9fe09"],["5a41997f9f7fb21cbdf0280453780b3a.jpg","5a41997f9f7fb21cbdf0280453780b3a"],["5e4719268d251372b2d94826b3005f77.jpg","5e4719268d251372b2d94826b3005f77"],["664e53fbae8f6f070ecb24687cb17b2b.png","664e53fbae8f6f070ecb24687cb17b2b"],["67cb7e4cb5966eb65fb4.js","a421aedd8b0c456dc38b1547a0101de9"],["6a8895a49b9507b73147.js","b54110f00a097b762b97f66e8fbda740"],["6b22e9a51b0ef3927bb6.js","f40cf1ce508cac8ab871d27267131d3c"],["6fede1137ea252290602.js","a5e8c9c10dc5d69ee0bd514a29d441cd"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["7425af1240dc68c7732a.js","9daf45e7064cac6f84060554787b8785"],["76a8347fb610f8dc9284.js","7499e93870cb6d5b67fc77c0bc515f6b"],["77db353723193147a0ee4dd6bd4d12b3.jpg","77db353723193147a0ee4dd6bd4d12b3"],["7980836334b8ed4af7e3205a58b9170f.jpg","7980836334b8ed4af7e3205a58b9170f"],["79aa84c3a4314619fd6d.js","f2e3466e542c2e76dc2787b33ebf0091"],["7c81d29b38536197768c.js","d543ab73cb58d6261df22605fc544552"],["802e416b64f73ee7eca55e625abbf83f.jpg","802e416b64f73ee7eca55e625abbf83f"],["84beaebfb1ccfe9e2ac5.js","54e2e09398a05a06aa18c73f1f3ed9ca"],["8570b7d7feeaf3d36a3d.js","813f0120ce90183afca881544a591134"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["8a4d89afed2d2bca70d4.js","aa3e77cc8302ffebca497fbe70bf4155"],["8a7e8329cc8ed6960934.js","0389a862607c96cf3d1285ba405bc784"],["8b29323f74df758c6544193ba1d42396.jpg","8b29323f74df758c6544193ba1d42396"],["8b903b8a659944ae3a4d.js","3f946d25ca0e44fcb2a6d9aa16a0640e"],["8e27f50bc2b2dd5035b6.js","6f15e220feec385bc058efa38e2061b8"],["8f48a5cdcb6bc6e3baf3.js","5b7aca0578d6bb6bb79b1bb442ea6fe1"],["8fe40f99fd449bcb9796c336406f9964.png","8fe40f99fd449bcb9796c336406f9964"],["9a27f53fccd33977aa71.js","9e3ab84fecf07c15843bca6c53784d3c"],["9b527915732bcabc20427e66f09ad20e.png","9b527915732bcabc20427e66f09ad20e"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9c40c3964552e14cb39351b62577f3a8.jpg","9c40c3964552e14cb39351b62577f3a8"],["9d18d49b9f0df6b5996fd952680fdaef.jpg","9d18d49b9f0df6b5996fd952680fdaef"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["9ff3af5ba12ca68a0739.js","f1f2a14a59470578ee3a0303a0c41436"],["CNAME","58e622340325843359475fb423e22b4c"],["a00a22b32dfd36398880b0ef9fa5deb8.jpg","a00a22b32dfd36398880b0ef9fa5deb8"],["a149982037c3b01175a4.js","bf5e4130854edbd5a373257bab29ff3d"],["a4b2ee959f542445b586.js","48f1cbac648cb8f49ca73cb94bb1ce03"],["a68ab4cb08733676b0f2.js","af78af6a70561dd18fcde2468d2676a0"],["a6edd377f8334f60c68b.js","c28bd6a305ca09f05fff50bf8695078d"],["a77706b6a5b49f22ebaa.js","8518757aa1e7b198ee0830bed8d97655"],["a9cc86190a02cc840d30e3b0303d081e.png","a9cc86190a02cc840d30e3b0303d081e"],["ac5a02f9c0541f02d183.js","403d99edca6826a145b9c4eae067b79f"],["aeba756f37a4aed3cdb6.js","3dc6b0aabc62884da294e141875ea036"],["b02a5a5d3dbd6b910f85.js","4079f111ed9d2b1b9972e8e94f46186a"],["b030ba87cd247a662f19.js","4609bdffe1bb63bcd3a68c28621af02e"],["b0bc1068cfabdc4713f7a26278dcfb5e.jpg","b0bc1068cfabdc4713f7a26278dcfb5e"],["ba0a19c5725f1bb57b5c55f413391d20.png","ba0a19c5725f1bb57b5c55f413391d20"],["bb2a1ab9b978ee241b71.js","42847a219bcd00b62c2fe12b72a139ec"],["c2e1da50dce6d35f06eb4ebcf81fba7f.png","c2e1da50dce6d35f06eb4ebcf81fba7f"],["c34caee3e12ee883b269.js","27d52c4d6503e0f77061c2aaacdc789b"],["c4f3f023cbe71c37b269.js","75159efd2198e130b8e38798e37a5e21"],["cc332dba166a16366335.js","342d28e2c8468618c43c1372befd930e"],["ccdd6c0bcb2d684f9287.js","a821cbfac9fc971ddaf280e51fc90576"],["d01035fb1b9c8ed82677.js","b8319daa6e3c264bd3542f8329c8497c"],["d0c420ed6a81c7c81046.js","7cba364802f5bca71c62ba62ccd93112"],["d106aede6ed18cd9a6f6.js","e180c6905f20da73080c9251401fda40"],["d6d3d6ce5cebde9101ce.js","ff737494412a796eaf2d80139e2b1683"],["d96e2c44d58e8a97df834c39ade88936.jpg","d96e2c44d58e8a97df834c39ade88936"],["da507a14db608c239092.js","f35226e97b1f322559f5dfd11b8d46fa"],["db798dccebef37e9f1f6.js","4f13538d1a681f9996c0ad3707f0eb90"],["dbfd23d5444c3d525bf64b96324126bd.jpg","dbfd23d5444c3d525bf64b96324126bd"],["deb8cdcc0a73deb677069db3987299ab.jpg","deb8cdcc0a73deb677069db3987299ab"],["dfea8d54f94eebce2d4bb05c58c0e53b.jpg","dfea8d54f94eebce2d4bb05c58c0e53b"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e731e8b40943e258d58f.js","3be01f03bee1e8f237cb598d8dc84de5"],["ee607c95ca5b984ab850.js","37e136ad44237ec818e64bff6a4ab9a2"],["ee7df9e363766af3e03f.js","d14a5a83532718be5e3b5c00a897528f"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fd31f8c47376c6bd4635.js","b7f7a55f73e762e05440b01a2271d4b4"],["fecf78377e2980cc9d7a85c423f79ab2.jpg","fecf78377e2980cc9d7a85c423f79ab2"],["fedbcc7d7b16a61cb18325d22b1d3fb4.jpg","fedbcc7d7b16a61cb18325d22b1d3fb4"]];
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







