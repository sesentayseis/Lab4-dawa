// Importa los módulos necesarios
const http = require('http');
const fs = require('fs');
const url = require('url');
const calculadora = require('./calculadora');

// Crea el servidor HTTP
const server = http.createServer((req, res) => {
  // Obtiene la ruta de la URL
  const path = url.parse(req.url).pathname;

  // Ruta para la página principal
  if (path === '/') {
    // Lee el archivo HTML y lo envía como respuesta
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

  // Ruta para el formulario de la calculadora
  if (path === '/calcular') {
    // Procesa el formulario de la calculadora
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const num1 = parseFloat(formData.get('num1'));
      const num2 = parseFloat(formData.get('num2'));
      const operacion = formData.get('operacion');

      // Realiza la operación correspondiente
      let resultado;
      try {
        if (operacion === 'suma') {
          resultado = calculadora.sumar(num1, num2);
        } else if (operacion === 'resta') {
          resultado = calculadora.restar(num1, num2);
        } else if (operacion === 'multiplicacion') {
          resultado = calculadora.multiplicar(num1, num2);
        } else if (operacion === 'division') {
          resultado = calculadora.dividir(num1, num2);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Operación inválida');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Resultado: ${resultado}`);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(error.message);
      }
    });
  }
});

// Inicia el servidor en el puerto 3000
server.listen(8080, () => {
  console.log('Servidor escuchando en http://localhost:8080');
});
