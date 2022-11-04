# p5.js-spring-wave

## About

Made for 2022 AP CS A Q1 exploration by Kevin Zhu

Inspired by p5.js examples [Letters](https://p5js.org/examples/typography-letters.html) and [Springs](https://p5js.org/examples/simulate-springs.html)

## Code snippets

### Add rotating line

Add to `draw()` outside of nested for loops and before theta is updated

```javascript
strokeWeight(8);
line(canvasR * cos(theta) * Math.sqrt(2), canvasR * sin(theta) * Math.sqrt(2), 0, 0);
```

### Debug coordinates

Add to `draw()` directly after `updatePos()` and `text()` and before `i++`

```javascript
push();
textSize(10);
scale(1, -1);
text(items[i].saveXY[0] + ' ' + items[i].saveXY[1], items[i].saveXY[0], -(items[i].saveXY[1] - 15));
pop();
```

Add `this.saveXY = [x, y];` to the `Letter` class

### Debug motion

Add to `draw()` directly after `updatePos()` and `text()` and before `i++`

```javascript
// draw movement vectors
line(items[i].restPoints[0][0], items[i].restPoints[0][1], items[i].restPoints[1][0], items[i].restPoints[1][1]);
```
