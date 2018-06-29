
	// //Registering the Service Worker
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('sw.js').then(registration => {
				console.log('Service worker successfully registered on scope', registration.scope);
			}).catch(error => {
				console.log('Service worker failed to register');
			});
		});
	}


	const currencyUrl = "https://free.currencyconverterapi.com/api/v5/currencies";
	// let countriesCurrencies;
    // const dbPromise = idb.open('countries-currencies', 1, upgradeDB => {
        // switch (upgradeDB.oldVersion) {
            // case 0:
            // upgradeDB.createObjectStore('objs', {keyPath: 'id'});
        // }
    // });

	fetch(currencyUrl)
	.then(res => res.json())
	.then(data => {
		// dbPromise.then(db => {
			// if(!db) return;
			// countriesCurrencies = [data.results];
			// const tx = db.transaction('objs', 'readwrite');
            // const store = tx.objectStore('objs');
            // countriesCurrencies.forEach(currency => {
                // for (let value in currency) {
                    // store.put(currency[value]);
                // }
            // });
            // return tx.complete;
		// });
		for (const key in data) {
		  return data[key];
		}
		//console.log(data);
	})
	
	.then(datakey => {
		for (const key2 in datakey) {
			const id = datakey[key2].id;
			const curName = datakey[key2].currencyName;
			console.log(id, curName);
			$('#convertfrom, #convertto').append($('<option>').text(`${curName}  ${id}`).attr('value', id));
		}
	})
	.catch(error => {
		console.log(error);
	})
	
	// dbPromise.then(db => {
        // if(!db) return;
        // return db.transaction('objs')
        // .objectStore('objs').getAll();
    // }).then(allObjs => {

	const convertCurrency = () => 
	{
		const convertfrom = document.getElementById("convertfrom").value;
		const convertto = document.getElementById("convertto").value;
		const query = `${convertfrom}_${convertto}`;
		const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

		fetch(url)
			.then(response => {
				return response.json();
			}).then(data => {
				const oneUnit = data[query];
				const amt = document.getElementById("fromAmount").value;
				document.getElementById("amountConverted").value = (oneUnit*amt).toFixed(2);
				
			})
	}
