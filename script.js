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

function updateProof(newText) {
    proofHeading.hidden = false;    
    [start, end] = proof.innerHTML.split("<mark>")
    end = end.split("</mark>")[0];
    proof.innerHTML = start + end + "<mark>" + newText + "</mark>";
}

function flashInstructions() {
    instructions.style.backgroundColor = "gray";
    setTimeout(function() {
        instructions.style.backgroundColor = "";
    }, 100)
}

pressSpaceInstruction = "Press space for the next step";

// step1txt = "Let the angle ABC be the given rectilineal angle.<br>Thus it is required to bisect it.<br>";
// step2txt = "Let a point D be taken at random on AB;<br>";
// step3txt = "let <r>BE</r> be cut off from <r>BC</r> equal to <r>BD</r>;<br>";
// step4txt = "let <r>DE</r> be joined,<br>";
// step5txt = "and on <r>DE</r> let the equilateral triangle DEF be constructed;<br>";
// step6txt = "let <r>BF</r> be joined.<br>";
step1txt = "1. Draw given rectilineal angle ∠ABC<br>";
step2txt = "2. Take random point D on <r>AB</r><br>";
step3txt = "3. Cut <r>BE</r> from <r>BC</r> equal to <r>BD</r><br>";
step4txt = "4. Join <r>DE</r><br>";
step5txt = "5. Create equilateral triangle DEF on <r>DE</r><br>";
step6txt = "6. Join <r>BF</r><br>";
step7txt = "7. <r>BD</r> = <r>BE</r><br>";
step8txt = "8. <r>BF</r> is common to both triangles<br>";
step9txt = "9. <r>DF</r> = <r>EF</r><br>";
step10txt = "10. Therefore, △BEF = △BDF and ∠DBF = ∠EBF<br>An angle is bisected when the two angles are equal.<br>Therefore ∠ABC has been bisected by line <r>BF</r>";


var instructions = document.getElementById("instructions");
var construction = document.getElementsByClassName("construction")[0];
var proof = document.getElementsByClassName("proof")[0];
var proofHeading = document.getElementsByClassName("proof-heading")[0];
var qef = document.getElementsByClassName("qef")[0];
var resetButton = document.getElementsByClassName("reset-btn")[0];


instructions.innerHTML = "Choose point A"
updateConstruction(step1txt);

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (step == 0 && A == null) {
        A = [mousePos.x, mousePos.y];
        drawPoint(A[0], A[1]);
        instructions.innerHTML = "Choose point B"
        flashInstructions();
    } else if (step == 0 && B == null) {
        B = [mousePos.x, mousePos.y];
        drawPoint(B[0], B[1]);
        drawLine(A, B);
        instructions.innerHTML = "Choose point C"
        flashInstructions();
    } else if (step == 0 && C == null) {
        C = [mousePos.x, mousePos.y];
        step = 1;
        step1();
        step = 2;
        instructions.innerHTML = "Choose point D on <r>AB</r>"
        updateConstruction(step2txt)
        flashInstructions();
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
        flashInstructions();
    }

}, false);

document.addEventListener("keypress", function(event) {
    if (event.code == "Space") {

        flashInstructions();
        switch (step) {
            case 3:
                step3();
                step = 4;
                instructions.innerHTML = pressSpaceInstruction
                updateConstruction(step4txt);
                break;
            case 4:
                step4();
                step = 5;
                instructions.innerHTML = pressSpaceInstruction
                updateConstruction(step5txt);
                break;
            case 5:
                step5();
                step = 6;
                instructions.innerHTML = pressSpaceInstruction
                updateConstruction(step6txt);
                break;
            case 6:
                step6();
                step7()
                step = 7;
                instructions.innerHTML = pressSpaceInstruction
                updateConstruction("");
                updateProof(step7txt);
                break;
            case 7:
                step8();
                step = 8;
                instructions.innerHTML = pressSpaceInstruction
                updateProof(step8txt);
                break;
            case 8:
                step9();
                step = 9;
                instructions.innerHTML = pressSpaceInstruction
                updateProof(step9txt);
                break;
            case 9:
                step10();
                step = 10;
                instructions.innerHTML = pressSpaceInstruction
                updateProof(step10txt)
                break;
            case 10:
                // step10();
                step = 11;
                instructions.innerHTML = pressSpaceInstruction
                updateProof("");
                qef.hidden = false;
                break;
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
    proof.innerHTML = "<mark></mark>";
    proofHeading.hidden = true;
    qef.hidden = true;

    ctx.clearRect(0, 0, c.width, c.height);
});