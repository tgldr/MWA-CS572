Database exported by gzip to /dump folder

Optional tasks

1. When using select() in mongoose prefixing a path with - will flag that path as excluded
2. I used find query for get last 6 months job list.

var d = new Date();
d.setMonth(d.getMonth() - 6);

Job.find({
postDate: {
$gte: d,
$lt: new Date(),
},
})
