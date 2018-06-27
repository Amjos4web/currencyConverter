// register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('public/scripts/sw.js').then(function (registration) {
            console.log('Service worker successfully registered on scope', registration.scope);
        }).catch(function (error) {
            console.log('Service worker failed to register');
        });
    });
}




const currencyUrl = "https://free.currencyconverterapi.com/api/v5/currencies";

fetch(currencyUrl)
.then(function(res){
	return res.json();
})
.then(function(data){
	for (var key in data) {
	  return data[key];
	}
	//console.log(data);
})
.then(function(datakey){
	for (const key2 in datakey) {
		const id = datakey[key2].id;
		$('#convertfrom, #convertto').append($('<option>').text(id).attr('value', id));
	}
})
.catch(function(error){
	console.log(error);
})

const convertCurrency = () => 
{
	const convertfrom = document.getElementById("convertfrom").value;
	const convertto = document.getElementById("convertto").value;
	const query = convertfrom + '_' + convertto;
	const url = "https://free.currencyconverterapi.com/api/v5/convert?q="+ query + "&compact=ultra";

	fetch(url)
		.then(response => {
			return response.json();
		}).then(data => {
			const oneUnit = data[query];
			const amt = document.getElementById("fromAmount").value;
			document.getElementById("amountConverted").value = (oneUnit*amt).toFixed(2);
			
		})
}
