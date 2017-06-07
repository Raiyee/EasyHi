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

var precacheConfig = [["02a691864e925cd2a10d7184b6d83513.jpg","02a691864e925cd2a10d7184b6d83513"],["03464fda6466948181ecf570254fea1a.jpg","03464fda6466948181ecf570254fea1a"],["05ab28f429f2f1222ea78474051a113a.png","05ab28f429f2f1222ea78474051a113a"],["05b13daad221d1fb7816.js","855e41bed4dd690d2b2557a0c5022a93"],["06379fbe89b314784cae.js","0908c9d11f80c53fd25a25cca0939389"],["0a2832d889c6053877a56a4bfe84f2a2.png","0a2832d889c6053877a56a4bfe84f2a2"],["0aa783d2c0c2a8b0278b.js","7c32894fc671c40a58ed67d068846ef1"],["0c71211b29e288c8a023.js","8be4e16ba4eb1e8564f48c6047e7454b"],["0fa90adc0ceffe1f3ff3.js","7a9cd86cd7d7b3b263e42ac58f5fc8b4"],["10f39e93eb8807936f80.js","0f03e1787318ed0ba2c14dbd7822a658"],["144c7f1768ad660cd48d746989a423d4.jpg","144c7f1768ad660cd48d746989a423d4"],["14f3929351423d7d4155.js","fda6650ee37b186e9e7f5d3c5ca06b26"],["1c0b5d46b98288d78721.js","05a2e5cc97d59309b9f8e551a834d533"],["2178e6ea94175ea64ce6.js","2afc8d27e59909515b486f5280b91eb9"],["22b66bc61396174c407c.js","8f08287a97f1136b1968a269638d29fa"],["2417411cad2b44a00233c28b375f26a6.jpg","2417411cad2b44a00233c28b375f26a6"],["244b25cb3e5a0f8d1005.js","fe465a36f4d073420e63a16f4381a8fd"],["24ec5b2735820123a70d.js","da19224b1fb562d254a823d6f5ea0839"],["2d4ceae44327be5ef7ea.js","5f79fcb4f0be0a0d70a79ec4713b80a3"],["347eb09f565982d28bf8.js","13537a374631db36d711fca4c9f965b7"],["36ed9f0e6f3976fdc3f3.js","f740d13139288823e7e8d4dfacd551ca"],["3920c9df22836a0f7190.js","38ef4a830863582b0b274cfa9ad859a7"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["39e976eba73a415b9dab.js","cad93a2987c570a1a91a4ed1b83557e5"],["3b15f8591ac72c146ab3.js","66b469230b12a9943c8b0c0c5d83410e"],["3bf1c990bb13afd116dd.js","52fd09a5f7b709a77c099d913d6bee48"],["3f3285f78b0f2d1ab619.js","cc7343aaa06ac0c4b514cb9ba503a895"],["41b81e2be9d0183040fc.js","00f347fd898fc25b5cf347d35dff4023"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47e4ea73f2414a8fef21d498b4d8e126.jpg","47e4ea73f2414a8fef21d498b4d8e126"],["4fa4b12daf4e4b87c6d5dd110b44422b.jpg","4fa4b12daf4e4b87c6d5dd110b44422b"],["52eb511c4a9336ee4ecd.js","b0eaedb3a9290cec7f39bb3d3c1fd0aa"],["53388d8c3d9e2c27fea9.js","556aae9ccec2aa43e657efa431c3fc8f"],["5561e13bcce44e2deb7a.js","ecbda01dada2e3062ccb58b9a7db6ca6"],["586d90ebfb2d4da3559b.js","f585f781efd2fcd8a08e08efcf0d6e26"],["5b0a144687e6c6c7f59cd44b33db292d.css","5b0a144687e6c6c7f59cd44b33db292d"],["6105d39c1ff85f262670.js","368830cad63e3d0bcd421640e463bd8e"],["670483e8e27a757af376.js","57e11411367bed16e5d44b50de3e97cd"],["67c978631769e5d7f127.js","e43e956daa0bb505eeb7ce7c6dcd93ab"],["6cedbf5c7c7226e840af04402af96409.css","6cedbf5c7c7226e840af04402af96409"],["6e20bd169e12992e3764.js","8a626d7914b6a50c03f4e7f6bcfdff9d"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["74910542930864575fc5.js","0c5f729198b3952165b7c64d8977a213"],["76ebc0fa0096021ec9c5d3f5c10208b7.jpg","76ebc0fa0096021ec9c5d3f5c10208b7"],["7f2ccb65f4f69a3c09e50f7d469199c4.png","7f2ccb65f4f69a3c09e50f7d469199c4"],["807ed3566262bfe45ac9.js","08dab36e9dcfab166706a893c8093e6c"],["814a7c71d73b3c4bb6c2.js","553d0a993aeb116935b3718476d71448"],["834abeb45ed5cb051a07.js","c983e5a10df84277e90e14a047b12900"],["841d0dd7d5caf478b284.js","db406bc9434d38f7b28e65be681f6aa8"],["848b0b52fcabb8a1b6aa.js","99381a6afd95a0eee4a9e3fc80c2ae0a"],["87154458a8ff9a2d62b62164d1dff28b.png","87154458a8ff9a2d62b62164d1dff28b"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["899214797b2ae66c3f79b643ac9656ff.jpg","899214797b2ae66c3f79b643ac9656ff"],["8c877c24d56219564cc3.js","6bf78a61685b705c86c5d6b73db720c8"],["8de2540cad7abb09172b.js","51a3ec1c9374b7edc14de8ed01e4e4ab"],["8fef6c8a194dee2a61bbf79a9a1c2010.png","8fef6c8a194dee2a61bbf79a9a1c2010"],["9063bb98be0c1936b3b9fe2fad5a606a.jpg","9063bb98be0c1936b3b9fe2fad5a606a"],["91ba7456ffeb692ac290.js","85857d0d73bf19d283f2dab2b298b7f4"],["9202bbe1c525577fd1d0.js","3d280c7ae5ad95c92486adac18ffce1b"],["92de28afb08e2bd7e8ed2aa0c5a62f16.jpg","92de28afb08e2bd7e8ed2aa0c5a62f16"],["9307d67aefe614f5b8f0ffa5dcdcbd79.jpg","9307d67aefe614f5b8f0ffa5dcdcbd79"],["93f257d137839fece95b.js","e32173861c3558dd31cce4cfb7d79fcb"],["9419dce25cc9a4f516d4.js","a122f153dbfa964bea71e28b90d3b56a"],["9733056532d81f54ca46.js","a3d511eea93777ebd3bb1792046fff7b"],["9a044ee422d29e39ec78.js","e903775741f25e7aa5d1dc4043fdda08"],["9a88e41b786c490f358086dd8608ec0e.jpg","9a88e41b786c490f358086dd8608ec0e"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["CNAME","58e622340325843359475fb423e22b4c"],["a698bc4359ad55394f5f.js","cc1815da38a26d9fc4deb1dc8405f3fb"],["aee3f2409ccc8484c0e1.js","da631023b28928a2507c318ac9245540"],["b1d70f18526333cf48ad.js","f49bec1ab92d48ae88c35f2da674e9f0"],["b769414a2e1342597724.js","eb3edc4f079f357cd0bebab1f443430f"],["b819f6de678ce1aeac57.js","3a553f7a717493528d151e7b325188a4"],["b91bb90ca7ee0e44099a.js","610538ca9ef5fe8d4a90f71aef717044"],["bcc18c47b008476a7365.js","eaf60de140bba9fd656aaaafabd81ea6"],["bf5a99e1584a20bf178d.js","719d50ca4633af5b3d876fd2166f0112"],["c1cf9fc2a99bdacc838d875d08af072b.jpg","c1cf9fc2a99bdacc838d875d08af072b"],["c483dc2c4fd80d51cbe38751ba6610da.jpg","c483dc2c4fd80d51cbe38751ba6610da"],["c4a6d327b026e5018088.js","c63366ec3e1b4edfd3f3b54daa391159"],["c51ff1a2e493ef35f039.js","0e16e24e64c486edda588ebb99fb7a05"],["c59e86fb0bc24b9c5d07c74c1581c692.jpg","c59e86fb0bc24b9c5d07c74c1581c692"],["c5f6c927967bc5ba2b0ae14b5400c202.png","c5f6c927967bc5ba2b0ae14b5400c202"],["c91709add12dc23cbf5d.js","f30a2863bb33b32ef73854605cced30a"],["cb27ef279b8314410cc7.js","557d7f72936769776726170558ab1597"],["cf06f5bb3536168e5dba.js","6f1e4abc60891106e285fc446d736f9e"],["cfcc8fea9c63214bfa58.js","8fb474742bc47a6cc933a9131c08dac4"],["d0ab3a9367d2fe1ad160.js","e73a00d593892a9d574fa263fe5a3292"],["d3a112cfa82232697abd.js","1d891a088a253ca6aa010391c5e8284b"],["d74011a74c207ccdd050.js","913f6270a673dd21c74b67462b24d31c"],["d79fcfd4cca2b74af536.js","48851751b1fe630a3f19546e71c199d9"],["da2c003da99e7c64d42d.js","fea65759f940187ddb6cf78ee7603b2c"],["db06b2cd7b11efd39dd6.js","bff29bec3114352fb7c3d1629f1459e0"],["db53b49dec9db712f912.js","9d8fd936b7f1db4fdb2dbe7aff32c38a"],["dc81a79d9ea47aabf1278690f003c57a.jpg","dc81a79d9ea47aabf1278690f003c57a"],["dda7b3c0610c8acaefdd.js","d27737cfd52041849541666ab15e625a"],["de449b0d3e7231b375890addd0c93633.jpg","de449b0d3e7231b375890addd0c93633"],["df6a3466134b8691e316.js","9bb4f1c849240298e6bf8e81a5213aa6"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e2f5c31731fb356ee3c2.js","495c3544956d45916fa9cdadd9463cab"],["e49cdb7c2755abd49c7cb5f91b2e6043.jpg","e49cdb7c2755abd49c7cb5f91b2e6043"],["e5d51a3e786bf321b3b1.js","8a947d111ce2eeb561dfcbb0d44f355b"],["e65f64ed5bcb4d261239dc16e925cc7c.png","e65f64ed5bcb4d261239dc16e925cc7c"],["e92137d9e7e911720b15.js","d40eeb58206e67e93b7d893a2fd251e3"],["e9c062a9641a76d46fb3.js","bdc4498cb75951d2e8acb122a573b77a"],["edfe3eed7c3dc2d825660dc64afeccb7.jpg","edfe3eed7c3dc2d825660dc64afeccb7"],["ee4dba197e487b13674060910a212e22.jpg","ee4dba197e487b13674060910a212e22"],["ee6a1fa5af8dd21c2753.js","2301c24ce7360f4fdd0b9906f5b45fe0"],["ef01877b1cecaf2427a4.js","479fd71305730857860f8ed56d193d20"],["f00c37923a8306232793.js","68f27e88b418fdc66ce422936060c5b2"],["f1976c75dd42e17846e8.js","2d2001d419e2e0ed01e336e740fb0822"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fd372e94a1e42f2d504f.js","0ceffeafc1b9efbb83a9cc9549aae542"],["ff235cf225c289941366.js","ee813afdcb3b956d8ef0edb08a0ad9a5"],["ff253feccc090d59b6b086e16309581b.jpg","ff253feccc090d59b6b086e16309581b"]];
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







