
class Carga {
    constructor(tipo, peso, valorPorKg) {
        this.tipo = tipo;
        this.peso = peso;
        this.valorPorKg = valorPorKg;
    }

    calcularImpuesto() {
       
        return 0;
    }
}


class CargaTipo1 extends Carga {
    calcularImpuesto() {
        return this.peso <= 5 ? this.peso * 0.05 : 0;
    }
}


class CargaTipo2 extends Carga {
    calcularImpuesto() {
        return (this.peso > 5 && this.peso <= 10) ? this.peso * 0.07 : 0;
    }
}


class CargaTipo3 extends Carga {
    calcularImpuesto() {
        return (this.peso > 10 && this.peso <= 15) ? this.peso * 0.12 : 0;
    }
}


class CargaTipo4 extends Carga {
    calcularImpuesto() {
        return this.peso > 15 ? this.peso * 0.20 : 0;
    }
}


class Camion {
    constructor(marca, consumoGasolina) {
        this.marca = marca;
        this.consumoGasolina = consumoGasolina;
    }
}


class Conductor {
    constructor(nombre, genero, antiguedad) {
        this.nombre = nombre;
        this.genero = genero;
        this.antiguedad = antiguedad;
    }

    calcularComision(distancia) {
        
        let comision = 0;
        if (distancia > 1000) {
            comision = this.antiguedad > 5 ? (distancia / 1000) * 0.07 : (distancia / 1000) * 0.05;
        }
        return comision;
    }
}


class Viaje {
    constructor(ciudadOrigen, ciudadDestino, distancia, carga, camion, conductor) {
        this.ciudadOrigen = ciudadOrigen;
        this.ciudadDestino = ciudadDestino;
        this.distancia = distancia;
        this.carga = carga;
        this.camion = camion;
        this.conductor = conductor;
    }

    calcularValorTotal() {
        // Lógica para calcular el valor total del viaje
        let valorCarga = (this.carga.peso * this.carga.valorPorKg * this.distancia) / 100;
        let impuestoCarga = this.carga.calcularImpuesto();
        let valorTotal = valorCarga + impuestoCarga;
        return valorTotal;
    }
}


class Empresa {
    constructor() {
        this.viajesRealizados = [];
        this.comisionesDadas = 0;
    }

    agregarViaje(viaje) {
        this.viajesRealizados.push(viaje);
    }

    calcularDineroTotalRecaudado() {
        
        let totalRecaudado = this.viajesRealizados.reduce((acumulador, viaje) => acumulador + viaje.calcularValorTotal(), 0);
        return totalRecaudado;
    }

    tipoCargaMasImpuestos() {
        
        
        let impuestosPorTipo = {};

        this.viajesRealizados.forEach(viaje => {
            let tipoCarga = viaje.carga.tipo;
            let impuesto = viaje.carga.calcularImpuesto();

            if (!impuestosPorTipo[tipoCarga]) {
                impuestosPorTipo[tipoCarga] = impuesto;
            } else {
                impuestosPorTipo[tipoCarga] += impuesto;
            }
        });

        let tipoMasImpuestos = Object.keys(impuestosPorTipo).reduce((a, b) => impuestosPorTipo[a] > impuestosPorTipo[b] ? a : b);
        return tipoMasImpuestos;
    }

    promedioGananciaPorTipoCarga(tipoCarga) {
       
        let totalGananciaTipoCarga = this.viajesRealizados.filter(viaje => viaje.carga.tipo === tipoCarga)
            .reduce((acumulador, viaje) => acumulador + viaje.calcularValorTotal(), 0);

        let cantidadViajesTipoCarga = this.viajesRealizados.filter(viaje => viaje.carga.tipo === tipoCarga).length;

        return totalGananciaTipoCarga / cantidadViajesTipoCarga;
    }

    marcaCamionMenosGasolina() {
        
        let consumoPorMarca = {};

        this.viajesRealizados.forEach(viaje => {
            let marca = viaje.camion.marca;
            let consumoGasolina = viaje.camion.consumoGasolina;

            if (!consumoPorMarca[marca]) {
                consumoPorMarca[marca] = consumoGasolina;
            } else {
                consumoPorMarca[marca] = Math.min(consumoPorMarca[marca], consumoGasolina);
            }
        });

        let marcaMenosGasolina = Object.keys(consumoPorMarca).reduce((a, b) => consumoPorMarca[a] < consumoPorMarca[b] ? a : b);
        return marcaMenosGasolina;
    }

    calcularDineroTotalComisiones() {
        
        let totalComisiones = this.viajesRealizados.reduce((acumulador, viaje) => acumulador + viaje.conductor.calcularComision(viaje.distancia), 0);
        this.comisionesDadas = totalComisiones;
        return totalComisiones;
    }

    gananciasConductor(nombreConductor) {
        
        
        let gananciasTransportes = this.viajesRealizados.filter(viaje => viaje.conductor.nombre === nombreConductor)
            .reduce((acumulador, viaje) => acumulador + viaje.calcularValorTotal(), 0);

        let gananciasComisiones = this.viajesRealizados.filter(viaje => viaje.conductor.nombre === nombreConductor)
            .reduce((acumulador, viaje) => acumulador + viaje.conductor.calcularComision(viaje.distancia), 0);

        return {
            gananciasTransportes,
            gananciasComisiones
        };
    }
}

let carga1 = new CargaTipo1("Tipo 1", 3, 100);
let carga2 = new CargaTipo2("Tipo 2", 8, 150);


let camion1 = new Camion("mazda", 10);
let camion2 = new Camion("chevrolet", 12);


let conductor1 = new Conductor("Juan", "Masculino", 7);
let conductor2 = new Conductor("sofia", "Femenino", 3);


let viaje1 = new Viaje("CiudadA", "CiudadB", 500, carga1, camion1, conductor1);
let viaje2 = new Viaje("CiudadC", "CiudadD", 800, carga2, camion2, conductor2);


let empresa = new Empresa();
empresa.agregarViaje(viaje1);
empresa.agregarViaje(viaje2);

// Responder a las exigencias
console.log("Dinero total recaudado por concepto de viajes realizados:", empresa.calcularDineroTotalRecaudado());
console.log("Tipo de carga que genera más impuestos:", empresa.tipoCargaMasImpuestos());
console.log("Promedio de ganancia de dinero por los viajes de carga tipo 2:", empresa.promedioGananciaPorTipoCarga("Tipo 2"));
console.log("Marca de camión que menos gasolina consume:", empresa.marcaCamionMenosGasolina());
console.log("Cuanto dinero se han dado en comisiones:", empresa.calcularDineroTotalComisiones());
console.log("Ganancias del conductor Juan:", empresa.gananciasConductor("Juan"));
