let countriesCurrencies;
		const dbPromise = idb.open('countries-currencies', 1, upgradeDB => {
			switch (upgradeDB.oldVersion) {
				case 0:
				upgradeDB.createObjectStore('objs', {keyPath: 'id'});
			}
		});
		
		
		dbPromise.then(db => {
        if(!db) return;
			return db.transaction('objs')
			.objectStore('objs').getAll();
		}).then(allObjs => {
		
			const convertfrom = document.getElementById("convertfrom").value;
			const convertto = document.getElementById("convertto").value;
			const query = `${convertfrom}_${convertto}`;
			const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

			fetch(url)
				.then(response => {
					return response.json();
				}).then(data => {
					dbPromise.then(db => {
						if(!db) return;
						countriesCurrencies = [data.results];
						const tx = db.transaction('objs', 'readwrite');
						const store = tx.objectStore('objs');
						countriesCurrencies.forEach(currency => {
							for (let value in currency) {
								store.put(currency[value]);
							}
						});
						return tx.complete;
					});
					const oneUnit = data[query];
					const amt = document.getElementById("fromAmount").value;
					document.getElementById("amountConverted").value = (oneUnit*amt).toFixed(2);
					
				})
		});
