c.width = window.innerWidth/2;
c.height = window.innerHeight - window.innerHeight/5;
ctx.lineWidth = 2;
ctx.strokeStyle = "gray";
ctx.fillStyle = "gray";

tools = document.getElementsByClassName("tools")[0].getElementsByTagName("button");

selectedTool = tools[0];

points = {}; // contains coordinates of point with the letter as the key
lastPointLetter = null;
lines = []; // contains string of the two point labels that make the line
circles = []; // contains string of two point labels, first is the center, second is the radius

firstPoint = null;

function selectTool(tool) {
    selectedTool.classList.remove("active");
    selectedTool = tool;
    selectedTool.classList.add('active');
    firstPoint = null;
}


function getClosestPoint(mousePos) {
    if (points != {}) {
        mousePoint = [mousePos['x'], mousePos['y']];
        lowestDist = distance(mousePoint, points["A"]);
        closestPoint = "A";
        for (var key in points) {
            dist = distance(mousePoint, points[key]);
            if (dist < lowestDist) {
                lowestDist = dist;
                closestPoint = key;
            }
        }
        return closestPoint;
    }
    return null;
}
    


for (i=0; i<tools.length; i++) {
    tools[i].addEventListener("click", function(e) {
        selectTool(this);
    });
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (selectedTool.innerHTML == "Point") {
        nextLetter = null;
        if (lastPointLetter == null) {
            nextLetter = "A";
        } else {
            const codePoint = lastPointLetter.codePointAt(0);
            const nextCodePoint = codePoint + 1;
            nextLetter = String.fromCodePoint(nextCodePoint);
        }
        
        points[nextLetter] = [mousePos['x'], mousePos['y']];
        lastPointLetter = nextLetter;
    } else if (selectedTool.innerHTML == "Line") {
        if (firstPoint == null) {
            // set first point
            firstPoint = getClosestPoint(mousePos);
        } else {
            // create line
            endpoint = getClosestPoint(mousePos);
            if (endpoint == firstPoint || lines.includes(firstPoint + endpoint) || lines.includes(endpoint + firstPoint)) {
                firstPoint = null;
                return;
            }
            lines.push(firstPoint + endpoint);
            firstPoint = null;
        }
    } else if (selectedTool.innerHTML == "Circle") {
        if (firstPoint == null) {
            // set first point
            firstPoint = getClosestPoint(mousePos);
        } else {
            // create circle
            endpoint = getClosestPoint(mousePos);
            if (endpoint == firstPoint || circles.includes(firstPoint + endpoint)) {
                firstPoint = null;
                return;
            }
            circles.push(firstPoint + endpoint);
            firstPoint = null;
        }
    }
});

document.addEventListener("keydown", function(e) {
    if (e.code == "Escape") {
        firstPoint = null;
    }
});

document.getElementsByClassName('reset')[0].addEventListener('click', function(e) {
    points = {};
    lastPointLetter = null;
    lines = [];
    circles = [];
    firstPoint = null;
    ctx.clearRect(0, 0, c.width, c.height);
});

function animate() {
    // call again next time we can draw
    requestAnimationFrame(animate);
    // clear canvas
    ctx.clearRect(0, 0, c.width, c.height);
    
    // draw lines
    for (var i in lines) {
        line = lines[i];
        point1 = points[line[0]];
        point2 = points[line[1]];
        drawLine(point1, point2);
    }

    // draw circles
    for (var i in circles) {
        circle = circles[i];
        point1 = points[circle[0]];
        point2 = points[circle[1]];
        drawCircle(point1[0], point1[1], distance(point1, point2));
    }

    // draw points
    for (var key in points) {
        labelPoint(points[key], key);
    }

    // draw first point when creating a line, circle, etc
    if (firstPoint != null) {
        labelPointWithColor(points[firstPoint], firstPoint, "red");
    }

}

animate();