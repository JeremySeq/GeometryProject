c.width = window.innerWidth/2;
c.height = window.innerHeight - window.innerHeight/5;
if (c.width < 400) {
    c.width = 400;
}
ctx.lineWidth = 2;
ctx.strokeStyle = "gray";
ctx.fillStyle = "gray";

step = 0;
A = null;
B = null;
C = null;

function mobileAndTabletCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

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

pressSpaceInstruction = "Click here for next step";

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

points = {}; // contains coordinates of point with the letter as the key
lines = []; // contains string of the two point labels that make the line
circles = []; // contains string of two point labels, first is the center, second is the radius
canvasMousePos = [0, 0];


instructions.innerHTML = "Choose point A"
updateConstruction(step1txt);

c.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (step == 0 && A == null) {
        A = [mousePos.x, mousePos.y];
        drawPoint(A[0], A[1]);
        points["A"] = A;
        instructions.innerHTML = "Choose point B"
        flashInstructions();
    } else if (step == 0 && B == null) {
        B = [mousePos.x, mousePos.y];
        points["B"] = B;
        lines.push("AB");
        instructions.innerHTML = "Choose point C"
        flashInstructions();
    } else if (step == 0 && C == null) {
        C = [mousePos.x, mousePos.y];
        points["C"] = C;
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

function nextStep() {
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
            step = 11;
            instructions.innerHTML = pressSpaceInstruction
            updateProof("");
            qef.hidden = false;
            break;
    }
}

instructions.addEventListener("click", function(e) {
    nextStep();
});

document.addEventListener("keypress", function(event) {
    if (event.code == "Space") {
        instructions.click();
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

    points = {};
    lines = [];
    circles = [];
});

canvas.addEventListener("mousemove", function(e) {
    canvasMousePos = getMousePos(canvas, e);
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

    if (step == 0) {
        canvas.style.cursor = "none";
    } else {
        canvas.style.cursor = "auto";
    }

    if (!mobileAndTabletCheck()) {
    if (step == 0) {
        drawPoint(canvasMousePos.x, canvasMousePos.y)

        if (A == null) {
            labelPoint([canvasMousePos.x, canvasMousePos.y], "A");
        } else if (B == null) {
            labelPoint([canvasMousePos.x, canvasMousePos.y], "B");
            drawLine(A, [canvasMousePos.x, canvasMousePos.y]);
        } else if (C == null) {
            labelPoint([canvasMousePos.x, canvasMousePos.y], "C");
            drawLine(B, [canvasMousePos.x, canvasMousePos.y]);
        }
    } else if (step == 2) {
        tempD = closestPointOnLine([canvasMousePos.x, canvasMousePos.y], [A, B]);
        labelPoint(tempD, "D");
    }
    }
    
    if (step >= 7) {
        step7();
    }
    if (step >= 8) {
        step8();
    }
    if (step >= 9) {
        step9();
    }
    if (step >= 10) {
        step10();
    }

    // draw points
    for (var key in points) {
        labelPoint(points[key], key);
    }

}

animate();