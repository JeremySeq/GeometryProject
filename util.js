var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function drawCircle(x, y, radius) {
    // ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

function drawLine(vec1, vec2) {
    ctx.beginPath();
    ctx.moveTo(vec1[0], vec1[1]);
    ctx.lineTo(vec2[0], vec2[1]);
    ctx.closePath();
    ctx.stroke();
}

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawText(x, y, text) {
    ctx.font = "32px serif";
    ctx.fillText(text, x, y);
}

function labelPoint(x, y, text) {
    drawPoint(x, y);
    drawText(x + 16, y + 16, text);
}

function labelPoint(vec, text) {
    drawPoint(vec[0], vec[1]);
    drawText(vec[0] + 16, vec[1] + 16, text);
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function distance(vec1, vec2) {
    return Math.sqrt(Math.pow(vec1[0] - vec2[0], 2) + Math.pow(vec1[1] - vec2[1], 2));
}


function get_intersections(vec1x, vec1y, r1, vec2x, vec2y, r2) {
    // circle 1: (vec1x, vec1y), radius r0
    // circle 2: (vec2x, vec2y), radius r1
    

    d = Math.sqrt((vec2x-vec1x)**2 + (vec2y-vec1y)**2)
    
    // non intersecting
    if (d > r1 + r2) {
        return null
    }
    // One circle within other
    if (d < Math.abs(r1-r2)) {
        return null
    }
    // coincident circles
    if (d == 0 && r1 == r2) {
        return null
    }
    else {
        a=(r1**2-r2**2+d**2)/(2*d)
        h=Math.sqrt(r1**2-a**2)
        x2=vec1x+a*(vec2x-vec1x)/d
        y2=vec1y+a*(vec2y-vec1y)/d
        x3=x2+h*(vec2y-vec1y)/d
        y3=y2-h*(vec2x-vec1x)/d

        x4=x2-h*(vec2y-vec1y)/d
        y4=y2+h*(vec2x-vec1x)/d

        return [x3, y3, x4, y4]
    }
}

function closestPointOnLine(point, line) {
    // Extracting coordinates of the line endpoints
    const [x1, y1] = line[0];
    const [x2, y2] = line[1];

    // Vector representing the line segment
    const lineVec = [x2 - x1, y2 - y1];

    // Vector from one endpoint of the line to the point
    const toPointVec = [point[0] - x1, point[1] - y1];

    // Project the vector from one endpoint to the point onto the line vector
    const t = (toPointVec[0] * lineVec[0] + toPointVec[1] * lineVec[1]) /
              (lineVec[0] * lineVec[0] + lineVec[1] * lineVec[1]);

    // If t is less than 0, the closest point is the first endpoint
    if (t <= 0) return [x1, y1];

    // If t is greater than 1, the closest point is the second endpoint
    if (t >= 1) return [x2, y2];

    // Otherwise, calculate the coordinates of the closest point on the line
    const closestX = x1 + t * lineVec[0];
    const closestY = y1 + t * lineVec[1];

    return [closestX, closestY];
}