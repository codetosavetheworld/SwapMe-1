var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var tnsOAuthModule = require("nativescript-oauth");
var Sqlite = require("nativescript-sqlite");
var firebase = require("nativescript-plugin-firebase");

function queryUsers(uid) {
    firebase.query(result => {
        console.log("query result:", JSON.stringify(result));
        return true;
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

function createViewModel() {
    var viewModel = new Observable();

    viewModel.tapLogin = function () {
        firebase.login({
            // note that you need to enable Facebook auth in your firebase instance
            type: firebase.LoginType.FACEBOOK
        }).then(
            result => {
                if (queryUsers(result.uid)) {
                    console.log('im in boys');
                    firebase.push(
                        '/users',
                        {
                            'uid': result.uid,
                            'name': result.name,
                            'email': result.email,
                            'profilePicture': result.profileImageURL,
                            'birthYear': '',
                            'isMale': '',
                            'geolocation': '',
                            'distancePreference': 10
                        }
                    ).then(
                        function (result) {
                            console.log("created key: " + result.key);
                            const topFrame = frameModule.topmost();
                            const navEntry = {
                                moduleName: "test",
                                context: result
                            };
                            topFrame.navigate(navEntry);
                        }
                    );
                } 
                else {
                    const topFrame = frameModule.topmost();
                    const navEntry = {
                        moduleName: "test"
                    };
                    topFrame.navigate(navEntry);
                }
            },
            errorMessage => {
                alert({
                    title: "Login error",
                    message: errorMessage,
                    okButtonText: "OK, pity"
                });
            }
            );
    };


    viewModel.tapLogout = function () {
        tnsOAuthModule.logout()
            .then(function () { return console.log('logged out'); })
            .catch(function (er) {
                console.error('error logging out');
                console.dir(er);
            });
    };

    return viewModel;
}

exports.createViewModel = createViewModel;


        // alert({
                //   title: "Login OK",
                //   message: JSON.stringify(result),
                //   okButtonText: "Nice!"
                // });

    // viewModel.firstname = "";
    // viewModel.lastname = "";

    // viewModel.insert = function () {
    //     database.execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [this.firstname, this.lastname]).then(id => {
    //         console.log("INSERT RESULT", id);
    //     }, error => {
    //         console.log("INSERT ERROR", error);
    //     });
    // }

    // viewModel.select = function () {
    //     database.all("SELECT * FROM people").then(rows => {
    //         for (var row in rows) {
    //             console.log("RESULT", rows[row]);
    //         }
    //     }, error => {
    //         console.log("SELECT ERROR", error);
    //     });
    // }