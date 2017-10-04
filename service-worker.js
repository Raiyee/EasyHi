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

var precacheConfig = [["0aba8cf22b9d3ec83809.js","f53d9aa2edab3b2374589a5bf28bbc71"],["0b73ec4274d7194a6348.js","441af77fec7482caa47f879324c87cb7"],["0b8e6502eb3643c2288c.js","8d37f0c37cd5f14d8950ed77eade0932"],["0bf99fb0b3be2cf8ac0b.js","bece8fc7cdb073f911d283a6d82d98b7"],["0db0a9026951b8ae351d.js","03f54a9cd2727b35d09b1a51792612db"],["0ef6746f5816e7f853e4.js","e710aa08f4c1b0d5ad04f3743c91b49e"],["0ffe0259656f73ece341.js","563ef4302d5ef1fc9eaa88a3402e7dd3"],["16cda767c793276296f8.js","11b310c660e5b18cf6c0cd1f20901e42"],["1edc1def9c01721a2947.js","71344e1b306697929e62f1c84989b6cc"],["1f6ae91c6b51c9e3cc73.js","ccaaeef0392f8ca24dad64a60f272554"],["1f9c04c16d1ca03f5679.js","525bd504fdd2b95c244598692d6f8e8b"],["2201a50567a02e170614.js","769959af733743c91ab364529eac343f"],["22a1e8b24a9642dd780a.js","cd52e011d3b0873840345d6631a00ae2"],["243d8658dc2e85937bcf.js","8b153219c7302fecefb34e7010cdd845"],["25d203d8aff0d7b0ce17.js","e9345707556ac8571838a909d88e9643"],["2a75a04f7bb4230ab17d.js","683341575d96a5c648663217150f0f82"],["2c44dd5f9fa0bb3a8877.js","684341dcbe6746cf65ab1568ffdcef18"],["32945def863210a4aaa8.js","f4f9351d7fa624fff6b202f5deac71cc"],["372c821ae312eeb2a0f4608795d4d860.css","372c821ae312eeb2a0f4608795d4d860"],["3914c1de0fdf126a3f3b.js","7043b62dd7f0dc0d415d13e854efcf8b"],["41d74ba697f2ab61e3dc.js","671616a0a237c2d96073d636b1b37a27"],["41ec75dbfa70f824a343814a9f1d3901.css","41ec75dbfa70f824a343814a9f1d3901"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["44d16b0f5dd07f191bfd.js","6d69283d1c3f5bb5a0f3e085fa9f6e4a"],["4732d610a15ba09a1cdf.js","2a1bbee56e69baa063d9ad1d02a0f03f"],["47f10c3d3a24af1a1f70.js","34e9cc8913134f79cb098dbc18819ff7"],["49de758abcfae53f034c.js","7dd4e1b39d29dcfb98ff4ee6d71ba1c1"],["563481d23ff91f638e57.js","faa40f1dfb37a5aca440280bbc767e85"],["5ab737d354b05d65b58c.js","d7ed6856b380ec2611b480bc654efa83"],["5cf040e0dc9ccddde88f.js","c89b9a67b5f513cbff2fcd87faa0ecea"],["5daf464dc597b2eb40cb.js","6e30383c31384488584a20f3def1fbaf"],["5ec91428c4b4c195177f.js","accf141736196f64eb0edb38d65a8460"],["602d1a94644a11cad232.js","29d792ee1d4bf97ed7e2da37cca8e311"],["618bfea75a74d27d9165.js","85c60e9ff7501f40ab7eb48790abd399"],["63394ba753377dca4cfe.js","25d322d328f425493c73ea22fb4f553b"],["6ffeb444084490c3395f.js","d51fe5dde6e4af27b60a0255141cc9f2"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["7198ef5f8bc1fae998a9.js","9082a25a7490529f7b74314356378c64"],["7425af1240dc68c7732a.js","9daf45e7064cac6f84060554787b8785"],["771029b8a3701c597302.js","0987a7f37894f5d48d06612153c70283"],["7d3879487b85273c45ce.js","e39068ce1a524fe503c59cef42faa9b2"],["84854d06ed2242c4df6e.js","c50dc6049ce8cbd433687bc8b1a080dd"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["8c0a8e667cceab2a29a3.js","c9e0d74618cd8c76901321340bece9d4"],["8c6cdfda98c75740c461.js","7adbf16c89dd3bfa3b83b5eabb6cebfc"],["8fcf38ebbbae2cda8902.js","72e44d8d8a43b5e1d5143fd0d615a655"],["92a6cae6805cab0a1435.js","31903760d600ab9edb21d587a8f66f24"],["93dcf170f74bf5d9176f.js","9c0306e9dd1deb16207ba7b3ad783f3a"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["CNAME","58e622340325843359475fb423e22b4c"],["a1d03687e43be7097bd6.js","8eee38acb35de1509ee95091b999a01a"],["a7bf545291246d8c8fde.js","caaebe86a9f1079ea55d3bc106be8463"],["a7e9bfd95528004d7108.js","b46efd9577d40116e5e0d0d84bbb2078"],["ad17ae860b07076140a6.js","cfa1f26290b7d169440419acb1568634"],["aed8d2b4d0fa00496d55.js","c9dafacdc9c786da5e18d7761454c465"],["b23e216d351db63d84ef.js","9c9bd3bc6aa4580541d97374b26ae78b"],["b2a57ace5b23eadeff67.js","8c9e768f35878f315c3a56bf00593652"],["b2e777fe16462790c5cc.js","67be341521df9d23bcb920440fe0ccd6"],["b4c1aa21111e40089544.js","747046d472b265e867c0f5cfe2bfb947"],["bd90f6551b799df637a0.js","1441b2bedfe1d5ee45881d9a23e339c5"],["c1ed92c55e915755755f.js","da702e0d64dda5a35a63415460ed668c"],["c61856ea77be046ebe0b.js","be426d940a5c80bc510a4749eac36ede"],["c7b43c278063ece54634.js","c0953201bef77076a12969c475b77b66"],["c7f3ceee706bda7d8676.js","bdbb4442a58d7e51f3152ecc342f85cf"],["ca0ac06200f7c75a3b00.js","9c8744645c9e4b0449a28952703cae5c"],["cada5ab041d78f56cb25.js","59f9c0219458291d66ac62a85a8d69cf"],["cd04eb912ea1a1e51f7a.js","98432c482e24f1404bfe78334d891fb1"],["d3cf2de06f11b22939c0.js","553b5a22a51d1e545ece827f26c1adbf"],["d45d9f7165000d0ba91c.js","1bdcb5a7cc443d73181744342939e43b"],["d5b06d3ed94813782983.js","3fe75e1407e67c5fe433170b763e040a"],["d760eb2641842b4e700d.js","889bd4d224d71be477756f353f80420b"],["d7b69eabe186a794a85d.js","a9339de114bc80c790a1ac59d1aa7662"],["ddb6e7b377f3cce2eb96.js","20cb02781434a94264ee72e5e1142772"],["de584a11e836220fa27e.js","2c436fa0cc358023e2936adaacdb5789"],["df3315c91449d8b75f39.js","96b35915cbb4b416ea3891e6e688b472"],["df66a798dd5ea5551ca9.js","5c27704b23285d901bc163f4494c8041"],["e0b1b6c112684ac108ff.js","0cb1cbfd3d567d62d62b114c25168352"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["eaaa5796310f9af36760.js","249cc6e444300239c49fc596db42b575"],["eaf03aa3136fb424d1ff.js","5f7865e50eec60d99883a250dea7fa49"],["eb9e2b5d9b9c41cdafd6.js","f1bbab472cc611c0051ddd1e7b4fff2f"],["ecbe58ba70d0a591b1f1.js","2d7f60e4d2a4990a07d47658633366dd"],["ed30f8b21cb7bb223196.js","a4379473a177c91576217ca4cfd0fc05"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["f76e75e502bad76a7357.js","81199f195f1253903d991d57c2c2c943"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fd49d3514fb2eb0b13f1.js","06ae4b30e61092861c706ab276dcf428"]];
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







