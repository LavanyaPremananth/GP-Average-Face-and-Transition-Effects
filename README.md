## Image Processing Project with Average Face and Transition Effects

This project involves image processing techniques using p5.js to load and manipulate a set of face images.

### Steps to Complete

#### Step 1: Load Images
- Use a `for` loop within the `preload()` function to load 30 images into the `imgs` array. Each image is named from `0.jpg` to `29.jpg`, and the filenames are constructed dynamically within the loop.

#### Step 2: Setup Canvas
- Update the `createCanvas()` function to create a canvas twice the width of the first image (`img0`) in the array and equal to its height. Draw `img0` on the left side of the canvas.

#### Step 3: Initialize Average Image Buffer
- Initialize the `avgImg` variable using `createGraphics()` to create an empty buffer with the same size as `img0`.

#### Step 4: Load Image Pixels
- In the `draw()` function, use a `for` loop to call `loadPixels()` on all images within `imgs` and also on `avgImg`.

#### Step 5: Display Red and Average Images
- Convert the pixel data of the first image (`img0`) into a 1D index value and set the corresponding pixel in `avgImg` to red.
- Update `avgImg` pixels after exiting the nested loop and draw `avgImg` on the right side of the canvas.

#### Step 6: Compute Average Image
- Inside the nested loop, calculate the sum of each color channel (`sumR`, `sumG`, `sumB`) across all images in `imgs`.
- Update each channel in `avgImg` by computing the average value.

#### Step 7: Further Development Ideas
- Implement the following enhancements:
  - **Random Face Display**: Use the `keyPressed()` function to display a random face from `imgs` on the left side of the canvas.
  - **Mouse-Interpolated Transition**: On `mouseMoved()`, transition the pixel values of `avgImg` between a randomly selected image and the average image based on `mouseX` position using `lerp()`.

### Usage

1. Clone this repository.
2. Open `index.html` in a web browser to view the image processing project.
3. Use keyboard inputs (`Spacebar` for random face) and mouse movement to interact with the project.

### Technologies Used

- **p5.js**: A JavaScript library for creative coding and visualization.
- **HTML/CSS**: Used for web page structure and styling.

### Files Included

- `index.html`: Main HTML file containing the canvas and script links.
- `sketch.js`: The p5.js script containing the image processing logic.
- `assets/`: Folder containing face images (`0.jpg` to `29.jpg`) used for processing.
