const fs = require("fs"); // utilizamos la libreria fs(File System) que ya se encuentra instalada en Node, la cual nos permite trabajar con archivos.

fs.writeFileSync("test.txt", "Vamos River! "); 

// Primer operacion: para escribir un archivo, el primer argumento/parametro es la ruta y 
// nombre del archivo sobre el que queremos trabajar. El segundo argumento es el contenido.

if(fs.existsSync('test.txt')){ // existsSync devuelve true si el archivo SI existe, y false si NO.
    let contenido = fs.readFileSync('test.txt','utf-8') 

    // readFileSync lee el contenido del archivo, es importante que en el segundo parametro coloquemos el tipo de 
    // codificacion que utilizaremos para leerlo. 

    console.log(contenido) // el resultado sera lo que escribiremos arriba de la linea 4.
    fs.appendFileSync('test.txt','El mejor del mundo')

    // appendFileSync buscara primero la ruta del archivo, si no encuentra ningun archivo, lo creara, en caso de si encontrarlo, en lugar de sobreescribirlo todo el archivo, solo colocara el contenido al final. 

    contenido = fs.readFileSync('test.txt', 'utf-8')
    // Volvemos a leer el contenido del archivo

    console.log(contenido);
    // Esta vez el contenido sera: "Vamos River! El mejor del mundo" gracias al appendFileSync.

    fs.unlinkSync('test.txt');
    // Por ultimo, esta linea de codigo eliminara el archivo, independientemente de todo el contenido que este tenga.

}
