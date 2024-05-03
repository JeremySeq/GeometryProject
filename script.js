function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

c.width = window.innerWidth/2;
c.height = window.innerHeight - window.innerHeight/8;
ctx.lineWidth = 2;
ctx.strokeStyle = "gray";
ctx.fillStyle = "gray";

step = 0;
A = null;
B = null;
C = null;

function updateConstruction(newText) {
    [start, end] = construction.innerHTML.split("<mark>")
    end = end.split("</mark>")[0];
    construction.innerHTML = start + end + "<mark>" + newText + "</mark>";
}

pressSpaceInstruction = "Press space for the next step";

step1txt = "Let the angle ABC be the given rectilineal angle.<br>Thus it is required to bisect it.<br>";
step2txt = "Let a point D be taken at random on AB;<br>";
step3txt = "let <r>BE</r> be cut off from <r>BC</r> equal to <r>BD</r>;<br>";
step4txt = "let <r>DE</r> be joined,<br>";
step5txt = "and on <r>DE</r> let the equilateral triangle DEF be constructed;<br>";
step6txt = "let <r>BF</r> be joined."

var instructions = document.getElementById("instructions");
var construction = document.getElementsByClassName("construction")[0];
var resetButton = document.getElementsByClassName("reset-btn")[0];

instructions.innerHTML = "Choose point A"
updateConstruction(step1txt);

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (step == 0 && A == null) {
        A = [mousePos.x, mousePos.y];
        drawPoint(A[0], A[1]);
        instructions.innerHTML = "Choose point B"
    } else if (step == 0 && B == null) {
        B = [mousePos.x, mousePos.y];
        drawPoint(B[0], B[1]);
        drawLine(A, B);
        instructions.innerHTML = "Choose point C"
    } else if (step == 0 && C == null) {
        C = [mousePos.x, mousePos.y];
        step = 1;
        step1();
        step = 2;
        instructions.innerHTML = "Choose point D on <r>AB</r>"
        updateConstruction(step2txt)
        return;
    }

    if (step == 2) {
        point = [mousePos.x, mousePos.y];
        line = [A, B];
        D = closestPointOnLine(point, line);
        step2();
        step = 3;
        instructions.innerHTML = pressSpaceInstruction
        updateConstruction(step3txt);
    }

}, false);

document.addEventListener("keypress", function(event) {
    if (event.code == "Space") {
        if (step == 3) {
            step3();
            step = 4;
            instructions.innerHTML = pressSpaceInstruction
            updateConstruction(step4txt);
        } else if (step == 4) {
            step4();
            step = 5;
            instructions.innerHTML = pressSpaceInstruction
            updateConstruction(step5txt);
        } else if (step == 5) {
            step5();
            step = 6;
            instructions.innerHTML = pressSpaceInstruction
            updateConstruction(step6txt);
        } else if (step == 6) {
            step6();
            step = 7;
            instructions.innerHTML = pressSpaceInstruction
            updateConstruction("");
        }
    }
});


resetButton.addEventListener("click", function() {
    step = 0;
    A = null;
    B = null;
    C = null;
    instructions.innerHTML = "Choose point A"
    construction.innerHTML = "<mark>" + step1txt + "</mark>";

    ctx.clearRect(0, 0, c.width, c.height);
});