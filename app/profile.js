var observableModule = require('data/observable');
var frameModule = require("ui/frame");
var pageData = new observableModule.Observable();
var firebase = require("nativescript-plugin-firebase");
var camera = require("nativescript-camera");
var imageModule = require("ui/image");

function queryUsers(uid) {
    firebase.query(result => {
        console.log("query result:", JSON.stringify(result));
        return result;
    }, "/users", {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'uid'
            },
            ranges: [
                {
                    type: firebase.QueryRangeType.START_AT,
                    value: uid
                },
                {
                    type: firebase.QueryRangeType.END_AT,
                    value: uid
                }
            ]
    });
}

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    getProf = page.getViewById('profile');

    var itsame = queryUsers('eneup101');
    var profile = page.getViewById("profile");
    var picture = page.getViewById("profilePicture");
    var description = page.getViewById("profileDescription");

    description.text= "I am a RPI student about to graduate looking to trade items! :D";

    picture.src = "https://s3.amazonaws.com/swapmeimg/objects/donnie.jpg";
    
};

exports.addItem = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    getProf = page.getViewById('profile');

    camera.requestPermissions();
    var options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };
    camera.takePicture(options).then(function (imageAsset) {
        console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
        console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
