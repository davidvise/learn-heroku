var formEl = document.getElementById('form');
alert("I am an alert box1!");
formEl.addEventListener('submit', function(event) {
  alert("I am an alert box2!");
  // 1. Setup the request
  // ================================
  // 1.1 Headers
  var headers = new Headers();
  // Tell the server we want JSON back
  headers.set('Accept', 'application/json');

  // 1.2 Form Data
  // We need to properly format the submitted fields.
  // Here we will use the same format the browser submits POST forms.
  // You could use a different format, depending on your server, such
  // as JSON or XML.
  var formData = new FormData();
  for (var i = 0; i < formEl.length; ++i) {
    formData.append(formEl[i].name, formEl[i].value);
  }
  
  // This is for the purpose of this demo using jsFiddle AJAX Request endpoint
  formData.append('json', JSON.stringify({example: 'return value'}));

  alert("I am an alert box3!");
  
  // 2. Make the request
  // ================================
  var url = 'http://unitifm.au-s1.cloudhub.io/workorder/retrieve/CHUBB-FMC?wonum=2361105';
  var fetchOptions = {
    method: 'GET',
    headers,
    body: formData
  };
  
  var responsePromise = fetch(url, fetchOptions);
  
  fetch('http://unitifm.au-s1.cloudhub.io/workorder/retrieve/CHUBB-FMC?wonum=2361105')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
  
  // 3. Use the response
  // ================================
  responsePromise
  	// 3.1 Convert the response into JSON-JS object.
    .then(function(response) {
      return response.json();
    })
    // 3.2 Do something with the JSON data
    .then(function(jsonData) {
    	console.log(jsonData);
      document.getElementById('results').innerText =
      	JSON.stringify(jsonData);
    });
  

  event.preventDefault();
});
