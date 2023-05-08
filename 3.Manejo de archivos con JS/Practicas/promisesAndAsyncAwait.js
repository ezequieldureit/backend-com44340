// Promises y Async Await---ejemplos
// constante datos con un array con datos adentro
// const datos = [{
//   id : 1,
//   title: 'Spiderman',
//   year:2008
// },{
//   id: 2,
//   title: 'Ironman',
//   year: 2010
// },{
//   id: 3,
//   title:'Captain America',
//   year:2015
             
//             }];

// contante datos con un array vacio para verificar que funcione el reject
const datos = []
//const getDatos = () => {
  //return datos;
//}

const getDatos = () => {
  return new Promise((resolve,reject) =>{
    if(datos.length === 0){
      reject(new Error('No existen datos'))
    }
    setTimeout(() =>{
    resolve(datos);
  }, 1500)
})
}
 
  

// asincronia con promesas

//getDatos().then((datos) => console.log(datos))

// asincronia con async await


async function fetchingData () {
  try{
    const datosFetched = await getDatos()
    console.log(datosFetched)
  }
  catch(err){
    console.log(err.message)
  }
  
}

fetchingData()