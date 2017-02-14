
const filterDurationBy = ( initial=0 ) => ( obj ) =>  obj.video.duration >= initial


module.exports = filterDurationBy