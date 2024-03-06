// db.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gianalvarez2109:21092000@clustergiandeveloperpri.jico7en.mongodb.net/bdsyshitss?retryWrites=true&w=majority&appName=ClusterGianDeveloperPrincipal', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose.connection;
