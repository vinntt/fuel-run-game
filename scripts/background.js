class Background {
    //the background can draw itself - draw function
    draw() {
        //draw the background with Image objects of the game setting
        //default width and height are variables set by P5 based on the dimensions of the canvas size
        game.settings.backgroundImage.forEach(function(img) {
            //loop to load the image, later make the image move
            //replace the value to variable img.x
            //x refers from the right to the left, decrease it for moving
            // img runs from right to left (-), from left to right(+)
            // img.x -= 1
            img.x -= img.speed
            image(img.src, img.x, 0, width, height);
            //cho hinh background chay tiep noi hinh dau tien
            image(img.src, img.x + width, 0, width, height);
            //neu hinh thu 2 chay ra khoi man hinh
            if (img.x <= -width) {
                //endless effect
                img.x = 0
            }
        })
    }
}