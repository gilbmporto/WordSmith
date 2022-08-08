// Information to reach API
const url = 'https://api.datamuse.com/words';
var urlParams = '?ml='

//buttons to change the submit button functionality
const botaoML = document.getElementById('ml');
const botaoSL = document.getElementById('sl');
const botaoRELJJB = document.getElementById('rel_jjb');
const instrucoes = document.getElementById('friendlyMessage');


// Selects page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// Asynchronous function
const getSuggestions = () => {

  const wordQuery = inputField.value;
  const endpoint = `${url}${urlParams}${wordQuery}`;
  
  fetch(endpoint, {cache: 'no-cache'})
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
          console.log(networkError.message);
      })
       .then((jsonResponse) => {
          renderResponse(jsonResponse);
      })
}

// Clears previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestions();
};

submit.addEventListener('click', displaySuggestions);

// Formats response to look presentable on webpage
const renderResponse = (res) => {
  // Handles if res is falsey
  if(!res){
    console.log(res.status);
  }
  // In case res comes back as a blank array
  if(!res.length){
    responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
    return;
  }

  // Creates an empty array to contain the HTML strings
  let wordList = [];
  // Loops through the response and caps off at 10
  for(let i = 0; i < Math.min(res.length, 10); i++){
    // creating a list of words
    wordList.push(`<li>${res[i].word}</li>`);
  }
  // Joins the array of HTML strings into one string
  wordList = wordList.join("");

  // Manipulates responseField to render the modified response
  responseField.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;
  return
};

const renderJsonResponse = (res) => {
  // Creates an empty object to store the JSON in key-value pairs
  let rawJson = {};
  for(let key in res){
    rawJson[key] = res[key];
  }
  // Converts JSON into a string and adding line breaks to make it easier to read
  rawJson = JSON.stringify(rawJson).replace(/,/g, ", \n");
  // Manipulates responseField to show the returned JSON.
  responseField.innerHTML = `<pre>${rawJson}</pre>`;
}

botaoML.addEventListener('click', () => {
  console.log(urlParams);
  if (urlParams == '?ml=') {
      window.alert('Você já está usando essa funcionalidade!')
  } else {
      instrucoes.innerHTML = 'E aperte o botão acima para ver palavras com significado parecido'
      urlParams = '?ml='
  };

});

botaoSL.addEventListener('click', () => {
  console.log(urlParams);
  if (urlParams == '?sl=') {
      window.alert('Você já está usando essa funcionalidade!')
  } else {
      instrucoes.innerHTML = 'E aperte o botão acima para ver palavras que tem um som parecido'
      urlParams = '?sl='
  };

});

botaoRELJJB.addEventListener('click', () => {
  console.log(urlParams);
  if (urlParams == '?rel_jjb=') {
      window.alert('Você já está usando essa funcionalidade!')
  } else {
      instrucoes.innerHTML = 'E aperte o botão acima para ver palavras que adjetivam a sua palavra'
      urlParams = '?rel_jjb='
  };

});