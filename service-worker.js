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

var precacheConfig = [["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["08cf26bf34667fbae4c0.js","dffa4612b5732724cbd9ebe38b1a8ae9"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0aa783d2c0c2a8b0278b.js","7c32894fc671c40a58ed67d068846ef1"],["11a42edf5431e5e4e1d5.js","2db52b1740641ad54babf6c7eff1bae5"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["1465c14e57b6c3036c88.js","2d70e26ebdc01a7ffb723e37d92a5490"],["175b340c41d8c4e4d7da.js","79d028bb2034c8276a2c503c5036c4c8"],["1785c7097d6765a2712a.js","8b9c377e613f07cc4a55b5ed76030cd4"],["1856e5006b960f85a518.js","4e05f16ad8e1516679a9b2cac817dc28"],["186ceef7310690261bde.js","ba206ef51201ff1e201372379abed064"],["2000f6409ade7a3f8030.js","f81676460ecf1315e17068a26bdf698c"],["226b62c8e84c87b0f060.js","cb261895127435134673772f5e32b9ed"],["2274a627efe437d7a8ab.js","3fead37156c8d4e512031bc5b3fa43f0"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["25b6f444258449477403.js","d8f490fb5c1d5864613eba36c55c1b45"],["2880c822fa647e53fb4c.js","2e72b52e2ede1ad01f3943f05b5b9350"],["28819d3b32f1ba2722eb.js","0885c794e1f71944e15f0e6266667299"],["2dea44b328b7201df153.js","b3f4810656cba47d9d397a1463ffe5d3"],["2e836beafec4b9614acd.js","82bdde84b2c7739eb4584dc8495fb4c8"],["2ec4170ad7c2950b25d9.js","b19180cd77c9d383ddc1ad5d9541966d"],["32e75e78e0445ffb2b33.js","f16799ae8abc9f471f13dce86134a1ee"],["36255429e51f87b5fdb8.js","ab9242a85c3f269bf0de783288099a08"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3b55bc581744ca57b057.js","c1e608d8cf9421120595697284ed912a"],["3d8a3426215073a0542c.js","89b36271a7f5f40f4649f3c4d20ae230"],["4035bc59d086e27cf079.js","43bac482b0d1c326f126e75797d27df7"],["4069d854d4ead3027215.js","5b3cce089bffb98cc3e87ad2cf116a80"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["43a71fafa4f2539ee81b.js","26d344a992134ef1c9cb2742053eb6a8"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["4f700baffaf56a2b5095.js","686f221fad49667b290f0fb0d6180ad4"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["4ff4a89f508f864488ae.js","98e04811655b955c947225ae1d39176d"],["56cd79b13ca2da356528.js","4e80d83ec1666ee387218819f4c2572b"],["5dafd4f60a60619449a0.js","96d3559d9822ddb2d184efb45985887f"],["5fd59e73eab6b08fa7f2.js","0701e965ea03f464565b13f8e742a67f"],["63259e7cededf0d6545e.js","b2a8e2dee156842a02b391f504440d7f"],["65a313dea97ed3276e27.js","86169d4f0a4be97de58f88d6ca1c4831"],["65c621563083071ff9d3.js","217e6b2247b886ab9e1da7137701adc7"],["68a870bb1dce9356eeec.js","aa10fbc45c474c8f26e8a2f2c9b91c21"],["6931e78a7fffccc7efea.js","3bd7ffc8db786bcb0b0461003b3ac99f"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["766f7ec3f117867abe8f.js","abd20aedf58490ec37d00e58fd091041"],["76ac5d20064d57023e78.js","5db6ce25462a287934992efd0c2a4ec8"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["7954617e3a2d7ae872f5.js","c275afcbda45e20bb9723f0ee72f42d0"],["7be560eed11c5f0ba3cd.js","86f84493821dcaad24101236afad567c"],["7ca4e350befdc51e4b08.js","59234580b8bd9df3a98ed2282e19a179"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["8119be2c354da30d371c.js","476712b9e47ffef6cbe0676909e1824f"],["82ec4c495d8489c98a98.js","f18b0505cdf6b5b592ec38190987eb72"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["88c905f52555363a8cd5.js","08dab36e9dcfab166706a893c8093e6c"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["89f588b572625bba3333.js","1e88909ca08c6a9e6b8c7eb637c5292f"],["8a8a714b311a5e344584.js","4ac7e89497b3b2a4cf1d189090e894cf"],["8b893c1134a1b3eca89b.js","e1dcbbd4fbfaca707ecf158c5a89efcf"],["8bde4a4554be3d1dbee4.js","285c7bc6b968b368978348471a445055"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["92474f43dc6e644cbc9e.js","c2f9b5faeb27d458f8df739f8066478e"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["93bb7eea0380a1156657.js","4f9349fd02ee5af681ff1194bb7eddad"],["9419dce25cc9a4f516d4.js","a122f153dbfa964bea71e28b90d3b56a"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9c4475d60f3c54f51c6d.js","226e12828d84fa3f501f060455aee04e"],["9c78e94d7165b3b731f3.js","2b33fcaa0755c5f6b5b63e56d16b63f5"],["9d575de7c447303bb17f.js","533cd93b1ddc80be91dc2b50421ccfbe"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["9e73116856ad4f0f7dc7.js","c4f35bfdeef097614604596e4c7edc0b"],["CNAME","58e622340325843359475fb423e22b4c"],["a4d51606a9cec38ebccf.js","cbd58937bded49e7fd0434ea70769918"],["a698bc4359ad55394f5f.js","cc1815da38a26d9fc4deb1dc8405f3fb"],["a717fa75cf15b16e639e.js","642e81b34b1b735b15e0ae0668d24356"],["aa84a6422017487b1d47.js","ee5f80b5c81acf683e9d6d2d1702dfc1"],["ae3658667784a90a27b3.js","25f3cfdc13b1df6bbffeb030ca64a74f"],["aedf7596f0aed28020a4.js","1c344c39cda73b011f037b8b29eb28bf"],["aff47a8c435e1e64ee1e.js","3d5ce683a08ebec0111c5e0a775f098c"],["b0426e24eee3bd7ca76f.js","379a587b3f428fbef93d9d57ecfb0319"],["b1ad730361979aa4f356.js","c4e5cfac56e193fe1d8691f4f6e62f19"],["ba1960fb17d6769a6f39.js","f9ec9ff3ee2a631353ca4eaea9c378a8"],["bb711522a426cbeee554.js","b183b601ccabeb7cd1a1554678c1939f"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c8233d22c51843928ad8.js","1b2d5926b9cd8250d718bfc29de67e26"],["c9fcb411f6f041a42a9c.js","9633e237152c9fc6ae2adce7c9606ee9"],["caa33768ca27bde5625a.js","e073e55237bdc429d1775894f5720f8c"],["caaa131985550eb93b7f.js","202e5a25267c04c38ca880e4ff3c7864"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["e0560c269fb62622bf0a.js","025b33978012ca5689b16ef277a6ff75"],["e0ff5c12a3397a8e3821.js","9f980c75ab71d150f03054a2600e3286"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["eea010aff80bc0d105bc.js","0f880c982edaceb99da081739c1d3ef1"],["efbe48cfb243db09021f.js","c9a5010fb53ae82ce030ed3fa8911cf9"],["efd7c2386f9752f96e03.js","94f45f7ac31f4716c5459df40a8e2b62"],["f359545a9d5591322ff2.js","36c68705a9f0d280da803047abb48a3e"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f6b5f1a38be8ee5865c6.js","1edac8252ecb481f4b9d7a0868bc6e73"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["fa831019949ac2f7b3a97345a187ec3d.css","fa831019949ac2f7b3a97345a187ec3d"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fb7f81a5fe9bf23fdfdf.js","cb0f417187acbd537d538e26c530ba04"],["fed6785d4c8275454a3b82e22199b7a1.css","fed6785d4c8275454a3b82e22199b7a1"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







