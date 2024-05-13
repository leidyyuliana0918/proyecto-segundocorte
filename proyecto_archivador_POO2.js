class Conductor {
constructor(nombre, antiguedad, genero) {

this.nombre = nombre;
this._antiguedad = antiguedad;
this.genero = genero;
this.comisionPorcentaje = antiguedad > 5 ? 0.07 : 0.05;
this.comisiones = 0;
}

get antiguedad() {
return this._antiguedad;
}

calcularComision(totalRecaudado) {
this.comisiones = totalRecaudado * this.comisionPorcentaje;
}
}

class Viaje {
constructor(tipoCarga, marcaCamion, ciudadOrigen, ciudadDestino, toneladas, distancia, consumoGasolina) {

this.tipoCarga = tipoCarga;
this.marcaCamion = marcaCamion;
this.ciudadOrigen = ciudadOrigen;
this.ciudadDestino = ciudadDestino;
this.toneladas = toneladas;
this.distancia = distancia;
this.consumoGasolina = consumoGasolina;
this.conductor = null;
}

asignarConductor(conductor) {
this.conductor = conductor;
}

calcularImpuesto() {

if (this.toneladas <= 5) {
return this.distancia * 0.05;
} else if (this.toneladas <= 10) {
 return this.distancia * 0.07;
} else if (this.toneladas <= 15) {
return this.distancia * 0.12;
} else {
return this.distancia * 0.20;
}
}

calcularCostoCarga() {

let costoPorKm;
switch (this.tipoCarga) {
case 'alimentos':
costoPorKm = 5000;
break;
case 'hierros':
costoPorKm = 8000;
break;
case 'cemento':
costoPorKm = 6000;
break;
case 'electrodomesticos':
costoPorKm = 5500;
break;
default:
costoPorKm = 4000;
}
return this.distancia * (costoPorKm / 100);
}

calcularConsumoGasolina() {

return this.distancia * this.consumoGasolina;
}
}

