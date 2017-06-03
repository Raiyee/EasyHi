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

var precacheConfig = [["028a776b7822a73a97ee.js","442f7a4a7222a5ce72de6203cef550ca"],["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["094b5564f0707005d7de.js","98d791b8fc8e8980783df5002ea48cbe"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0c67c9b6293cdd426687.js","e85e2f4afd6982161a43b445a9ce3a1c"],["0f6aeaa13e89a650c5db.js","5b54e4582f0d4837c2554bec37008cce"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["157b4d9043b138cf6d0f.js","5f6ec53b2ffa7c07019b3d95173bf588"],["1589a518e7b569f86f8d.js","cb7edf14e36fbd848c9c1b6f5065814c"],["18389e470637d07de6d3.js","cff8b50fe8e153368e3c5b52ee2cb8f2"],["1e32ed2ec0662179c582.js","48054fb9b2203e2c140362a931af6d83"],["205115c52fad00f0a82d.js","13796ed93789c308c8e4a6e20485bcb3"],["21dabee3339da3267ba8.js","a6c5edb6a6989592554d6941a196f566"],["2289ce11174c46fd5546.js","6de6d7916577e44e05484b8919e69218"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["27c561eb3fbbe791c042.js","c1c23a0c2a277e56acf8a8b7f4f1f2f9"],["2a4c359e12cdd9e9e039.js","70d1538c88aaed1162037c912b9dc96e"],["2ca37bcba65ca8f7f821.js","38f69f1f589c63b8999232e5d2f22b0d"],["2d1eceb3c5331384699e.js","961b9ef38c47658e7d52d81db8908c77"],["2dc2518ad96be232e456.js","37b5b7f8a187fefbeb9b89dac91169fb"],["2edf09e14089746d5a89.js","255e7f713f16e5be76fcb793140636a8"],["38589d926fb93fb7b8e6.js","4e67bd5f9beca3502b8dec11d60b8814"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3e58480a234576802a43.js","b0e10047b834238060775a4a41ea26fe"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["42fefcc49d77432d4aeb.js","f324cf218eeeb40b7deea8b31dc49152"],["441aa64d982548b83f08.js","73caabff8296e8a135265b36c7a980a5"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["484a3ffe744bfa610ec7.js","ecc859dafc0fae16a833830e848667cf"],["4be81348a5e16d5f6323.js","7649420df5f4d2df9182c27f6a0eca8e"],["4dda9e663ad588c2da06.js","a72f1596dcefc3ead4bdb59e279ec3c3"],["4ded656ff236e7f68c47.js","0b25a79416eb8561d9c9dda440ee2c6b"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["53f1511435e5ac44445c.js","bc7b9729afe1eff059f68107ad6a7c03"],["540f7d8a645d215351cd.js","67f3fc9d038f3c10a98d29396f539148"],["56cc6ca4246281a4ee77.js","22178b2384789520550808a125d9caec"],["588fae49aedbb66e0723.js","692f54ad8a6f1a70f88344ca5f222f43"],["5b89153c84411fb4abee.js","fb88850b2c069e8b0a618925f68779ea"],["5e9cccb16cc2f9e444e2.js","3bc46728a9923262875b10e8d483751b"],["692ec13e1068a45caafd.js","366c598ea384b9c40d4d36d57836986d"],["705870fe15f8c2af2065.js","e6c334c700d354793ea73ae9002ef2b4"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["75166a75fd48d383a8bc.js","67aab8ed82fda981bec79f08de2f7630"],["7670a70060a175994930.js","9b981a6b6e41ee4f8fbfc2aa9e3e530d"],["76c3056cf1b80dabd3c7.js","03f76af557953b5389e0f70d1107c0a1"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["7b718fe33fb58ea267e9.js","427d0a22f32643a6159f38602c4193be"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["806a9230a2b371f632b9.js","9b4a30e1e7147339643b32f3c8415e3a"],["818983cae4a1654626ad.js","c0b85353a05e08ff757dd29514c90155"],["848105c3befc4cd7e700.js","fc37531d42172e7e552f6418fc9f6b7a"],["85ce5b905a7f072d8ff3.js","64ad8ab4fde2e040e31248d5b0687607"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["87667e3be4dd6536e25a.js","bf31f1a1dba9019b5dd72edbf5caa3da"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9015e03bd786580ed830.js","35306a4ff1cbbceefa5916bed7ab4b22"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["926591dd5e6947b286ef.js","6b40c3b7d1593e9ad4e077d08b96beba"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["932b63bf1f8d2242605f.js","6b70f6dcd67192662c23d4ffe8837555"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9af5aea762eb651222e0.js","4ea8b1bf820e4acfbff774d99a62a892"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["9f7530782288bf816a64.js","93c253ae86adcbbd2d5ccde0db88a09f"],["9f7d7620497ca14ef0cd.js","76a93693ab6791be4c62893695534c95"],["9f90c0988c1770c0f4d6.js","c154f1fefaf507da9ca9bd8e8998e733"],["CNAME","58e622340325843359475fb423e22b4c"],["a1e61c2e76f9280f53b7.js","e5a2ac9ffa22607026530d9cc63c6dfa"],["a2899a2af7a011d2e791.js","bbf2b7b24645bf338a7214370a00cf27"],["a29e720ebaa9bd747581.js","cfb0dd346f6fed37f9ce1d04a132ff4a"],["a413def5b830a4834f84.js","0395010c0d3be6f3d4ccc8728ceddd8a"],["a8082b5d6794f4f9183e.js","3eec58ed7f761880e80155a0f19b490f"],["a8fe554ee0178feb804e.js","49dfc35a0431974e1a0685a40efb6903"],["a96cb0ada2e0a9accf0a.js","988d069202db23e3dbc13169495ad97c"],["a9bec10d16eefc22a289.js","870d252f3632f8d5894e82329af3c4d5"],["b06c23a7f24e5bb5dfe3.js","8bc84e46fe074ad703ddd9f0348e153f"],["b2d2dc3e01fa23e9f458.js","afaf08a01a488fb52471ae188ceb259e"],["b383ad45d3485cfddf28.js","3d376c7fb0ac33177e259240fac06bb2"],["b8b5ebe7c2c3b315a2b5.js","1b0aded5ab4c0199857104a1b9240f75"],["bad35896bd00a5f53c63.js","a96521ae84cf87c873a7ab5e4300e2e5"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c2ba03c593759da2f1fa.js","f483f19ff94639503c59b29d3454dda0"],["c3274c14d70f7858450a.js","613465775e2199818aad4569ebe40b57"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c53b1358e04dabee0e01.js","d0c3bc3ab0b7a7114ceddb41047b7f8f"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c68e8d2d45c7edfefe0c.js","ca5fab95a18a7e74052ed5489a9e33b0"],["cc2f4813c8a6c62c491a.js","354c925df49d9add2b0f46abad090a7e"],["cce3424f0a527a9ce294.js","e3ef1bc0844cb180c661506cdde41b28"],["cde8618ecb278a3ef379.js","223a70720b1452caf9744d82bc795001"],["d2131d1a6554451db85c.js","50ea38e3a60bb088b61c5118f033f385"],["dbaa54ed72af8efdaaf0.js","5f6c8af11eeaed8dd14b6ef462562461"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["de2b32092e4ab5674d77.js","f295a1faa8be4a4b9f4bfbd9b916942e"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e329fdfd8f520418b42e.js","581d43ce434352ef00fe3cd1f53034d3"],["e3d2ac43e3fc64f55ef9.js","fbd908ce506beebec23d80262847cb7c"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["ec4eaa6410eb6fcab0a5.js","9f4e91b9ffa9c5e079e0ff5fbc57a281"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["fa831019949ac2f7b3a97345a187ec3d.css","fa831019949ac2f7b3a97345a187ec3d"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fed6785d4c8275454a3b82e22199b7a1.css","fed6785d4c8275454a3b82e22199b7a1"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"],["ff58c01ad3af10a51dfe.js","fa2eb4e155e079a175baa7eac67e2bf0"]];
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







