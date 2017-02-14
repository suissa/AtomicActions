const {videos} = require('./../jsons/redtube.brazil.json')


const filterByDuration = ( videos, type, initial=0, end=0) => {

  const byMaxDuration = require('./actions/filterDurationByMax')(initial)
  const byMinDuration = require('./actions/filterDurationByMin')(initial)
  const byRangeDuration = require('./actions/filterDurationByRange')(initial, end)


  const filterByMaxDuration = ( videos, max ) => videos.filter( byMaxDuration )
  const filterByMinDuration = ( videos, min ) => videos.filter( byMinDuration )
  const filterByRangeDuration = ( videos, min, max ) => videos.filter( byRangeDuration )

  switch ( type ) {
    case 'range':
      return filterByRangeDuration( videos, initial, end )
      break;
    case 'max':
      return filterByMaxDuration( videos, initial )
      break;
    case 'min':
      return filterByMinDuration( videos, initial ) 
      break;
    default:
      return console.log('Essa opção não existe!')
      break;
  }
}

// console.log('\n\n\n filterByDuration', filterByDuration(videos, 'min', 40) )
// console.log('\n\n\n filterByDuration', filterByDuration(videos, 'max', 2) )
console.log('\n\n\n filterByDuration', filterByDuration(videos, 'range', 40, 50) )

module.exports = filterByDuration