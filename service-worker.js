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

var precacheConfig = [["003fd2059b0ce2fcfe1b.js","1165b208428e1550f50575296bcd70ce"],["0136cfb54d34c17463ec.js","53f638ecb7673ad9535ede8326266c8f"],["01f7ecf6e2c327426b28.js","708aa2de66203760cb5c169b8f25ab05"],["073e18e17ae6a82f3910.js","37ade628a802f2842918a4b0d84f8882"],["09560d17e663b1f8c569.js","b0f94302cf065b6262ad82639707822e"],["0b5860e18a54800bb1ac6b09747585c3.jpg","0b5860e18a54800bb1ac6b09747585c3"],["0e87afa31d28ae640231.js","ec7166c4145d1dc726825a6fb351e219"],["134674093a613d7886e5.js","227398c9033ca333414046f0aa765a98"],["13d670d041327348979e.js","d719c2f5a6463a7d7c0cc987d3636e7c"],["14346b166dba921df707b1d1f5195338.jpg","14346b166dba921df707b1d1f5195338"],["14504ec6b18229f359f9.js","1193ddd7c2b3add5be21817a5b0cd68f"],["1520b06a233959129230.js","725e9cee0d4ee048dd50ddd9b8de8457"],["190ead4005b2d0bc7385.js","fa268c20e71acd3e6dd2d64666732a52"],["19b00fbe4ed714a6678015f59a435d45.png","19b00fbe4ed714a6678015f59a435d45"],["1a97b0e64c2a44f10f6c4f71f303f8c0.jpg","1a97b0e64c2a44f10f6c4f71f303f8c0"],["1edc3294d01bde161877.js","0de6f34110d0a95f6eca55f4a1bfae07"],["203740e748f26a71917681cfc4c37eab.png","203740e748f26a71917681cfc4c37eab"],["2139e9bd2459f988b7e697e8c279dd67.jpg","2139e9bd2459f988b7e697e8c279dd67"],["214f85101134f5a3faff7ff74838f583.jpg","214f85101134f5a3faff7ff74838f583"],["21e634fc5e331f8fd7f1.js","09b5387e1f601817565646b406fcfc66"],["2344dcab521dde7a5b433ddaa310eb89.jpg","2344dcab521dde7a5b433ddaa310eb89"],["24aea02f33c64140d878.js","ea7b82a5e574b884fe04807351c7e3b1"],["26cab0f12b82f50ac664.js","32807f954a646a009944f2c34a81f054"],["2a2db743b432f8e0a0b13e03c7333a3b.jpg","2a2db743b432f8e0a0b13e03c7333a3b"],["2feee8d11c6de88932f1bc3d3859d693.png","2feee8d11c6de88932f1bc3d3859d693"],["32667412e6909f0125ae.js","f224cd2ddf69adc0cdb48ee621a7eac8"],["33d0dc72a1cbba38e17d5aa83319791b.jpg","33d0dc72a1cbba38e17d5aa83319791b"],["372c821ae312eeb2a0f4608795d4d860.css","372c821ae312eeb2a0f4608795d4d860"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["399ca9c40f0f1073b6aa.js","b647a00b9474939b8fa737520480971b"],["3abd35858d2996af6da62d794d558da4.png","3abd35858d2996af6da62d794d558da4"],["3aed63078ee5cb00d519.js","3376c680ad26a5b83c351c5a778dd502"],["3b0bc73ff84d109dd8ca.js","3c7f83ae76b9174779e11b5433df0f46"],["3b638b53048e793606ff3d7a685b6128.jpg","3b638b53048e793606ff3d7a685b6128"],["3c44a19ae4604bc656ff.js","2ab1f28dba0a3377158ca4265d7009e8"],["3dc00ae9828bbb28103e.js","499980ec356320060ddaa93519ded554"],["3fb6cdf13d1696eba4a3.js","73bc796cb1882ea8e844eb8967318fae"],["41a7174e440f4f617bdd.js","4c2745f3dc01deb798be3f5d2515f4ba"],["41ec75dbfa70f824a343814a9f1d3901.css","41ec75dbfa70f824a343814a9f1d3901"],["42015f182e54972ac5e9.js","1e601d706546b6a679a593f7e3b27d34"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["436e024aeee592883dd0.js","5d8aae3159229b744ce47a453e74d092"],["44279dcecf1373faaa8f.js","a6c93c44e95650cc0dfc87b4b2665aae"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["48bb1c5b29bb9b0e6ffb.js","65d02d2cb6cfab4f31913e741d04d897"],["4a88b17e7159f427188cb32c69d6ac85.jpg","4a88b17e7159f427188cb32c69d6ac85"],["4b6e3cb70a25ef18bbf518d73c096c8c.jpg","4b6e3cb70a25ef18bbf518d73c096c8c"],["54c331a01287971afa287d4daeacee96.jpg","54c331a01287971afa287d4daeacee96"],["5533b2eb8117ce1875e1.js","ed4087df558242e0fe5072e61f26b787"],["577e77ab407625cc9f30a06941c9fe09.png","577e77ab407625cc9f30a06941c9fe09"],["58b0d643234bbc6dedaf.js","7bde8f697032cdbaa6b110ea5d28a80d"],["59805cd021d2ff81e898.js","926c1dcbcf09c79c8ceb10eb344f8ecb"],["5a41997f9f7fb21cbdf0280453780b3a.jpg","5a41997f9f7fb21cbdf0280453780b3a"],["5e4719268d251372b2d94826b3005f77.jpg","5e4719268d251372b2d94826b3005f77"],["664e53fbae8f6f070ecb24687cb17b2b.png","664e53fbae8f6f070ecb24687cb17b2b"],["693c0a7ef65d4ee28198.js","9178a6129a63ef38248be5c06533a8b6"],["6cc5c48315a0239f8413.js","a4d5acbb0e1d8b21efe8d7096ad57bbf"],["7002086a16dc18f83dc0.js","1bbd12344be5cf1fe5f7c56bc03fe358"],["702cfad0498b29f85722.js","6ee92ae17887ea1074bc70dfac887ae8"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["720fecc745a469313f75.js","f97f94f60fd02435f8cc74801532b288"],["73034da26db5d78ed0c5.js","a43bb84a634dd2affb72781eb3181401"],["774fdc575c8c7e3c307c.js","b644b89c0561cc69a5ab3e6b23f6c340"],["77db353723193147a0ee4dd6bd4d12b3.jpg","77db353723193147a0ee4dd6bd4d12b3"],["7980836334b8ed4af7e3205a58b9170f.jpg","7980836334b8ed4af7e3205a58b9170f"],["7f7fef4fe06a8546b5b6.js","f46bed4a83ae6b7fe153fd876d26d0b1"],["802e416b64f73ee7eca55e625abbf83f.jpg","802e416b64f73ee7eca55e625abbf83f"],["818ff4f17903654b739d.js","e72c8cca408003764d2400effd6a49a9"],["832fe9f0a1def390fc5d.js","21a4a78fc4bc90775e2488cf0cd4ea10"],["83e3e6bded182f0277a4.js","a0d4eab5bffb7d2d1568f50fcfe3a331"],["842e366e57b713f7d2b0.js","d1fb0e8eabf4fa0cb602c4a1683e81cb"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["8a50e110cabc1da2e9e3.js","82b8cf0be0affa8ef8e36255c3e0b56a"],["8b29323f74df758c6544193ba1d42396.jpg","8b29323f74df758c6544193ba1d42396"],["8c0b6880c93f181cf182.js","fab914a60fff038787ed63e1239c398b"],["8d4a814b688072657fb3.js","61edbf56195ae578edded2e4a005410b"],["8f1962d4b05bdf89439c.js","ae35f11f03a3668530dfa4dd6011b8c8"],["8fe40f99fd449bcb9796c336406f9964.png","8fe40f99fd449bcb9796c336406f9964"],["90d78bdec14706093957.js","4a91aeb5c9f8d969546f0931335634a3"],["967127060a9d6d4b2ec4.js","cec63f683a51e8a664d1e2cc7783b6ac"],["96d24bebb7d523a003a3.js","d72455e009d23e37fbf65861beca833f"],["9b527915732bcabc20427e66f09ad20e.png","9b527915732bcabc20427e66f09ad20e"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9c40c3964552e14cb39351b62577f3a8.jpg","9c40c3964552e14cb39351b62577f3a8"],["9d18d49b9f0df6b5996fd952680fdaef.jpg","9d18d49b9f0df6b5996fd952680fdaef"],["9d22c441e727f94d66d9.js","b17e15f680a196afe5accc039192bb65"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["CNAME","58e622340325843359475fb423e22b4c"],["a00a22b32dfd36398880b0ef9fa5deb8.jpg","a00a22b32dfd36398880b0ef9fa5deb8"],["a73e6cb1ae6deecf2cc7.js","376cf4d5cd1df870d12304c3c0e4a1de"],["a884351ad53a65c162af.js","88c3a094035e9250dcd66eea225977c2"],["a9cc86190a02cc840d30e3b0303d081e.png","a9cc86190a02cc840d30e3b0303d081e"],["ad0b77ca146ba4d7e234.js","98c0a14004eda37c81351d45abe941eb"],["b0bc1068cfabdc4713f7a26278dcfb5e.jpg","b0bc1068cfabdc4713f7a26278dcfb5e"],["b2dfa917215bac61ed87.js","1a8717fb66a8f5e830d363335027112e"],["ba0a19c5725f1bb57b5c55f413391d20.png","ba0a19c5725f1bb57b5c55f413391d20"],["bf22c40ab929e68faa1f.js","af4ebc48de7334a2b6984d1fac4bdbdc"],["c2e1da50dce6d35f06eb4ebcf81fba7f.png","c2e1da50dce6d35f06eb4ebcf81fba7f"],["c6bd60c842caa59a33d5.js","c9814f1dae56cff8402d6b0f7173b408"],["cb56083d920f28753d5a.js","bf7f2767e47966e4211d855502fb7095"],["cd7e76f001eedf858b5c.js","cb00119ef0713bca0815d8aab8db5ab4"],["d173a32f7068431b25b9.js","5e77c77d76ab8178348dbd1db7da5b65"],["d89bf2ce035523e24cce.js","c9fbd54baba523b89e83847c6626edfb"],["d96e2c44d58e8a97df834c39ade88936.jpg","d96e2c44d58e8a97df834c39ade88936"],["db1e51ad350cdc4a6897.js","7e2a12c1f9d44ad592f012f16782ef66"],["dbfd23d5444c3d525bf64b96324126bd.jpg","dbfd23d5444c3d525bf64b96324126bd"],["deb8cdcc0a73deb677069db3987299ab.jpg","deb8cdcc0a73deb677069db3987299ab"],["dfea8d54f94eebce2d4bb05c58c0e53b.jpg","dfea8d54f94eebce2d4bb05c58c0e53b"],["e14bf8659f9ac37f3576.js","f2de79fb8b7ffc157f15c9055f210ce0"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e1ce0096dd06e182fbb8.js","563eb9ea5bee3d7a5c61e6d2f2c46505"],["e270398e5d5cf6153ff8.js","bb35ee88a428b168a8f8aa8fca566a75"],["e38afda3cc66116f7c9e.js","ff16841973eb49bc84dc3a62b5165f01"],["e544105dbaa1d074e3d7.js","5ee08cea327a9b6f595e53f96a21b7fb"],["e604aedd01245527e074.js","c77bcb2097db46894ac3d7a8c935dfc4"],["e7e949f4738bd54eb87b.js","ec42af15649ca22a13b451c8a3fa9910"],["ec6910dc3569334d3ff8.js","8a1bad6e1465423846db04e7bc7f9542"],["ed7b77b1a88c9d753860.js","ba1ba40f6fcc4be0a5750eb885836bc9"],["f0efd7d9acdcc5f26831.js","feecb59fb4e20af7f93a06d13855aa76"],["f1fdc9ae34cbd7bde7a8.js","fee64ca0558c4e81a97fd4f96a7417ad"],["f3809107acdc21367290.js","901b482eb7095844f0ca66c42af7e413"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f48adb528012ccf98199.js","a73d68b3333b76472e46beb8eedb30c8"],["f67175ae352301772558.js","e40acec73994bc857e79024e4820e07d"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fd97d6fc21eca45a2d0c.js","5b443d7469cd94955f59e46fff9fa155"],["fe094f701a849ab888fc.js","e4c4283a257574cac52b2cdb0719e43f"],["fecf78377e2980cc9d7a85c423f79ab2.jpg","fecf78377e2980cc9d7a85c423f79ab2"],["fedbcc7d7b16a61cb18325d22b1d3fb4.jpg","fedbcc7d7b16a61cb18325d22b1d3fb4"]];
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







