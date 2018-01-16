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

var precacheConfig = [["010bf120c3f7cbeb9800.js","6d0b9506e10253f5bd60f8f115fb8e7e"],["014abe86465260bac888.js","b9a3938d104a5ef417939fae81568f7a"],["02f53e161d09b8873f23.js","92ad231e557f7a93473acf1dea5f88f9"],["03e78adbb073424d0f99.js","1a8735c535d3337003fc3b95c2bacfa2"],["0876b28a30483fbe0741.js","0f9fa354f4ba4565a972477aabc0adf3"],["0b5860e18a54800bb1ac6b09747585c3.jpg","0b5860e18a54800bb1ac6b09747585c3"],["128b3ac2912089f65c55.js","c08f1ce1b1e74fe5cf7acbb805222613"],["135e311e82a76299be17.js","164bb1d369052309f6f5e7932e792ab9"],["14346b166dba921df707b1d1f5195338.jpg","14346b166dba921df707b1d1f5195338"],["164322c45019832ac6ac.js","3b71915ccfe0ed1ec4e3316edc051a18"],["194fec76d6c61c6140bd.js","3588cb78ce31b2061f3e758c6fa0b285"],["19b00fbe4ed714a6678015f59a435d45.png","19b00fbe4ed714a6678015f59a435d45"],["1a97b0e64c2a44f10f6c4f71f303f8c0.jpg","1a97b0e64c2a44f10f6c4f71f303f8c0"],["1b0692786b0ce6231bb9.js","6bf6bd0e4828dd9b1dd6277cd222ea57"],["1c37c5d97f59533eca0c.js","7f3b09be7306c7196d494704daaa0a1d"],["1d0ce3c3958778969ea5.js","f0cfe4ef4a836676aa2203e43a27ab50"],["1e3aeabc72094d0e1662.js","d41d800c586a224d711b93ec999836a2"],["20307867f0b399956c96.js","bb6272e941dc636136e5cc1f049d3b76"],["203740e748f26a71917681cfc4c37eab.png","203740e748f26a71917681cfc4c37eab"],["2049283d52ec8a28e087.js","149e1ca0fab7c82588b2bf7faec609af"],["2139e9bd2459f988b7e697e8c279dd67.jpg","2139e9bd2459f988b7e697e8c279dd67"],["214f85101134f5a3faff7ff74838f583.jpg","214f85101134f5a3faff7ff74838f583"],["2155b4aa748a863cff79.js","2ea9cf469f370da3fae96991d8d99d47"],["21b2b75eac4799bbf9a0.js","1cbfe8c1eb8a47e8bb44b3086eaa6fae"],["22648f46a512c2db4744.js","3f2876a4093f0cf2df9eb184422200fb"],["2344dcab521dde7a5b433ddaa310eb89.jpg","2344dcab521dde7a5b433ddaa310eb89"],["23ff5b4fe401f8d8ef4c.js","9f26eee7abfab94f5d408e15902b1282"],["2522f8a3bd7df2d8a56e.js","fb36f89a059402ec6b0c31d4b379c8d0"],["28d1c91beb3ba4641d2f.js","f5559a551a6c6a20ee7ff64999dd024a"],["299044244c166b8d8e12.js","c782148cde2b3f65e85fa272a554e369"],["2a2db743b432f8e0a0b13e03c7333a3b.jpg","2a2db743b432f8e0a0b13e03c7333a3b"],["2bc95d763f94de500bf5.js","b9283b776c1549215030b3c29ddb3a64"],["2d77cdc11576dc97277e.js","20f6ae54df7e6153b1f007e97bb2d6f1"],["2e70ad0a030669c8b7b1.js","a5510cb99e5c96bcaabb2fdf5e493d57"],["2feee8d11c6de88932f1bc3d3859d693.png","2feee8d11c6de88932f1bc3d3859d693"],["33d0dc72a1cbba38e17d5aa83319791b.jpg","33d0dc72a1cbba38e17d5aa83319791b"],["372c821ae312eeb2a0f4608795d4d860.css","372c821ae312eeb2a0f4608795d4d860"],["3734f2edd30fe06ebd1b.js","ab4281419e95792a5c640f6add5c7a13"],["37d262458392e3ef51f4.js","5acfb5881945c8c6ceb29d905b6a0486"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3a3c9d43e0fd6c191e59.js","3f944aa792e400b91ea1e579e79513a5"],["3a6a9976e8da41c4ac17.js","4c8ab9fa6d9ee2eb8db38e23f79598e9"],["3abd35858d2996af6da62d794d558da4.png","3abd35858d2996af6da62d794d558da4"],["3b638b53048e793606ff3d7a685b6128.jpg","3b638b53048e793606ff3d7a685b6128"],["40e4df9f6813ec8a8801.js","1f59e0f4d4ae5bbc3492206e14761d53"],["41ec75dbfa70f824a343814a9f1d3901.css","41ec75dbfa70f824a343814a9f1d3901"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47a7eb1a861ec55c1a0e.js","cd728e3626604acebfe0824ea80a08ae"],["48c02a761306e6ac9d88.js","3a8b5fd804bb0e2b42688fce0ee89241"],["4a88b17e7159f427188cb32c69d6ac85.jpg","4a88b17e7159f427188cb32c69d6ac85"],["4abc459d4f88fc4366e6.js","644c45bf4983151a8a3fb21d24c0e98c"],["4b6e3cb70a25ef18bbf518d73c096c8c.jpg","4b6e3cb70a25ef18bbf518d73c096c8c"],["4cdd6911c97592463bf9.js","8fa2968fb72eb59d8cb2b4bf4587ab6d"],["4d1be8b9bdf9099d6b39.js","43ba0f80c95d631b1879d92beb494c6f"],["4dfe6812dd572620e725.js","6ebc1ab99ed5bf161d4139d3aba2b184"],["50b82f6c8d39e36c8785.js","b5d58355de0a114cbe16b07dd43d4c30"],["51b037cbfd6120a779a5.js","e0ac866d59b7acbd9b1991aa1fa217f7"],["54c331a01287971afa287d4daeacee96.jpg","54c331a01287971afa287d4daeacee96"],["577e77ab407625cc9f30a06941c9fe09.png","577e77ab407625cc9f30a06941c9fe09"],["58cc9617c30f0876401a.js","92aa692ba84fe2fa45853ea712d35227"],["5a41997f9f7fb21cbdf0280453780b3a.jpg","5a41997f9f7fb21cbdf0280453780b3a"],["5c2c73f93edbbb1944b1.js","e93335b7697094b187dda6bac8e696ea"],["5d7d3724e014f1beae9e.js","0256beb8b134e999297866e2144566bc"],["5e4719268d251372b2d94826b3005f77.jpg","5e4719268d251372b2d94826b3005f77"],["64b1529f7658a011b3cb.js","4b2c38f2f56601135eed6ea58557b892"],["664e53fbae8f6f070ecb24687cb17b2b.png","664e53fbae8f6f070ecb24687cb17b2b"],["6860f45f3951dcb926d9.js","d1b3354836911b5ce2ba8f543b5f0e4a"],["6b66a306afd63e934f82.js","2a41af8b75942f830e054d09a75533b3"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["71d55f41ea60284c5e0d.js","5d150ea475eab5491d64d5ef6ec38eb2"],["7373ffaf0e9da216066f.js","5a7c748eae5c525ff0d3e470167488b1"],["7425af1240dc68c7732a.js","9daf45e7064cac6f84060554787b8785"],["77db353723193147a0ee4dd6bd4d12b3.jpg","77db353723193147a0ee4dd6bd4d12b3"],["7980836334b8ed4af7e3205a58b9170f.jpg","7980836334b8ed4af7e3205a58b9170f"],["802e416b64f73ee7eca55e625abbf83f.jpg","802e416b64f73ee7eca55e625abbf83f"],["84beaebfb1ccfe9e2ac5.js","54e2e09398a05a06aa18c73f1f3ed9ca"],["84fc46d92be6a0cf2300.js","da52aa98e0e2f08d8ac853364ef863b7"],["852a1ca1e1a1b9c29693.js","82111d638867ac66de6c51ab8fc3cc0b"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["8b29323f74df758c6544193ba1d42396.jpg","8b29323f74df758c6544193ba1d42396"],["8dcc769fe065359fbee8.js","71c5376e557de513adf97d686b41a813"],["8fe40f99fd449bcb9796c336406f9964.png","8fe40f99fd449bcb9796c336406f9964"],["926eac31e331ef1205d9.js","4d5b5ff3ac4b9a0ef0422588db05a35c"],["9b527915732bcabc20427e66f09ad20e.png","9b527915732bcabc20427e66f09ad20e"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9c40c3964552e14cb39351b62577f3a8.jpg","9c40c3964552e14cb39351b62577f3a8"],["9d0bbda0586379700305.js","ecc9e8b532a11974af1b5ec79c5e3641"],["9d18d49b9f0df6b5996fd952680fdaef.jpg","9d18d49b9f0df6b5996fd952680fdaef"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["CNAME","58e622340325843359475fb423e22b4c"],["a00a22b32dfd36398880b0ef9fa5deb8.jpg","a00a22b32dfd36398880b0ef9fa5deb8"],["a19febfa3cfa431af365.js","f7d852f1d86965c50b3815495a1f3552"],["a9cc86190a02cc840d30e3b0303d081e.png","a9cc86190a02cc840d30e3b0303d081e"],["b04d3ac066e311df1452.js","db037fe4343456029abc90c2d25e778f"],["b0bc1068cfabdc4713f7a26278dcfb5e.jpg","b0bc1068cfabdc4713f7a26278dcfb5e"],["b1604207abd78783c561.js","56bc73eb8bdf22d14c983c9282fca9df"],["b3c3c6145d43fbeb262c.js","3a82aaa568f5cfc4e43aae886e04e4e0"],["b4f3945dce212cc49a0f.js","4cba21027b5637ed15b2628fbfe726ad"],["ba0a19c5725f1bb57b5c55f413391d20.png","ba0a19c5725f1bb57b5c55f413391d20"],["bb2a1ab9b978ee241b71.js","42847a219bcd00b62c2fe12b72a139ec"],["bf0503758e3123a4eb4f.js","577857f977cf2d00777d01d473c5de2d"],["c2e1da50dce6d35f06eb4ebcf81fba7f.png","c2e1da50dce6d35f06eb4ebcf81fba7f"],["c310be597a7a9bd4e7cc.js","7ca85976e4c2603250819506f98fdf86"],["c31c2e8dbf110decdf31.js","c8978c92e28d17b82395290bd3099b5d"],["c832845a56f7835b587f.js","1bc5c3a79372d7cef7bdf5d3c3ca6455"],["c93caedc4ea412eddb50.js","a0c39f60d022ab6ca29daffab69c3ba3"],["d0c4722dc0fac7a62875.js","5d7af701853132c1f950cbe7220ef597"],["d8235d9553341b0b4ef2.js","8c9ea250807f78480cb7c29dfd106251"],["d85225c466a8569b005c.js","9e372c5f9d1052aa349520ed251ace7f"],["d96e2c44d58e8a97df834c39ade88936.jpg","d96e2c44d58e8a97df834c39ade88936"],["dbfd23d5444c3d525bf64b96324126bd.jpg","dbfd23d5444c3d525bf64b96324126bd"],["dc4d3297bdd7a5876d32.js","0f0fcabf31b3294274614aa8b7e826a6"],["deb8cdcc0a73deb677069db3987299ab.jpg","deb8cdcc0a73deb677069db3987299ab"],["dfea8d54f94eebce2d4bb05c58c0e53b.jpg","dfea8d54f94eebce2d4bb05c58c0e53b"],["e0c0f5aa68ee7cd01005.js","1d736be76822765b25590dde3009c710"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e40ffdaa732d4e53f953.js","3091e55de382d6ee4daba632dd811a89"],["e8ba42b8e0df2ebc3a7e.js","ffdb9f5d820d7d383de5a34a74b77974"],["e8d60cf0a8b0d0bd73fd.js","70c8cc2f3ce1d117c0b840c8f11bbb59"],["ec858d8a9d5a101fa508.js","53a8452e74a5a9aee23e51f357dcce86"],["ee24352ac89751826d5d.js","e15eba39ae77eaf98fd3e43ff028497d"],["ef889cf6fa1507e0709f.js","d116b0045908bd78572596946a6996d5"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fc809cb408acdb0bbc14.js","b301add56d3ac5edbbc57dff956c0a7f"],["fd7e31bee848ee92038d.js","0047d6324b56047f2c9b5bf089b40ca4"],["fecf78377e2980cc9d7a85c423f79ab2.jpg","fecf78377e2980cc9d7a85c423f79ab2"],["fedbcc7d7b16a61cb18325d22b1d3fb4.jpg","fedbcc7d7b16a61cb18325d22b1d3fb4"]];
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







