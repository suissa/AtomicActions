
const filterDurationBy = ( initial=0, end=0 ) => ( obj ) =>  obj.video.duration >= initial
                                                                                      && obj.video.duration <= end


module.exports = filterDurationBy