/**
 * Vi vill kunna från frontend göra ett fetch-anrop till en api-endpoint för att
 * hämta Shakespeare insults.
 * 
 * URL: /api/insults
 * Method: GET
 * Description: Returnera insults från insults.json
 */


const http = require('http');
const fs = require('fs');
const server = http.createServer() //Skapar vår server

//server lyssnar på requests och kör en callback-funktion som tar två parametrar 
//request som innehåller detaljer från klientens förfrågan
//response är det svar som kommer skickas tillbaka från servern
server.on('request', (request, response) => {
  console.log('Request url:', request.url);
  console.log('Request metod:', request.method);

  //Skickar tillbaka ett svar till klienten. Då vår server
  //enbart agerar på url:er så kan vi egentligen skicka tillbaka vad vi vill
  if (request.url === '/') {
    const file = fs.createReadStream('frontend/index.html');
    file.pipe(response);
  } else if (request.url === '/api/insults') {
    const file = fs.createReadStream('insults.json');
    file.pipe(response);
  } else if (request.url === '/api/getInsult') {
    const result = {
        insult: "He thinks too much: such men are dangerous. ",
        play: "Julius Ceasar"
      }

    /**
     * Här behöver vi köra JSON.stringify då vi enbart kan skicka tillbaka bytes eller strängar
     * till en klient
     */
    response.end(JSON.stringify(result));
  } else {
    console.log('Sökväg:', 'frontend' + request.url);
    const file = fs.createReadStream('frontend' + request.url);

    //Om filen hittades och kan öppnas så triggas event open
    file.on('open', () => {
      file.pipe(response);
    });

    //Om filen inte hittades triggas event error istället
    file.on('error', () => {
      const file = fs.createReadStream('frontend/404.html');
      file.pipe(response);
    });
  }
});

server.listen(8000);