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

var precacheConfig = [["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["0719124ee9434d36f3ad.js","87d150448e250bdf81304e6d91baafd3"],["08398eb4267f90cea3fe.js","aa9cef113a541064443d07f0451fb21d"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0ac5807c4c8368294f25.js","b01bbf63abc270f9024c8de36fb61d3f"],["0e19ccb87bf87afed042.js","176ec81804b543cfb3d664b98202a2b9"],["0e639d8578665bd689dd.js","96031c6931248c666ccd2fe557665d69"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["161414f5b6d546df5faa.js","9e0e9f18058876faaeca08737461ccf0"],["19fc60ebf7d5d383d0b3.js","2b16ca0b23cdc8c4e7fba28b762f8ca9"],["1e015eb92d90f72fecf0.js","c9412fd2f893e334fe1295a2332fcc1b"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["25d720f9d7826f37649e.js","be728515300e33064da63579d4b54079"],["29b64a0864f13cb3d7d0.js","224b1d60b2c4e33ba70fe9db07378764"],["2a135726278d60f7597c.js","e4c85ec07f98bab16d6b10accd3da801"],["2a1b5aeb8d55dd033627.js","8270cd238cbb1ba87f54588a176d787d"],["2fa8895af44d88311279.js","dcb31b6be2f2181564feefaa6b86ada6"],["30ede29e14d418dde24e.js","c111dc859ed91e18b8642812ff9d1d19"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["39c2d1e4959295ded65e.js","c95fdeb8261a605725ed21b2bd183d37"],["4091b45a8a41bae00b3a.js","50902b6fe68d186ef525438c4eca971c"],["426f5ece510801a4e1d2dae122b6ee60.ttf","426f5ece510801a4e1d2dae122b6ee60"],["43c3acb2f7f0d3de57ff.js","ffb5e27157632ae5825ebef213ccd01d"],["43e5a894b2f948f2b65e.js","7f4d1f14c0d793bde602147b0378387a"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["4ab47e28c8332ae0b2bd.js","6c0afc1529e9b31c833961b40d5a0d6f"],["4dd2e9cac8181d35c8df.js","bd5720eebc30535df4ef7e1a954acfa4"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["50c58f44aa99b4860e78.js","11be93491405f06d534814674b7f3e19"],["51c234229260ce842caf.js","eb97754de869ff2b388b2f7feaee974d"],["56181cb4a82afe97349b.js","9f0435d9d7f963fa73d36e6291b835bd"],["5ac882f4488d3f789f1ea6dc2202f1b0.woff","5ac882f4488d3f789f1ea6dc2202f1b0"],["5b62fcb38198ad729861.js","53c9ec7acc1884bcada694bfcabaa316"],["60777e1cbe7460755a9f3c2ef491a77c.svg","60777e1cbe7460755a9f3c2ef491a77c"],["6822664cf97b2a8b2a38.js","61dc15b325d83f737a053da460158fdd"],["6a19706274a027c174b5.js","331b8397dcff5a67b11867da70ae7ea3"],["6b7da3bcb014963331d9.js","b1ce9082641e8404f8ad2d535b98b0b9"],["6c962045343dbb52bf5a.js","75b550eef5d90ca9b6c03df5844a52a2"],["6ec63bc66b3e2a877e76.js","df40732472e2c9592870669d130da3fc"],["6f0d710ac7de776b1198.js","583b8075c0bec843870274fa52141791"],["710043848ce2c1405838.js","923a9885ebc333db2da176018c61ba9a"],["760ae584945b5de409bf.js","8af71709a84d0d45dd4072de115a060d"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["78066c38f0696bbc8c18.js","ea6b1e891dfe26baeb7b650cb60b5974"],["78fdf8c66927d09f24e5.js","0f3a5e83b2decfc14a56b6e7b9f0c292"],["7e49a939e385bef07f9d.js","c06838ac4fbb101f7c785a2ce1be6782"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["7fa3596e2b0c4ccaa916.js","c110effb8e2d19384582e264ce35421a"],["815f99113e8c7e3f492e.js","974477aca775d80cc4609be9bcd78904"],["83655d98a486db182551.js","de42c9cbba53059325890f4c90ae5ce6"],["86f8914cf3c5b9258e2c.js","ad03ccfb532fdc06051e6003e6851a80"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8de298667a0676e0d48f.js","c6272069da6fc7082d0de21c7904169c"],["8e56f11157eacd105f6d.js","e73710fc649837c6ae0daf5bbc9decc6"],["8f8ae6ced115657b3fd3.js","5629ceb4eb190379c34dfddb8b8781e3"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["930c2122059d26766349.js","d15838d54cf547bdc51e0e8c088cf19b"],["93b5ccb549f147e12ead.js","a5dd1bec72d6c7730c92d741a8bdc3c4"],["93d3178064e1779e3d7c.js","247d35bd29a609307376b62ffeda6413"],["96c59638c9cf13f96e69.js","c262642eb96873187c44afc893f4cb25"],["9708dfc9edd34ccef4b8.js","a6b508794f4bfec49f2757e38a73d59b"],["988e1a1f3cf337032cec.js","2d2f05b84529d9b86a762d5b82aeb8d5"],["98d8a0490afdc0b84fcbc2015a427204.eot","98d8a0490afdc0b84fcbc2015a427204"],["99584a26399d723edf14.js","c60cdb607b74c0137aebc3614654fbbf"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9b721457228173e37980.js","1d6421a521f9d9ef0f3e91a909fc0eab"],["9f3806b9eb4f46f3da12.js","df9addf9584e428a564081e65cc42bf2"],["CNAME","58e622340325843359475fb423e22b4c"],["a340637e2e37a015b56b.js","41f8f5ca4f678834e8885bf059544d4d"],["a4084b4c1015e3774ce9.js","8668b71178c6106de8c7b3d34c7a896b"],["a85fcaae4c363b7d14f4.js","66e5a9588ee6816f66b55a4646944f40"],["ab1edd5af916f2bfe555.js","1f28448972fc6b3b851c3b3c8b87c52c"],["abcd9495942dc8114231.js","4b802863620f085a3e487478275dc88e"],["af7ba113b068faf58e24.js","634cc38c26aca5f0b4540d0a54dcc2c5"],["b780182449be34527216.js","755a16514f7588cfd71a0dff39b83910"],["b8503bc7b655c47b5cad.js","a33e5b6f6557c8eeec0d86933d9053ab"],["bc45c51eab5378898b40.js","a7c6be424d44d460c2e5461282520b33"],["bc6288253c873475a61f.js","f093344e3809b8a37ce8c2c19562b491"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c23c0c3ed6004026504d.js","00bc38fb0c69ae7567470655fb88ebe5"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c7ca39e52312100793f5.js","dd9511a188ce0cbea3a12b9da45d4ca2"],["c8592aced76739eaf53e.js","4c1d506f0821bc5f85d6e434e1be478f"],["cb3a8b5849d6abda5536.js","da76d1047a9fa154d39b570d4223ad29"],["cf8973ecd5ee141abfb2.js","60f915c496f475b3f090d40f57431996"],["d3cf0f8e60e43edba1bb.js","6fad03cad14921593f3098e69d11cf52"],["d7eff9b86910adf4b95d.js","04ef05712781438b54d798b8a9a1a87a"],["d865d88d49d2bb28310c.js","2e69ba3d888129e370281c6f1653f055"],["da9b6c13bbfc40b17ff7.js","66da4c9e41c5ecf423770f43f0a4b128"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["e99267dfa9b77a2c3be2.js","e3887ac3da821a96612b66490f6dab97"],["ec0bfc5da1c2fdf88f6d.js","0391bb4d661d4733f3ad2023bb4111aa"],["ec607491f0293a2e773b.js","e04395a302b98393346689b60df18215"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["f033c969e2c5fc767009780c6b880eaa.css","f033c969e2c5fc767009780c6b880eaa"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f4b1cf3adf5350bc9f1c.js","4604936ec9067302c6ce26efa9716f8e"],["f95c2d482be04140998d.js","734d97669d4ee8919a41cc8cfa144ddd"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fd86e60462280a1f379a.js","83b3538d5727b8098fff9c27ae26f995"],["fed6785d4c8275454a3b82e22199b7a1.css","fed6785d4c8275454a3b82e22199b7a1"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







