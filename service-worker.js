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

var precacheConfig = [["0233f3c4e4bd427bc446.js","3a98970d0e5831f83325d492b28b45c6"],["0aba8cf22b9d3ec83809.js","f53d9aa2edab3b2374589a5bf28bbc71"],["0b5860e18a54800bb1ac6b09747585c3.jpg","0b5860e18a54800bb1ac6b09747585c3"],["0b73ec4274d7194a6348.js","441af77fec7482caa47f879324c87cb7"],["0b8e6502eb3643c2288c.js","8d37f0c37cd5f14d8950ed77eade0932"],["0db0a9026951b8ae351d.js","03f54a9cd2727b35d09b1a51792612db"],["0ef6746f5816e7f853e4.js","e710aa08f4c1b0d5ad04f3743c91b49e"],["0ffe0259656f73ece341.js","563ef4302d5ef1fc9eaa88a3402e7dd3"],["1081496da69e723ca346.js","ea3079e6fc623f3339b2df7eb078722d"],["14346b166dba921df707b1d1f5195338.jpg","14346b166dba921df707b1d1f5195338"],["16cda767c793276296f8.js","11b310c660e5b18cf6c0cd1f20901e42"],["19b00fbe4ed714a6678015f59a435d45.png","19b00fbe4ed714a6678015f59a435d45"],["1a97b0e64c2a44f10f6c4f71f303f8c0.jpg","1a97b0e64c2a44f10f6c4f71f303f8c0"],["1edc1def9c01721a2947.js","71344e1b306697929e62f1c84989b6cc"],["1f27810a7cf93623e648.js","916b6e0b4b81a4b0491d86035b08f45d"],["1f6ae91c6b51c9e3cc73.js","ccaaeef0392f8ca24dad64a60f272554"],["1f9c04c16d1ca03f5679.js","525bd504fdd2b95c244598692d6f8e8b"],["203740e748f26a71917681cfc4c37eab.png","203740e748f26a71917681cfc4c37eab"],["2139e9bd2459f988b7e697e8c279dd67.jpg","2139e9bd2459f988b7e697e8c279dd67"],["214f85101134f5a3faff7ff74838f583.jpg","214f85101134f5a3faff7ff74838f583"],["2201a50567a02e170614.js","769959af733743c91ab364529eac343f"],["2344dcab521dde7a5b433ddaa310eb89.jpg","2344dcab521dde7a5b433ddaa310eb89"],["243d8658dc2e85937bcf.js","8b153219c7302fecefb34e7010cdd845"],["2a2db743b432f8e0a0b13e03c7333a3b.jpg","2a2db743b432f8e0a0b13e03c7333a3b"],["2a75a04f7bb4230ab17d.js","683341575d96a5c648663217150f0f82"],["2b91c8a5a22293ff778b.js","a6f6a3ccaca14589026b44b692e7cf4d"],["2c44dd5f9fa0bb3a8877.js","684341dcbe6746cf65ab1568ffdcef18"],["2feee8d11c6de88932f1bc3d3859d693.png","2feee8d11c6de88932f1bc3d3859d693"],["32945def863210a4aaa8.js","f4f9351d7fa624fff6b202f5deac71cc"],["33d0dc72a1cbba38e17d5aa83319791b.jpg","33d0dc72a1cbba38e17d5aa83319791b"],["372c821ae312eeb2a0f4608795d4d860.css","372c821ae312eeb2a0f4608795d4d860"],["39479ddbb92aad8486cabb4eb9169597.jpg","39479ddbb92aad8486cabb4eb9169597"],["3abd35858d2996af6da62d794d558da4.png","3abd35858d2996af6da62d794d558da4"],["3b638b53048e793606ff3d7a685b6128.jpg","3b638b53048e793606ff3d7a685b6128"],["409166f0968b327b1c44.js","3f147e7b5a1c34733ae84a7168508c3e"],["41ec75dbfa70f824a343814a9f1d3901.css","41ec75dbfa70f824a343814a9f1d3901"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["47f10c3d3a24af1a1f70.js","34e9cc8913134f79cb098dbc18819ff7"],["49de758abcfae53f034c.js","7dd4e1b39d29dcfb98ff4ee6d71ba1c1"],["4a88b17e7159f427188cb32c69d6ac85.jpg","4a88b17e7159f427188cb32c69d6ac85"],["4b6e3cb70a25ef18bbf518d73c096c8c.jpg","4b6e3cb70a25ef18bbf518d73c096c8c"],["54c331a01287971afa287d4daeacee96.jpg","54c331a01287971afa287d4daeacee96"],["577e77ab407625cc9f30a06941c9fe09.png","577e77ab407625cc9f30a06941c9fe09"],["5919f0c470eb0637b67b.js","3011b236485e424f673eef0a57cf3979"],["5a41997f9f7fb21cbdf0280453780b3a.jpg","5a41997f9f7fb21cbdf0280453780b3a"],["5cf040e0dc9ccddde88f.js","c89b9a67b5f513cbff2fcd87faa0ecea"],["5daf464dc597b2eb40cb.js","6e30383c31384488584a20f3def1fbaf"],["5e4719268d251372b2d94826b3005f77.jpg","5e4719268d251372b2d94826b3005f77"],["5ec91428c4b4c195177f.js","accf141736196f64eb0edb38d65a8460"],["602d1a94644a11cad232.js","29d792ee1d4bf97ed7e2da37cca8e311"],["61cf0217f4a76b2c210b.js","fc27cdaa4222f91b590c98b8e0553297"],["63394ba753377dca4cfe.js","25d322d328f425493c73ea22fb4f553b"],["663f43ef3e48a61bae68.js","aeec6b935173aa38760b32755eba798f"],["664e53fbae8f6f070ecb24687cb17b2b.png","664e53fbae8f6f070ecb24687cb17b2b"],["6af4d19a369d971c2628.js","f7eb0fc308210c5620d6f4159e6fc37a"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["719404846ed182e2cf38.js","0207830bf300f74f169e0115ea2a1ca5"],["7368a35877db544aafc9.js","b1a76b2e7e567312398ae560d77cc2cf"],["7425af1240dc68c7732a.js","9daf45e7064cac6f84060554787b8785"],["74eb094fcc2d1ced498c.js","a2cbff7d64db24aa1ee9ad7f3a51a163"],["771029b8a3701c597302.js","0987a7f37894f5d48d06612153c70283"],["77db353723193147a0ee4dd6bd4d12b3.jpg","77db353723193147a0ee4dd6bd4d12b3"],["7980836334b8ed4af7e3205a58b9170f.jpg","7980836334b8ed4af7e3205a58b9170f"],["7d3879487b85273c45ce.js","e39068ce1a524fe503c59cef42faa9b2"],["802e416b64f73ee7eca55e625abbf83f.jpg","802e416b64f73ee7eca55e625abbf83f"],["823e76d18b9f81f8b67f.js","f76106f40593da41776469f62ca8edae"],["84854d06ed2242c4df6e.js","c50dc6049ce8cbd433687bc8b1a080dd"],["8705b8edc207a2cce0eb.js","af928efb8374ab3bd571d70009c74ace"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["8b29323f74df758c6544193ba1d42396.jpg","8b29323f74df758c6544193ba1d42396"],["8c0a8e667cceab2a29a3.js","c9e0d74618cd8c76901321340bece9d4"],["8f8754fd536952601e96.js","a84cf2218411789cc3ec353d3afb97bd"],["8fcf38ebbbae2cda8902.js","72e44d8d8a43b5e1d5143fd0d615a655"],["8fe40f99fd449bcb9796c336406f9964.png","8fe40f99fd449bcb9796c336406f9964"],["92031e232450b72e2a83.js","ad7a89571ea255bb321f08b0c312166c"],["92a6cae6805cab0a1435.js","31903760d600ab9edb21d587a8f66f24"],["963f7bbdf0639eefd600.js","39402f0eb96c91ae5eb4472fc42daf64"],["9b527915732bcabc20427e66f09ad20e.png","9b527915732bcabc20427e66f09ad20e"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9c40c3964552e14cb39351b62577f3a8.jpg","9c40c3964552e14cb39351b62577f3a8"],["9d18d49b9f0df6b5996fd952680fdaef.jpg","9d18d49b9f0df6b5996fd952680fdaef"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["CNAME","58e622340325843359475fb423e22b4c"],["a00a22b32dfd36398880b0ef9fa5deb8.jpg","a00a22b32dfd36398880b0ef9fa5deb8"],["a1d03687e43be7097bd6.js","8eee38acb35de1509ee95091b999a01a"],["a7bf545291246d8c8fde.js","caaebe86a9f1079ea55d3bc106be8463"],["a7e9bfd95528004d7108.js","b46efd9577d40116e5e0d0d84bbb2078"],["a9cc86190a02cc840d30e3b0303d081e.png","a9cc86190a02cc840d30e3b0303d081e"],["aed8d2b4d0fa00496d55.js","c9dafacdc9c786da5e18d7761454c465"],["b0bc1068cfabdc4713f7a26278dcfb5e.jpg","b0bc1068cfabdc4713f7a26278dcfb5e"],["b23e216d351db63d84ef.js","9c9bd3bc6aa4580541d97374b26ae78b"],["b2a57ace5b23eadeff67.js","8c9e768f35878f315c3a56bf00593652"],["b864b7285c06ac42b1fd.js","0a4ea4af7851a0e05166fe74a70977f2"],["ba0a19c5725f1bb57b5c55f413391d20.png","ba0a19c5725f1bb57b5c55f413391d20"],["bd90f6551b799df637a0.js","1441b2bedfe1d5ee45881d9a23e339c5"],["bf03e3db2c793873832d.js","a00f1bdc4dd42d5f766aca425189cf11"],["c1ed92c55e915755755f.js","da702e0d64dda5a35a63415460ed668c"],["c2e1da50dce6d35f06eb4ebcf81fba7f.png","c2e1da50dce6d35f06eb4ebcf81fba7f"],["c7b43c278063ece54634.js","c0953201bef77076a12969c475b77b66"],["c7f3ceee706bda7d8676.js","bdbb4442a58d7e51f3152ecc342f85cf"],["cada5ab041d78f56cb25.js","59f9c0219458291d66ac62a85a8d69cf"],["cc33c82b5d607f69c903.js","4031064512657fe4407db2c2b9937abb"],["cd04eb912ea1a1e51f7a.js","98432c482e24f1404bfe78334d891fb1"],["d3cf2de06f11b22939c0.js","553b5a22a51d1e545ece827f26c1adbf"],["d5b06d3ed94813782983.js","3fe75e1407e67c5fe433170b763e040a"],["d760eb2641842b4e700d.js","889bd4d224d71be477756f353f80420b"],["d7b69eabe186a794a85d.js","a9339de114bc80c790a1ac59d1aa7662"],["d96e2c44d58e8a97df834c39ade88936.jpg","d96e2c44d58e8a97df834c39ade88936"],["dbfd23d5444c3d525bf64b96324126bd.jpg","dbfd23d5444c3d525bf64b96324126bd"],["ddb6e7b377f3cce2eb96.js","20cb02781434a94264ee72e5e1142772"],["de584a11e836220fa27e.js","2c436fa0cc358023e2936adaacdb5789"],["deb8cdcc0a73deb677069db3987299ab.jpg","deb8cdcc0a73deb677069db3987299ab"],["df66a798dd5ea5551ca9.js","5c27704b23285d901bc163f4494c8041"],["dfea8d54f94eebce2d4bb05c58c0e53b.jpg","dfea8d54f94eebce2d4bb05c58c0e53b"],["e0b1b6c112684ac108ff.js","0cb1cbfd3d567d62d62b114c25168352"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e46f2129d3c7cc08fedf.js","cd7d893a1c89f3721a5dd0763d5fd831"],["eaaa5796310f9af36760.js","249cc6e444300239c49fc596db42b575"],["eb9e2b5d9b9c41cdafd6.js","f1bbab472cc611c0051ddd1e7b4fff2f"],["ecbe58ba70d0a591b1f1.js","2d7f60e4d2a4990a07d47658633366dd"],["ed30f8b21cb7bb223196.js","a4379473a177c91576217ca4cfd0fc05"],["ef88114c306b06a2c883.js","0a1638221e7f54aeb29bb953fd2dcf1f"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fd49d3514fb2eb0b13f1.js","06ae4b30e61092861c706ab276dcf428"],["fecf78377e2980cc9d7a85c423f79ab2.jpg","fecf78377e2980cc9d7a85c423f79ab2"],["fedbcc7d7b16a61cb18325d22b1d3fb4.jpg","fedbcc7d7b16a61cb18325d22b1d3fb4"],["ff1b7150e67cc945aba5.js","7e4133e5c79c353b410a16e30e673982"]];
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







