const fs = require ("fs");

fs.writeFile("ejemploCallback.txt", "Hola desde Callback",(error)=>{
    // La operacion es similar, el detalle es que ahora estamos metiendo un callback para preguntar si algo salio mal durante la operacion de escritura del archivo.

    if(error) return console.log("Error al escribir el archivo") // Pregunto si el "error" del callback existe.
    fs.readFile("ejemploCallback.txt", "utf-8",(error,resultado)=>{
        // Los mismos argumentos del readFileSync, solo que esta vez al final colocamos un callback, donde el primer argumento/parametro sirve para saber si hubo algun error al leer el archivo, el segundo argumento es el resultado de esa lectura.

        if(error) return console.log("Error al leer el archivo")
        console.log(resultado)
        fs.appendFile("ejemploCallback.txt", "Mas contenido",(error)=>{
            
            if(error) return console.log("Error al actualizar el archivo") // Preguntamos si hubo un error en el append.
            fs.readFile("ejemploCallback.txt", "utf-8",(error,resultado)=>{
                // Volvemos a leer el archivo, para corroborar el nuevo cambio.

                if(error) return console.log("Error al leer el archivo")
                console.log(resultado) // Si todo salio ok, debe mostrar "Hola desde Callback Mas contenido"
                fs.unlink("ejemploCallback.txt",(error)=>{
                    if(error) return console.log("No se pudo eliminar el archivo")
                })
            })
        })
    })
} )