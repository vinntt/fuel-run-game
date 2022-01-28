class Background {
    constructor(images, width, height) {
        this.images = images;
        this.width = width;
        this.height = height;
    }
    draw() {
        // this.backgroundImg.forEach(function(img) {
        //loop to load the image, later make the image move
        //replace the value to variable img.x
        //x refers from the right to the left, decrease it for moving
        // img runs from right to left (-), from left to right(+)
        // img.x -= 1
        this.images.forEach((img) => {
            img.x -= img.speed
            image(img.src, img.x, 0, this.width, this.height);
            //cho hinh background chay tiep noi hinh dau tien
            image(img.src, img.x + this.width, 0, this.width, this.height);
            //neu hinh thu 2 chay ra khoi man hinh
            if (img.x <= -this.width) {
                img.x = 0
            }
        })
    }
}