var express = require('express'),
    router = express.Router(),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./public/Users'),
    PlayGround = require('./public/PlayGrounds'),
    secretKey = require('./secretKey.json');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));   // to support URL-encoded bodie

mongoose.connect(secretKey.key,{useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mLabs Connected! ");
});


var UserKitty = User;
var PlayG = PlayGround;
/*setTimeout(function() {
    var currentPG = new PlayG( {
    name : "Decathlone",
    area : "Marathhalli"
    });
currentPG.save( function(err) {
    console.log("inside save");
    if(err) {
        console.log("error is became");
    } else {
        console.log("Magic");
    }
});

},3000); */
var ids = new Array();
PlayG.find({},function(err, playgrounds) {
    playgrounds.forEach(function(playground) {
        console.log(ids.push(playground._id));
        console.log((playground._id));
    });
    for(var i=0;i<ids.length;i++) {
        console.log(ids[i]);
        PlayG.findOne({_id: ids[i]},function(err, data) {
            console.log(data);
        });
    }
});



router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
res.render('loginPage');
//res.sendFile(path + "index.html");
});

router.get("/user", function(req, res) {
    res.render('user_homepage');
});

router.get("/playgrounds", function(req, res) {
    res.render("Playgrounds");
});

<<<<<<< HEAD
router.get("/book", function(req, res) {
    res.render("booking");
});

router.get("/playgrounds:id",function(req,res){
=======
router.get("/playground-create", function(req,res) {
    res.render("playground-create");
});
router.get("/:id",function(req,res){
>>>>>>> 0d83bf2b00d1c0176965041ae7242d0686f6c3d3
    var ground;
    query = req.params.id;
    var q;
    for(var i=0;i<ids.length;i++) {
        console.log(ids[i] + "  " +query);
        if(i==query-1) {
            q = ids[i];
            console.log();
        }
    }
    PlayG.find({_id: q},function(err,data) {
        console.log(data + data.name);
        ground = data;
        res.render("Playgrounds", { ground });
=======
        res.render("playgrounds",{ ground });
>>>>>>> 0d83bf2b00d1c0176965041ae7242d0686f6c3d3
    });
    
    //res.sendFile(path + "index.html");
});

router.post("/register", function(req, res) {
    var currentUser = new UserKitty( {
        name:   req.body.username,
        password:   req.body.password,
        username:   req.body.email
    })
    createUser(currentUser, function(err) {
        if(err) {
            res.send("the following error Occured: " + err);
        }
        else {
            res.redirect("/user");
        }
    }); 
});

router.post('/login',function(req, res) {
    var currentUser = new UserKitty( {
        username:   req.body.username,
        password:   req.body.password
    });
    getAuth(currentUser, function(sucess) {
        if(sucess)
            res.redirect("/user");
        else
            res.redirect("/");
    });
});

/*function getAuth(user, sucess) {


    // attempt to authenticate user
    User.getAuthenticated(user.username, user.password, function(err, user, reason) {
        if (err) throw err;

        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log('login success');
            sucess(true);
        }
        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
                console.log("NOT FOUND");
                sucess(false);
                break;
            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
                console.log("password incorrect");
                sucess(false);
                break;
        }

    });
}*/
 


function createUser(user, cb) {

    user.save(function(err) {
        if(err) {
            cb(err);
            throw err;
        }
        else {
            cb(null);
        }
    });
    

}

module.exports = router;