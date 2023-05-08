const fs = require ("fs"); // importamos modulo fylesystem
const operacionesAsincronas = async() =>{ // nota que la funcion debe ser asincrona porque trabajamos con promesas.
    // Escribimos un archivo
    await fs.promises.writeFile("promises.txt", "Hola desde promesa!") // (ruta y nombre de archivo, contenido)
    // utilizar el modulo de promises nos facilita la operacion para no requerir estar dentro de una callback

    let resultado = await fs.promises.readFile("promises.txt", "utf-8") // (ruta y nombre ed archivo, codificacion)
    console.log(resultado) // Vemos en consola: Hola desde promesa

    //Modificamos el archivo
    await fs.promises.appendFile("promises.txt", "Contenido adicional") // (ruta y nombre de archivo, contenido)

    // releemos el archivo
    resultado = await fs.promises.readFile("promises.txt", "utf-8")
    console.log(resultado) // Veremos: Hola desde promesa! Contenido adicional
   

    

    // finalmente, borramos el archivo
    // await fs.promises.unlink("promises.txt")




}

operacionesAsincronas()

// Tenemos un codigo mucho mas limpio, mas simple y facil de interpretar.