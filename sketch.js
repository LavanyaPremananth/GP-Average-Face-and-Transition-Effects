//Ideas for further development:
//How would you change the code so that the image drawn on the left is a random face from the array of faces rather than just the first one, with a new random face selected using the keyPressed() function? 
//
//On mouse moved could you have the pixel values of the second image transition between the randomly selected image and the average image based on the mouseX value? HINT: Use the p5 lerp() function, read the documentation to understand what you need to do.

var imgs = [];
var avgImg;
var img0;

var numOfImages = 30;

var lerpImg;
var randomNum = 0;

var loadCounter = 0;

//for loop within the preload() function to load all 30 images into the imgs array
//////////////////////////////////////////////////////////
function preload() // preload() runs once
{ 
	for(var i=0; i<numOfImages;i++)
	{
		var img = loadImage("assets/"+i+".jpg",imageLoadSuccess);
		imgs.push(img);
	}
	
}

function imageLoadSuccess()
{
	loadCounter++;
}

//////////////////////////////////////////////////////////
function setup() 
{
	img0 = imgs[0];
    createCanvas(img0.width*2, img0.height);
    pixelDensity(1);
    
}
//////////////////////////////////////////////////////////
function draw() 
{	
    background(125);  
    if(loadCounter != numOfImages)
    {
    	console.log("not ready");
    	return;
    }
    console.log("All images loaded, ready for average face!");
    var img = averageFace(imgs);
	image(img0,0,0);
	image(img,img.width,0);
    noLoop();
}

function averageFace(images)
{
	console.log("In average face");
	//load the pixels of all images in the array
	for(var i=0;i<images.length;i++)
	{
		images[i].loadPixels();
	}
	
	//create a blank image to store all the ave RGB value
	var imgOut = createImage(images[0].width,
							 images[0].height);
	imgOut.loadPixels();
	

	for(var y=0;y<imgOut.height;y++)
	{
		for(var x=0;x<imgOut.width;x++)
		{
            //calculate the pixel index for imgOut
			var pixelIndex = ((imgOut.width * y) + x) * 4;
			imgOut.set(x,y,color(pixelIndex,0,0));
			
			//to compute the average RGB for each pixel for all the images
			var sumR = 0;
			var sumG = 0;
			var sumB = 0;
			
			//go to each image in images to get the RGB value for that pixel
			for(var i=0; i<images.length; i++)
			{
			 	var img = images[i];
			 	sumR+= img.pixels[pixelIndex+0];
			 	sumG += img.pixels[pixelIndex+1];
			 	sumB += img.pixels[pixelIndex+2];
			 }
			 
			 imgOut.pixels[pixelIndex+0] = sumR/images.length;
			 imgOut.pixels[pixelIndex+1] = sumG/images.length;
			 imgOut.pixels[pixelIndex+2] = sumB/images.length;
			 imgOut.pixels[pixelIndex+3] = 255;
		}
	}
	
	imgOut.updatePixels();
        
    if(mouseX <= canvas.width)
        {
            var mappedX = map(mouseX, 0, images[0].width*2, 0, 1);
        }
        else
        {
            var mappedX = map(canvas.width, 0, images[0].width*2, 0, 1)
        }

        for(var y =0; y < imgOut.height; y++)
        {
            for(var x = 0; x < imgOut.width; x++)
            {
                var pIndex = ((imgOut.width * y) + x ) * 4;
                var redSum = 0;
                var greenSum = 0;
                var blueSum = 0;

                for(var i=0; i<images.length; i++)
                {
                    var img = images[i];
                    redSum += imgOut.pixels[pIndex+0];
                    greenSum += imgOut.pixels[pIndex+1];
                    blueSum += imgOut.pixels[pIndex+2];
                }

                imgOut.pixels[pIndex+0] = lerp(images[0].pixels[pIndex+0], redSum/numOfImages, mappedX);
                imgOut.pixels[pIndex+1] = lerp(images[0].pixels[pIndex+1], greenSum/numOfImages, mappedX);
                imgOut.pixels[pIndex+2] = lerp(images[0].pixels[pIndex+2], blueSum/numOfImages, mappedX);
                imgOut.pixels[pIndex+3] = 255; 

            }
        }
	
	imgOut.updatePixels();
	return imgOut;
}

//function to make right side red
function redFilter(imgs)
{	
    imgs.loadPixels();
    
    for(var x=0;x<imgs.width;x++)
        {
            for(var y=0;y<imgs.width;y++)
                {
                    var pixelIndex=((imgs.width*y)+x)*4;
                    var oldRed=imgs.pixels[pixelIndex+0];
              
              imgs.pixels[pixelIndex+0]=oldRed;
              imgs.pixels[pixelIndex+1]=0;
              imgs.pixels[pixelIndex+2]=0;
              imgs.pixels[pixelIndex+3]=255;        
                    
                }  
        }
    imgs.updatePixels();
    return imgs;
}

function keyPressed()
{
    if(keyCode === 32)
    {
        randomNum = getRandomInt(numOfImages);
        image(imgs[randomNum],0,0); 
    }
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

function mouseMoved()
{
    loop();
}
