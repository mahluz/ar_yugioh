//
// var tracker = new AR.ClientTracker("assets/tracker.wtc");
//
// var model_darkMagician = new AR.Model("assets/objects/darkMagician/darkMagician.wt3",{
// 	scale:{
// 		x:0.045,
// 		y:0.045,
// 		z:0.045
// 	}
// });
// var model_blueEyes = new AR.Model("assets/objects/blueEyes/blueEyesWhiteDragon.wt3",{
// 	scale:{
// 		x:0.045,
// 		y:0.045,
// 		z:0.045
// 	}
// });
//
// var trackable_darkMagician = new AR.Trackable2DObject(tracker,'DarkMagician-YGLD-EN-C-1E',{
// 	drawables:{
// 		cam:[model_darkMagician]
// 	}
// });
// var trackable_blueEyes = new AR.Trackable2DObject(tracker,'blueEyesWhiteDragon',{
// 	drawables:{
// 		cam:[model_blueEyes]
// 	}
// });

var World = {
	loaded: false,
	rotating: false,
	initialized: false,

	init: function initFn() {
		this.createModelAtLocation();
		World.initialized =  true;
	},

	createModelAtLocation: function createModelAtLocationFn() {

		AR.logger.activateDebugMode();
		AR.logger.info("createModelAtLocation called ...");

		/*
			First a location where the model should be displayed will be defined. This location will be relativ to the user.
		*/
		// var location = new AR.RelativeLocation(null, 5, 0, 2);
		var location = new AR.RelativeLocation(null, 5, 0, 2);
		var altitude = location.altitude;
		this.dragon_breath = new AR.Sound("assets/audio/dragon_breath.mp3",{
			onLoaded:function(){console.log("play sound");},
			onError:function(){console.log('sound failed');},
		});
		this.victory = new AR.Sound("assets/audio/victory.mp3",{
			onLoaded:function(){console.log("play sound");},
			onError:function(){console.log('sound failed');},
		});
		this.dragon_breath.onFinishedPlaying = function(){console.log("sound done");};
		this.dragon_breath_movie = new AR.VideoDrawable("assets/video/dragon_breath.mp4",2,{
			translate:{
				x:0,
				y:2.5
			}
		});
		var tracker = new AR.ClientTracker("assets/tracker.wtc");

		this.xEnemy=0.0005;
		this.yEnemy=0.0005;
		this.zEnemy=0.0005;
		/*
			Next the model object is loaded.
		*/
		var imgAttack = new AR.ImageResource("assets/images/Attack.png");

		this.modelEnemy = new AR.Model("assets/npc/dragon.wt3", {
			onLoaded: this.worldLoaded,
			scale: {
				x: this.xEnemy,
				y: this.yEnemy,
				z: this.zEnemy
			}
		});
		this.idleEnemy=new AR.ModelAnimation(this.modelEnemy,"Animation_00");

		World.idleEnemy.start(-1);
		World.dragon_breath.play(-1);

		var model_blueEyes = new AR.Model("assets/blueEyes/blueEyes.wt3",{
			onLoaded: this.worldLoaded,
			scale:{
				x:0.045,
				y:0.045,
				z:0.045
			}
		});

		this.rotatingBlueEyes=new AR.PropertyAnimation(model_blueEyes,"rotate.z",-25,335,10000);

		var btnAttack = new AR.ImageDrawable(imgAttack,1, {
		    translate: {
		        x: 1,
		        y: 1
		    },
				onClick: this.blueEyesAttack
		});

		var model_darkMagician = new AR.Model("assets/darkMagician/darkMagician.wt3",{
			onLoaded: this.worldLoaded,
			scale:{
				x:0.045,
				y:0.045,
				z:0.045
			}
		});

        var indicatorImage = new AR.ImageResource("assets/earth/indi.png");

        var indicatorDrawable = new AR.ImageDrawable(indicatorImage, 0.1, {
            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
        });

		/*
			Putting it all together the location and 3D model is added to an AR.GeoObject.
		*/
		var obj = new AR.GeoObject(location, {
            drawables: {
               cam: [this.modelEnemy],
               indicator: [indicatorDrawable]
            }
        });
		var trackable_blueEyes = new AR.Trackable2DObject(tracker,'blue-eyes',{
			drawables:{
				cam:[model_blueEyes,btnAttack,this.dragon_breath_movie]
			}
		});
		var trackable_darkMagician = new AR.Trackable2DObject(tracker,'DarkMagician-YGLD-EN-C-1E',{
			drawables:{
				cam:[model_darkMagician]
			}
		});


	},
	blueEyesAttack:function blueEyesAttackfn(){
		if(World.modelEnemy.scale.x<0.0002){
			World.dragon_breath.stop();
			World.dragon_breath_movie.stop();
			World.victory.play();
			World.modelEnemy.enabled=false;
			this.victory();
		}

		World.dragon_breath.play();
		World.modelEnemy.scale.x-=0.00005;
		World.modelEnemy.scale.y-=0.00005;
		World.modelEnemy.scale.z-=0.00005;
		if (!World.rotatingBlueEyes.isRunning()) {
        if (!World.rotating) {
            World.rotatingBlueEyes.start(-1);
            World.rotating = true;
						World.dragon_breath_movie.play();
        } else {
            World.rotatingBlueEyes.resume();
        }
    } else {
        World.rotatingBlueEyes.pause();
    }

    return false;
	},

	/*
		This sample shows you how to use the function captureScreen to share a snapshot with your friends. C
		oncept of interaction between JavaScript and native code is same as in the POI Detail page sample but the urlListener now handles picture sharing instead.
		The "Snapshot"-button is on top right in the title bar.
		Once clicked the current screen is captured and user is prompted to share it (Handling of picture sharing is done in native code and cannot be done in JavaScript)
	*/
	captureScreen: function captureScreenFn() {
		AR.logger.info("captureScreen called ...");

		if (World.initialized) {
			document.location = "architectsdk://button?action=captureScreen";
		}
	},

	/**
	 * This is an example of a function called by IONIC --> WikitudePlugin
	 */
	testFunction: function testFunctionFn(message) {
		alert("testFunction called: "+message);
	},

	worldLoaded: function worldLoadedFn() {
		World.loaded = true;
		var e = document.getElementById('loadingMessage');
		e.parentElement.removeChild(e);
	}
};

World.init();