class Transportadora {
constructor() {

this.viajesRealizados = [];
this.conductores = [];
}

agregarConductor(conductor) {

this.conductores.push(conductor);
}

realizarViaje(viaje) {

this.viajesRealizados.push(viaje);
this.calcularTotalRecaudado();
if (viaje.conductor) {
viaje.conductor.calcularComision(this.calcularTotalRecaudado());
}
}

calcularTotalRecaudado() {
let total = 0;
for (let i = 0; i < this.viajesRealizados.length; i++) {
let viaje = this.viajesRealizados[i];
total += viaje.calcularImpuesto() + viaje.calcularCostoCarga();
}
return total;
}


tipoCargaMasImpuestos() {
let impuestosPorTipoCarga = {
'Carga tipo 1': 0,
'Carga tipo 2': 0,
'Carga tipo 3': 0,
'Carga tipo 4': 0
};


for (let i = 0; i < this.viajesRealizados.length; i++) {
let viaje = this.viajesRealizados[i];
let tipoCarga;
if (viaje.toneladas <= 5) {
tipoCarga = 'Carga tipo 1';
} else if (viaje.toneladas <= 10) {
tipoCarga = 'Carga tipo 2';
} else if (viaje.toneladas <= 15) {
tipoCarga = 'Carga tipo 3';
} else {
tipoCarga = 'Carga tipo 4';
}
impuestosPorTipoCarga[tipoCarga] += viaje.calcularImpuesto();
}

let tipoCargaMaxImpuestos = 'Carga tipo 1';
let maxImpuestos = impuestosPorTipoCarga['Carga tipo 1'];

for (let tipoCarga in impuestosPorTipoCarga) {
if (impuestosPorTipoCarga[tipoCarga] > maxImpuestos) {
maxImpuestos = impuestosPorTipoCarga[tipoCarga];
tipoCargaMaxImpuestos = tipoCarga;
}
}

return tipoCargaMaxImpuestos;
}

calcularPromedioGananciaPorTipoCarga(tipoCarga) {

let totalGanancias = 0;
let totalViajes = 0;
for (let i = 0; i < this.viajesRealizados.length; i++) {
let viaje = this.viajesRealizados[i];
if (viaje.tipoCarga === tipoCarga) {
totalGanancias += viaje.calcularImpuesto() + viaje.calcularCostoCarga();
totalViajes++;
}
}
if (totalViajes === 0) {
return 0;
}
return totalGanancias / totalViajes;
}

marcaCamionMenosConsumoGasolina() {

let consumoMinimo = Infinity;
let marcaCamionMinConsumo = '';
for (let i = 0; i < this.viajesRealizados.length; i++) {
let viaje = this.viajesRealizados[i];
let consumoGasolina = viaje.calcularConsumoGasolina();
if (consumoGasolina < consumoMinimo) {
consumoMinimo = consumoGasolina;
marcaCamionMinConsumo = viaje.marcaCamion;
}
}
return marcaCamionMinConsumo.toLowerCase();
}

calcularTotalComisiones() {

let totalComisiones = 0;
for (let i = 0; i < this.conductores.length; i++) {
totalComisiones += this.conductores[i].comisiones;
}
return totalComisiones;
}

calcularGananciasConductor(nombreConductor) {

let gananciasConductor = 0;
for (let i = 0; i < this.viajesRealizados.length; i++) {
let viaje = this.viajesRealizados[i];
if (viaje.conductor && viaje.conductor.nombre === nombreConductor) {
gananciasConductor += viaje.calcularImpuesto() + viaje.calcularCostoCarga();
}
}
return gananciasConductor;
}

calcularComisionesConductor(nombreConductor) {

let comisionesConductor = 0;
for (let i = 0; i < this.conductores.length; i++) {
if (this.conductores[i].nombre === nombreConductor) {
comisionesConductor += this.conductores[i].comisiones;
}
}
return comisionesConductor;
}
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const transportadora = new Transportadora();

function solicitarDatosConductor() {

rl.question('Ingrese nombre del conductor: ', (nombre) => {
rl.question('Ingrese género del conductor (M/F): ', (genero) => {
rl.question('Ingrese antigüedad en la empresa: ', (antiguedad) => {
validarNumeroEnteroPositivo(antiguedad, 'Antigüedad del conductor', (antiguedadValidada) => {
const conductor = new Conductor(nombre, antiguedadValidada, genero.toUpperCase());
transportadora.agregarConductor(conductor);
solicitarDatosViaje();

});
});
});
});
}

function solicitarDatosViaje() {

rl.question('Tipo de carga (alimentos, hierros, cemento, electrodomésticos, otros): ', (tipoCarga) => {
if (!['alimentos', 'hierros', 'cemento', 'electrodomesticos', 'otros'].includes(tipoCarga.toLowerCase())) {
console.log("Tipo de carga no válido.");
solicitarDatosViaje(); 
return;
}

rl.question('Marca del camión: ', (marcaCamion) => {
rl.question('Ciudad de origen: ', (ciudadOrigen) => {
rl.question('Ciudad de destino: ', (ciudadDestino) => {
rl.question('Toneladas de carga: ', (toneladas) => {

validarNumeroEnteroPositivo(toneladas, 'Toneladas de carga', (toneladasValidadas) => {
rl.question('Distancia en km del viaje: ', (distancia) => {
validarNumeroEnteroPositivo(distancia, 'Distancia del viaje', (distanciaValidada) => {

rl.question('Consumo de gasolina por km del camión: ', (consumoGasolina) => {
validarNumeroEnteroPositivo(consumoGasolina, 'Consumo de gasolina por km', (consumoGasolinaValidado) => {

const viaje = new Viaje(tipoCarga.toLowerCase(), marcaCamion, ciudadOrigen, ciudadDestino, parseFloat(toneladasValidadas), parseFloat(distanciaValidada), parseFloat(consumoGasolinaValidado));
rl.question('¿Desea registrar otro viaje? (Si/No): ', (respuesta) => {
if (respuesta.toLowerCase() === 'si') {
viaje.asignarConductor(transportadora.conductores[transportadora.conductores.length - 1]);
transportadora.realizarViaje(viaje);

solicitarDatosViaje();
} else {
viaje.asignarConductor(transportadora.conductores[transportadora.conductores.length - 1]);
transportadora.realizarViaje(viaje);
mostrarNecesidades();
}
});
});
});
});
});
});
});
});
});
});
});
}

function mostrarNecesidades() {

console.log("\nNecesidades de la empresa:");
console.log("1. Dinero total recaudado por concepto de viajes realizados:", transportadora.calcularTotalRecaudado());
console.log("2. Tipo de carga que genera más impuestos:", transportadora.tipoCargaMasImpuestos());
console.log("3. Promedio de ganancia de dinero por los viajes hechos por cada tipo de carga:");

const tiposCarga = ['alimentos', 'hierros', 'cemento', 'electrodomesticos', 'otros'];
tiposCarga.forEach(tipo => {

console.log("   -", tipo + ":", transportadora.calcularPromedioGananciaPorTipoCarga(tipo));
});
console.log("4. Marca de camión que menos gasolina consume:", transportadora.marcaCamionMenosConsumoGasolina());
console.log("5. Dinero dado en comisiones:", transportadora.calcularTotalComisiones());
rl.question("Ingrese el nombre de un conductor para conocer sus ganancias: ", (nombreConductor) => {
console.log("6. Ganancias del conductor por transportes realizados:", transportadora.calcularGananciasConductor(nombreConductor));
console.log("   Comisiones del conductor:", transportadora.calcularComisionesConductor(nombreConductor));
rl.close();
});
}

function validarNumeroEnteroPositivo(valor, nombre, callback) {
    
if (!/^[0-9]+$/.test(valor) || parseInt(valor) <= 0) {
console.log(`${nombre} debe ser un número entero positivo.`);
rl.question(`Ingrese nuevamente ${nombre}: `, (nuevoValor) => {
validarNumeroEnteroPositivo(nuevoValor, nombre, callback);
});
} else {
callback(parseInt(valor));
}
}

console.log("CONDUCTOR:");
solicitarDatosConductor();
