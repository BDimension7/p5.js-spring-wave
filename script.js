p5.disableFriendlyErrors = true; // disables FES

function modulo(n, m) {
    let s = n % m;
    if (s < 0) {
        s = m < 0 ? s - m : s + m;
    }
    return s;
}

let fps = 30;
let canvasR = 400;
let font;
let fontSize = 40;
let baseColor, highlightColor;
let message = 'O';

function preload() {
    font = loadFont('fonts/AtkinsonHyperlegible-Bold.ttf');
}

function setup() {
    frameRate(fps);
    textFont(font);
    textSize(fontSize);
    textAlign(CENTER, CENTER);
    createCanvas(canvasR * 2, canvasR * 2);
    angleMode(DEGREES);
    baseColor = color(0, 0, 0);
    highlightColor = color(0, 127, 255);
}

class Letter {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        if (x >= 0) {
            if (y >= 0) {
                this.angle = atan(y / x);
            } else {
                this.angle = 360 + atan(y / x);
            }
        } else {
            this.angle = 180 + atan(y / x);
        }
        this.restX = x;
        this.restY = y;
        this.stretchDist = 0.05;
        this.restPoints = [
            // default rest point
            [x, y],
            // secondary rest point (perpendicular to rotating radius)
            [x - y * this.stretchDist, y + x * this.stretchDist],
        ];
        this.vX = 0.0;
        this.vY = 0.0;
        this.k = 0.8;
        this.damp = 0.05;
        this.mass = 0.1;
        this.accel = 0;
        this.force = 0;
    }

    updateColor() {
        if ((theta >= 0 && theta <= 90) || (theta >= 270 && theta <= 360)) {
            if (this.y < this.x * tan(theta)) {
                this.color = highlightColor;
            }
        } else if (this.y > this.x * tan(theta)) {
            this.color = highlightColor;
        }
        this.color = lerpColor(this.color, baseColor, 0.03);
    }

    updatePos() {
        this.force = -this.k * (this.y - this.restY);
        this.accel = this.force / this.mass;
        this.vY = this.damp * (this.vY + this.accel);
        this.y += this.vY;

        this.force = -this.k * (this.x - this.restX);
        this.accel = this.force / this.mass;
        this.vX = this.damp * (this.vX + this.accel);
        this.x += this.vX;
    }
}

let theta = 0.1;
let rotSpeed = 1;
let items = [];

function draw() {
    // convert coordinate system to conventional
    translate(width / 2, height / 2);
    scale(1, -1);
    background(255);

    // horizontal, vertical space between items
    let space = 50;

    let i = 0;
    for (let y = -canvasR; y <= canvasR; y += space) {
        for (let x = -canvasR; x <= canvasR; x += space) {
            let letter = message[i % message.length];
            if (!items[i]) {
                items[i] = new Letter(baseColor, x, y);
            }

            // update color
            items[i].updateColor();
            fill(items[i].color);

            // spring animation
            if (modulo(theta - items[i].angle, 360) > 8) {
                // springing back
                // use mass, damp to customize motion
                items[i].mass = 5;
                items[i].damp = 0.8;
                items[i].restX = items[i].restPoints[0][0];
                items[i].restY = items[i].restPoints[0][1];
            } else if (modulo(theta - items[i].angle, 360) > 2) {
                // pushed away
                items[i].restX = items[i].restPoints[1][0];
                items[i].restY = items[i].restPoints[1][1];
            }

            // update position
            items[i].updatePos();
            text(letter, items[i].x, items[i].y);

            i++;
        }
    }

    // prevent color flicker at vertical, horiztonal line
    theta = Math.round((theta + rotSpeed) % 360) + 0.1;
}
