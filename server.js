var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
mongoStore = require("connect-mongo")({session: expressSession}), //mongoStore

mongoose = require("mongoose");


//var port = process.env.PORT;
//var host = process.env.IP;
var port = "27017";
var host = "127.0.0.1";
var db = "profiles";

require("./models/comments_model.js");
require("./models/page_model.js");
require("./models/photo_model.js");
require("./models/user_model.js");

//mongoose.connect("mongodb://" + host + ":" + port + "/" + db);
var host1 = process.env.IP;
var port1 = process.env.PORT;

mongoose.connect("mongodb://" + host1 + "/" + port1 + "/" + db );
//mongoose.connect("mongodb://" + host + ":" + port + "/" + db);

//mongoose.connect("mongodb://" + host + ":" + port );

console.log("Connected to db");

app.engine('.html',require("ejs").__express);

app.set('views', __dirname + '/views');

app.set('view engine', 'html');

app.use(bodyParser());

app.use(cookieParser());

app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 60*60*1000},
    store: mongoStore({
        db: mongoose.connection.db,
        collection: 'session'
    })
}));



require("./routes")(app);
app.listen(port1);
console.log("running server");