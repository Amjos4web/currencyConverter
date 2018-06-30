
	const cacheName = 'cache-v2';

	const filesToCache = [
		'./index.html',
		'js/main.js',
		'js/idb.js',
		'js/jquery.min.js',
		'css/main.css',
		'css/bootstrap.min.css',
		'img/favicon.ico'
	];
	
	// cache assets
	self.addEventListener('install', event => {
	  event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            //console.info('Caching of files Initiation');
            return cache.addAll(filesToCache);
        })
      );
	});
	
	//delete unused cache
	self.addEventListener('activate', event => {
	  event.waitUntil(
		  caches.keys()
			.then(keyList => Promise.all(keyList.map(thisCacheName => {
            if (thisCacheName !== cacheName){
                //console.log("Service worker removing cached files from", thisCacheName);
                return caches.delete(thisCacheName);        
            }
        })))
		);
	  return self.clients.claim();
	});

	//fetch cache 
	self.addEventListener('fetch', event => {
	  event.respondWith(caches.match(event.request)
		.then(response => response || fetch(event.request)
      .then(response => caches.open(cacheName)
      .then(cache => {
        cache.put(event.request, response.clone());
        return response;
      })).catch(event => {
      //console.log('Service Worker error caching and fetching');
    }))
	 );
	});

