const http = require('http');
const fs = require('fs');
const server = http.createServer() //Skapar vår server

//server lyssnar på requests och kör en callback-funktion som tar två parametrar 
//request som innehåller detaljer från klientens förfrågan
//response är det svar som kommer skickas tillbaka från servern
server.on('request', (request, response) => {
  console.log('Request url:', request.url);
  console.log('Request metod:', request.method);

  //Skickar tillbaka ett svar till klienten
  if (request.url === '/') {
    const file = fs.createReadStream('frontend/index.html');
    file.pipe(response);
  } else {
    console.log('Sökväg:', 'frontend' + request.url);
    const file = fs.createReadStream('frontend' + request.url);

    //Om filen hittades och kan öppnas så triggas event open
    file.on('open', () => {
      file.pipe(response);
    })

    //Om filen inte hittades triggas event error istället
    file.on('error', () => {
      const file = fs.createReadStream('frontend/404.html');
      file.pipe(response);
    });
  }
});

server.listen(8000);