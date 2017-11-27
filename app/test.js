// var actionBarUtil = require("../../shared/utils/action-bar-util");
var gestures = require("ui/gestures");
var observableModule = require('data/observable');
var frameModule = require("ui/frame");
var _page;
var pageData = new observableModule.Observable();
var firebase = require("nativescript-plugin-firebase");

var picturesUrl = 'https://s3.amazonaws.com/swapmeimg/objects';


var ding = [];

function queryItems(uid) {
    firebase.query(result => {
        console.log("query result:", JSON.stringify(result));
        ding.push(result);
    }, "/users", {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'uid'
            },
            // ranges: [
            //     {
            //         type: firebase.QueryRangeType.START_AT,
            //         value: uid
            //     },
            //     {
            //         type: firebase.QueryRangeType.END_AT,
            //         value: uid
            //     }
            // ],
            limit: {
                type: firebase.QueryLimitType.LAST,
                value: 15
            }
    });
}

// viewModel.doQueryUsers = function () {
//     var path = "/users";
//     var that = this;
//     var onValueEvent = function (result) {
//       // note that the query returns 1 match at a time,
//       // in the order specified in the query
//       console.log("Query result: " + JSON.stringify(result));
//       if (result.error) {
//         dialogs.alert({
//           title: "Listener error",
//           message: result.error,
//           okButtonText: "Darn!!"
//         });
//       } else {
//         that.set("path", path);
//         that.set("type", result.type);
//         that.set("key", result.key);
//         that.set("value", JSON.stringify(result.value));
//       }
//     };
//     firebase.query(
//         onValueEvent,
//         path,
//         {
//           singleEvent: true,
//           orderBy: {
//             type: firebase.QueryOrderByType.KEY
//           }
//         }
//     ).then(
//         function (result) {
//           console.log("This 'result' should be available since singleEvent is true: " + JSON.stringify(result));
//           console.log("firebase.doQueryUsers done; added a listener");
//         },
//         function (errorMessage) {
//           dialogs.alert({
//             title: "Query error",
//             message: errorMessage,
//             okButtonText: "OK, pity!"
//           });
//         }
//     );
//   };

exports.loaded = function(args) {

	_page = args.object;
	_page.bindingContext = pageData;
	// actionBarUtil.styleActionBar();
    // actionBarUtil.hideiOSBackButton();

    var card = _page.getViewById("card");
    var img = _page.getViewById("guy");
    var job = _page.getViewById("job");
    var age = _page.getViewById("age");
    var name = _page.getViewById("name");

    var descriptions = [
        "smoke free pet free couch, very comfy.",
        "Vintage Lingerie Chest that's in great shape. Has 7 Drawers that pull out smooth. 49\" tall, 20\" across, 16\" Deep. Smoke free home. Pretty handles!",
        "mat",
        "2 Antique Tiger Oak Chairs that are in wonderful condition. Late 1800s-early 1900s. Very sturdy and smoke free home! Has genuine leather seats with brass pins around leather. Pretty hand carved club feet. 38\" t, 18\" t seat to floor, 18\" across, and 17\"d.",
        "Really nice, very heavy water globe, by Heritage Gallery, measurements shown in pictures, plays \"Jingle Bells\". ",
        "White Corning with floral design coffee pot.",
        "19 Piece tea set made by Lefton. Rose Chintz pattern. 50 to 60 years old. Excellent shape. Never used but for display. Tea pot approx. height 81/2 inches,sugar and creamer, 6 Cups with saucers, half moon shape candy dish, one cigarette holder and 2 small ashtrays.",
        "Mint Condition - #248 - Yankees Card",
        "Stihl blower, cranks easy, runs great",
        "College General Physics 201/202, 213/214",
        "Used this for community college 2 semesters, eco 231/232",
        "Brand New - Factory Sealed ",
        "Medline Walker-Folding Type, Adult size, With wheels, Push button folding. 300 Lb. capacity, Model MDS86410W54",
        "New - Been on display",
        "He-Man Masters of The Universe"
    ];
    
    var names = [
        "Couch",
        "Vintage Lingerie Chest",
        "Pretty Belgium Rug",
        "2 Antique Tiger Oak Chairs",
        "Beautiful Christmas Water Globe",
        "White Corning with floral design coffee pot.",
        "Lefton China Tea Set",
        "Don Mattingly 1984 Donruss Rookie Baseball Card",
        "LEAF BLOWER Stihl BG 86C",
        "Physics Scientist Engineers 9th Edition",
        "Principles of Economics Book",
        "The Mummy 3 Tomb Of The Dragon Emperor DVD",
        "Walker",
        "Vintage 1983 Dr Seuss Cat in the Hat",
        "Vintage SKELETOR Action Figure"
    ]
    // var namesArray = ["Jack John","Pete","Brian","Randall","Jim","Ashef","Michel","Drake","Ed"];
    // var jobsArray = ["Developer","Food Editor","Journalist","Actor","Fisherman","Chef","Designer","Musician","Baker"];
    // var ageArray = [41,23,35,33,45,64,33,54,34];
    
    var i = 0;
	
	// set a default
	img.src= picturesUrl + '/' +i + '.jpg'; 
	job.text= descriptions[i];
	// age.text=ageArray[i];
	name.text =names[i];
    var verdict = _page.getViewById("verdict");
    card.on(gestures.GestureTypes.swipe, function (args) {

    	i = i + 1;
    			
    	if(args.direction === 1){
			verdict.title="Liked!";
    		card.animate({ translate: { x: 1000, y: 100 } })
    			.then(function () { return card.animate({ translate: { x: 0, y: -2000 } }); })			    
			    .then(function () { return card.animate({ translate: { x: 0, y: 0 } }); })			    
			    .then(function () {
                    img.src= picturesUrl + '/' +i + '.jpg'; 
                    job.text=descriptions[i];
					name.text=names[i];   
                    
                    
					// img.src="~/images/"+i+".jpg"; 
					// job.text=jobsArray[i];
					// age.text=ageArray[i];
					// name.text=namesArray[i];   	
			})
			    .catch(function (e) {
			    console.log(e.message);
			});
		}
		else{
			verdict.title="Disliked!";
			card.animate({ translate: { x: -1000, y: 100 } })
				.then(function () { return card.animate({ translate: { x: 0, y: -2000 } }); })			    
			    .then(function () { return card.animate({ translate: { x: 0, y: 0 } }); })			    
			    .then(function () {		
                    img.src= picturesUrl + '/' +i + '.jpg';     
                    job.text=descriptions[i];
					name.text=names[i];                   
					// img.src="~/images/"+i+".jpg"; 
					// age.text=ageArray[i]; 
    	
			})
			    .catch(function (e) {
			    console.log(e.message);
			});
		}
      
	});

	
};

exports.profilePage = function(args) {
    const topFrame = frameModule.topmost();
    const navEntry = {
        moduleName: "profile"
    };
    topFrame.navigate(navEntry);
 }

 exports.chatPage = function(args) {
    const topFrame = frameModule.topmost();
    const navEntry = {
        moduleName: "chat"
    };
    topFrame.navigate(navEntry);
}