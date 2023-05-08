class Contador{
    static cuentaGlobal=0;
    constructor(nombre){
        this.responsable = nombre,
        this.counter = 0
    }

    getResponsable(){
        return this.responsable
    }
    getCuentaIndividual(){
        return this.counter
    }
    getCuentaGlobal(){
        
    }
    sumarCuenta(){
        this.counter = this.counter + 1;
        Contador.cuentaGlobal = Contador.cuentaGlobal + 1
    }
}
const eze = new Contador("eze");
const mati = new Contador("mati");
const mari = new Contador("mari");
eze.sumarCuenta();
eze.sumarCuenta();
mari.sumarCuenta();
mati.sumarCuenta();
console.log(eze.counter)
console.log(mati.counter)
console.log(mari.counter)
console.log(Contador.cuentaGlobal)

