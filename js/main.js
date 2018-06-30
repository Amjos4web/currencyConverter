
	// //Registering the Service Worker
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('sw.js').then(registration => {
				//console.log('Service worker successfully registered on scope', registration.scope);
			}).catch(error => {
				//console.log('Service worker failed to register');
			});
		});
	}
	
	const dbPromise = idb.open('currency-rates', 1, upgradeDB => {
		switch (upgradeDB.oldVersion) {
			case 0:
			upgradeDB.createObjectStore('objs', {keyPath: 'id'});
		}
	});

	const currencyUrl = "https://free.currencyconverterapi.com/api/v5/currencies";
	

	fetch(currencyUrl)
	.then(res => res.json())
	.then(data => {
		
		for (const key in data) {
		  return data[key];
		}
		//console.log(data);
	})
	.then(datakey => {
		for (const key2 in datakey) {
			const id = datakey[key2].id;
			const curName = datakey[key2].currencyName;
			//console.log(id, curName);
			$('#convertfrom, #convertto').append($('<option>').text(`${curName}  ${id}`).attr('value', id));
		}
	})
	.catch(error => {
		//console.log(error);
	})
	
	

	const convertCurrency = (isRateFound) => 
	{ 
		
		const convertfrom = document.getElementById("convertfrom").value;
		const convertto = document.getElementById("convertto").value;
		const query = `${convertfrom}_${convertto}`;
		const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

		fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				dbPromise.then(db => {
					if(!db) return;
					const tx = db.transaction('objs', 'readwrite');
					const store = tx.objectStore('objs');
					
					//console.log(data);
					//console.log(query);
					store.put({id: query, rates: data});
					return tx.complete;
				})
				
				
				const oneUnit = data[query];
				const amt = document.getElementById("fromAmount").value;
				document.getElementById("amountConverted").value =  (oneUnit*amt).toFixed(2);
				
			})
			.catch(() => {
				if (!isRateFound) {
					alert('Cannot convert this while offline');
				}
						
			});
			
			// if (amt.value === '') {
				// alert('Please enter amount to convert');
			// }
		
	}
	
