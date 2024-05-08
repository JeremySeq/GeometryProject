// given
D = [200, 300]
E = [400, 300]

function prop1() {
    p1_step1();
    p1_step2();
    p1_step3();
    p1_step4();
    p1_step5();
}

function p1_step1() {
    // step 1: given line DE
}

function p1_step2() {
    // step 2: draw circle, center D, radius DE
    dist = distance(D, E);
    // drawCircle(D[0], D[1], dist);
}

function p1_step3() {
    // step 3: draw circle, center E, radius ED
    dist = distance(D, E);
    // drawCircle(E[0], E[1], dist);
}

function p1_step4() {
    // step 4: call the points of intersection F and G
    dist = distance(D, E);
    intersec = get_intersections(D[0], D[1], dist, E[0], E[1], dist);
    intersec1 = [intersec[0], intersec[1]]
    intersec2 = [intersec[2], intersec[3]]

    
    distFromB1 = distance(intersec1, B);
    distFromB2 = distance(intersec2, B);


    // choose the farthest point from B (to make it look better)
    if (distFromB1 > distFromB2) {
        F = intersec1;
    } else {
        F = intersec2;
    }
    points["F"] = F;
}

function p1_step5() {
    // step 5: join AC, BC and AD, BD
    lines.push("DF");
    lines.push("EF");
}
