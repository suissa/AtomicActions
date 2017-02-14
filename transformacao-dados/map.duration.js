const {videos} = require('./../jsons/redtube.brazil.json')


const transformToSeconds = ( obj ) => {
  const time = obj.video.duration.split(':')
  let seconds = 0

  if ( time.length === 3 ) 
    seconds += parseInt( time[0] * 3600 )
    
  seconds += parseInt( time[0] * 60 )
  seconds += parseInt( time[1] )

  obj.video.duration = seconds
  return obj
}


const transformDuration = ( obj ) => obj.map( transformToSeconds )

// console.log('\n\n\n transformDuration', transformDuration(videos) )

module.exports = transformToSeconds


// const {videos} = require('./../jsons/redtube.brazil.json')


// const transformToSeconds = ( obj ) => {
//   const time = obj.video.duration.split(':')
//   let seconds = 0

//   if ( time.length === 3 ) {
//       seconds += parseInt( time[0] * 3600 )
//       seconds += parseInt( time[1] * 60 )
//       seconds += parseInt( time[2] )
//     }
//   if ( time.length === 2 ) {
//       seconds += parseInt( time[0] * 60 )
//       seconds += parseInt( time[1] )
//     }
//     obj.video.duration = seconds
//     return obj
// }


// const transformDuration = ( obj ) => obj.map( transformToSeconds )

// console.log('\n\n\n transformDuration', transformDuration(videos) )
