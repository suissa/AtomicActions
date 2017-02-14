const {videos} = require('./../jsons/redtube.brazil.json')

const filterDurationByRange = require('./actions/filterDurationByRange')
const transformDuration = require('./map.duration')

const myVideos = ( videos ) => 
  videos.map( transformDuration ).filter( filterDurationByRange(30, 60) )


console.log('myVideos', myVideos( videos ))



// const {videos} = require('./../jsons/redtube.brazil.json')

// const filterDuration = require('./filter.duration.seconds')
// const transformDuration = require('./map.duration')

// const myVideos = ( videos, type, min, max ) => 
//   filterDuration( videos.map( transformDuration ), type, min, max )


// console.log('myVideos', myVideos( videos, 'range', 30, 60 ))