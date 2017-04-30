var screenshot = require('screenshot-node');
var keyboard = require('msi-keyboard')();
var color   = require('dominant-color');
var diff = require('color-diff');
var imgPath = ['./screens/screenshot_right.png','./screens/screenshot_center.png','./screens/screenshot_left.png'];

var screenWidth = 1920;
var screenHeight = 1080;

var region = ["left","middle","right"];
var intensities = ["light","low","med","high"];
var palette = [{R:0,G:0,B:0},
  		         {R:255,G:0,B:0},
  		         {R:255,G:128,B:0},
  		         {R:255,G:255,B:0},
  		         {R:0,G:255,B:0},
  		         {R:0,G:255,B:255},
  		         {R:0,G:0,B:255},
  		         {R:255,G:0,B:255},
               {R:255,G:255,B:255}
];

var changeColor = function(iterator)
{
  color(imgPath[iterator], {format: 'rgb'}, function(err, color){
    if(err)
    {
      console.log(err);
    }else{
          var grayscale = 0.2126*color[0] + 0.7152*color[1] + 0.0722*color[2];
          var intensity = intensities[Math.round((grayscale/255)*4)];
          console.log(intensity);

          var colorObject = {R:color[0],G:color[1],B:color[2]};
          var closest =  diff.closest(colorObject,palette);
          console.log(closest);
          console.log(palette.indexOf(closest));
          try{
            keyboard.color(region[iterator],{
                color : palette.indexOf(closest),
                intensity : intensity
            });
          }catch(err){
          console.log(err);
          }
    }
  });
}

setInterval(function(){

          for(var iterator = 0; iterator < imgPath.length; iterator++)
          {
            screenshot.saveScreenshot(iterator*screenWidth/3,0,screenWidth/3,screenHeight,imgPath[iterator],function(err){
              if(err) console.log(err);
               else {
                changeColor(iterator);
              }
            });
          }

},10)
