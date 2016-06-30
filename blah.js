var moment = require('moment');
var start = moment();;

function blah() {
  //console.log(moment.duration(now.diff(start)).humanize());
  console.log(start.fromNow());
}

setTimeout(blah, 1500);
