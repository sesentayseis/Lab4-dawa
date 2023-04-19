// Función para sumar dos números
function sumar(num1, num2) {
  return num1 + num2;
}

// Función para restar dos números
function restar(num1, num2) {
  return num1 - num2;
}

// Función para multiplicar dos números
function multiplicar(num1, num2) {
  return num1 * num2;
}

// Función para dividir dos números
function dividir(num1, num2) {
  if (num2 === 0) {
    throw new Error('No se puede dividir por cero');
  }
  return num1 / num2;
}

// Exporta las funciones para ser utilizadas en otros módulos
module.exports = {
  sumar,
  restar,
  multiplicar,
  dividir
};
