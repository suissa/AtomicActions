const data = { name: 'Suissero Veio', password: 'p3g4n4min4', age: 666 }

const fields = ['age']

const getFields = ( field ) => fields.includes( field )


const transform = ( _data, fields ) => {

  const getValues = ( field ) => _data[ field ]
  
  return Object.keys( _data ) // [ 'name', 'password' , 'age']
                  .filter( getFields ) // [ 'age' ]
                  .map( getValues )
  }


console.log('transform(data)', transform( data, fields ))