// const data = { name: 'Suissero Veio', password: 'p3g4n4min4', id: 666 }

module.exports = (data, fieldsNotAlloweds, cleanValue) => {

  const notAlloweds = notAllowed => fieldsNotAlloweds.includes( notAllowed ) 
  
  const toNewObject = ( obj, notAllowed ) => 
    Object.assign( obj, { [notAllowed]: cleanValue } )

  // const filterArray = ( arr, fields ) => arr.map( obj => filterObject( obj, fields ) )

  const filterObject = ( obj, fields ) => Object
                                                              .keys( obj )
                                                              .filter( notAlloweds )
                                                              .reduce( toNewObject , obj)

  const map = (functor, data) => data.map ? data.map(functor) : functor(data)

  const removeThis = ( fields ) => 
    ( obj ) => map(filterObject, obj)
    // Array.isArray( obj ) 
    //                   ? filterArray( obj, fields ) 
    //                   : filterObject( obj, fields ) 

  return removeThis( fieldsNotAlloweds )( data )

// console.log( 'base', { name: 'Suissero Veio', password: 'p3g4n4min4', id: 666 } )
// console.log( 'bazinga', bazinga )
}