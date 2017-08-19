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

var precacheConfig = [["0087417682cf411f8148.js","88d6519217178bfb94fa01ef88ca928e"],["0185ee6762a70a347adb.js","5eee67af61d27627bfc01b62585944f6"],["01a810367ded230f3e00.js","af355d0f8b9b353970f5d9e4f80b0aad"],["0217ca539706ad856652.js","fca8628ff487bc82a7c415dc58ad6e32"],["040314f99fdb51cdecec.js","5785b067dc2dcb37337dbbc76e1b32e7"],["05c2deda7f6ca3548606.js","0e87cce34a7a67e6968ab8ca66ee7cda"],["0b2b7823ef0eb5c0afb0.js","140ec949fad32c0da0ca37dc9dd13a60"],["0c04dbf401abfdc74c61.js","6f4af2ddcaef79a5ad8460e5f3c5519e"],["0c090d462b929a255bd8.js","1c8612a08a774fdef11a88eb18dea117"],["12fd98a2db15f611716e.js","e89b1d65c6c604ad5ce9c3085d902ea6"],["14360d1a073a7357778f.js","25c4e55ae11ac41f73601f847b7ea1a1"],["148e7f0c71ff76978d6a.js","e7efda6f40e2bf9258580403d95e4ecb"],["1915d822183cf8fd43b3.js","cb84eea9d856df2e51e418396f217a95"],["1a742861f4b68fb91428.js","3d92d68a2cb731a556e1c787ed466b6c"],["21ae84cdde66e4d86c2f.js","f31c4effb9444e5f39331d45f77f3f18"],["22609f6d177aa894b945.js","fb43327cd9973b340fded05d8ebfc7a0"],["2696568da9b355884384.js","e6e3cbdb772ab38431aa8d53176eb917"],["29a1fb2a5e8bfc5f2010.js","427a89930ac9804fcdbd69b28b03a412"],["2b9def88fe9122ecb055.js","be38216a7485c43e594dfdb9fac0dcd6"],["2ba451f121270c19553a.js","92f2172a216eb2f6738e6874d9183549"],["2c1ab165f76e7cd07be0.js","83e902de161153d470cf2e7f00ad0dcb"],["2f8109c2a24f1a9a8d1b.js","a7a60fe9290b696d0b3ee1a62af88cf0"],["372c821ae312eeb2a0f4608795d4d860.css","372c821ae312eeb2a0f4608795d4d860"],["37933ccc539b726bf981.js","b7d92cd52bad17d1a0dd5c722b738737"],["39887f985ca604ea6899.js","7ae115250da02060ff6a30bd587d2a16"],["3be8d2e30af194d124d8.js","a30bdb6c19660c432f9eee47a9248b5b"],["41ec75dbfa70f824a343814a9f1d3901.css","41ec75dbfa70f824a343814a9f1d3901"],["423ef76a9da4a0525ffad4bb15f7922b.woff","423ef76a9da4a0525ffad4bb15f7922b"],["448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["4550f420724f467114a0.js","6b05fa7062ee75309751cda452eb9529"],["4b7f433c764c07ab1955.js","2970ff189918287b08bb511474fb7e66"],["4fa5c57c8234de726fda.js","787e7952edd23faaa43c8dc76d2bdc1d"],["501a004ae3237d4bd3c5.js","f3b30c78edd046a2fbe4368fff83a9a1"],["5305f6c22d4abbe686eb.js","af1a5e5fc183c57484bbc46de77becd0"],["537d2fbabd189e949da0.js","f511cae374bb7306769d2ce8e2d0ff94"],["54b1408d1ca70dd15045.js","a5af6ab86316553d1d2592efce1f6e6c"],["55c95fca5e178bf934c9.js","249038311f9afdcba9641182986bd3dc"],["573d65f419ec4edfc67a.js","7ef55656dd8d4519e522c0861421a98e"],["57e2260f71d48ea0074d.js","eb8d3a92447b0b4ea9ebf5eb510bd275"],["580fcdc2a77f94a5e56a.js","dc81e1d4476cfbf3b7ee7004ff88e4db"],["5fcd3f828007d6bc3665.js","1775ce1a623a061f756f07f6f4cc8041"],["63aa36c9fbb2c855e0d2.js","0ac9a001b658ae68fd91e4cf67179e60"],["68b96ffa40d53b6b7831.js","74611c2cc87f96a3cb3ed541e173de14"],["6903dae02ce2d951f93f.js","23cbb16433b0c69b2558f87be43ef02d"],["70806fdd0c508bd1c9e70b6c9d644e90.ttf","70806fdd0c508bd1c9e70b6c9d644e90"],["71935c99824bfd7bc44b.js","05522cbed7d6593ddd716efa1df8343e"],["7425af1240dc68c7732a.js","9daf45e7064cac6f84060554787b8785"],["7442292155e36de5602c.js","0a51a77cd10fc4204e840f6c0fd53e89"],["7a69440c2b12ed52d388.js","44a4fe03f24174ea76672519b1602c1b"],["7b5ebb5815ddbb77004a.js","7895a7bfd7603626e47f474797da276d"],["7b8cca8ba4ae891ea440.js","9226765d50d2d74cf27c8e37ee72e03c"],["818f84b9a10695be7cda.js","03af5309559211c6b744a76a7ec896c4"],["81de7cd3b9db2cb38aa8.js","54c8e20c05ca0405efb6207d7c967eeb"],["89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["8fbbf4196057945ebdee.js","4aba123e81bb09f9371156f18c5b0f1c"],["946118eec9a849ef5e6b.js","31c31626033b5e7a8c4e5985bcaaa2e1"],["9915ca18ce7b1b803252.js","bec42400bd279e5525a4571d5cf17f4d"],["9ab62d9da3800158947a.js","d7232f19bb20de9c243691eb94bd0545"],["9b9e9b1c40145ecaee47c60705ad3e3c.eot","9b9e9b1c40145ecaee47c60705ad3e3c"],["9e3ac9b84871ed61a55c816d5a27688c.svg","9e3ac9b84871ed61a55c816d5a27688c"],["CNAME","58e622340325843359475fb423e22b4c"],["a1d18d828a690c1cc6df.js","e62bf896bdf89676985efcee0bf6a543"],["a3a344e56c36b083d1da.js","d5cceda4372318a1179fe031572e294d"],["a76d501eedf5b5a09033.js","82386c0455a44b139a1de56be72d36fb"],["a8b8ec43bf3e69e04ece.js","3d17fc772c1e66b90574b8f809d31224"],["ace2a18104742e36e888.js","00c851ae65d635c4073d5ca8d6f63cf3"],["af0ed1cee3c7b9218075.js","d5f4c71f7aff83b324b8d56e348d54ac"],["b1f60a1fecf587072b69.js","c13458d56074bd13242958d4b432c0f0"],["b2523b8f4bc31a1728b6.js","fc25705d97becfabd62605068a3a34ce"],["b3705cda66f0630bc5d8.js","05d543cb87f181e054a46b77b75f2561"],["be2bf6db2f98de6dfa63.js","269c0c509989ad7f853310952b84521b"],["c031cc967b9b421d7ff6.js","f0a0d1c3c7d88ceaeb5e41f1be18f873"],["cf3747f52d20bf6dcffe.js","61e964b97e75cd93955442f5e9c2721e"],["d2d48a7e1d1131e3546f.js","1b68b2bf56a0145b33e37d1a3982d0f7"],["e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e2ed4c9fcc9a921f137f.js","e9f9218da2e3cf20560f36fbcc342fd2"],["e6ae66c9712fa451aa50.js","6d2c16f03fe0c1ce98ae61b04b2d38f5"],["e73eb85c7172a4ad3a15.js","1debbfc9fab61210bb64e27a778f7c1f"],["e7f1165ecec940136ec5.js","329fe01b2f5bf3658bc272a09a525da7"],["e9e541289e13b6afa82e.js","f48a43d76f806f4bb0113ff436407dfb"],["eaaba64680ea3d5be868.js","be4abb19197ff3dacbd484cd40fdaa2e"],["eb2f9f26813615230d4c.js","829d233452e3082dae9d1ae2550b226f"],["edcf0d708fe6a9a008a8.js","b0d66b2d9760f91b1155ed02f93e46f7"],["f00d2144a7f778ef647c.js","13b156ff5ddc58855f0ace3b023c1fee"],["f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["favicon.ico","247d66e4e5457cd042283cd6e94284bf"],["fe13e89edf62edeb1f82.js","c5e72e241f4be5ad1e90bd84dcb148fc"],["ff812b940a32d25832c4.js","085fe7e76c7f1becb4e571b8e233a57d"],["ffbadb3d59cf211d80e3.js","2e148b522eb970bab4944f3b80459773"]];
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







