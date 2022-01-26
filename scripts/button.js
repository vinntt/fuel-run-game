class Button {
    constructor(position, width, height, text, font, callback) {
        this.position = position;
        this.position2 = new Position(position.x + width, position.y + height);
        this.width = width;
        this.height = height;
        this.text = text;
        this.font = font;
        this.callback = callback;
    }

    draw() {
        fill(255);
        rect(this.position.x, this.position.y, this.width, this.height);
        textFont(this.font);
        textSize(50);
        fill(238, 140, 75);
        textAlign(CENTER, TOP);
        text(this.text, this.position.x + 4, this.position.y + 8, this.width);

    }

    isMouseOver(mouseX, mouseY) {
        const x2 = this.position.x + this.width;
        const y2 = this.position.y + this.height;

        return this.position.x < mouseX && mouseX < x2 &&
            this.position.y < mouseY && mouseY < y2;
    }

    onClicked() {
        if (typeof this.callback !== "undefined") {
            this.callback();
        }
    }
}