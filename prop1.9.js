// given
A = [200, 300]
B = [400, 300]
C = [600, 100]


D = [600, 100]


function step1() {
    // step 1: given angle ABC
    drawLine(A, B);
    drawLine(B, C);
    labelPoint(A, "A");
    labelPoint(B, "B");
    labelPoint(C, "C");
}

function step2() {
    // step 2: take random point D on AB
    labelPoint(D, "D");
}

function step3() {
    // step 3: cut BE from BC equal to BD
    dist = distance(B, D);

    // normalize vector from B to C
    BCvec = [C[0] - B[0], C[1] - B[1]];
    BCdist = distance(B, C);
    BCvec = [BCvec[0]/BCdist, BCvec[1]/BCdist];

    E = [B[0] + BCvec[0]*dist, B[1] + BCvec[1]*dist];
    labelPoint(E, "E");
}

function step4() {
    // step 4: join DE
    drawLine(D, E);
}

function step5() {
    // step 5: create equilateral triangle DEF on DE
    prop1();
}

function step6() {
    // step 6: join BF
    drawLine(B, F);
}

// PROOF
function step7() {
    // step 7: BD = BE
    highlightLine(B, D, "yellow");
    highlightLine(B, E, "yellow");
}

function step8() {
    // step 8: BF is common
    highlightLine(B, F, "green");
}

function step9() {
    // step 9: DF = EF
    highlightLine(D, F, "red");
    highlightLine(E, F, "red");
}

function step10() {
    // step 10: △BEF = △BDF and ∠DBF = ∠EBF
    prevLineWidth = ctx.lineWidth;
    ctx.lineWidth = 3;
    drawAngleArc(D, B, F, 'purple');
    drawAngleArc(E, B, F, 'purple');
    ctx.lineWidth = prevLineWidth;
}
