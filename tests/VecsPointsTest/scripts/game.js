
function gameStart()
{
    var v;
    var p;

    v = new Vector2d(1, 1);
    document.write("<h2>Vectors</h2><br/>");
    // Normal
    document.write("<br/><h3>Normal</h1>");
    document.write(v.makeArray() + " + (1, 0) --> " + v.add(1, 0).makeArray() + "<br/>");
    document.write(v.makeArray() + " + (1, 1) --> " + v.add(1, 1).makeArray() + "<br/>");
    document.write(v.makeArray() + " - (2, 1) --> " + v.sub(2, 1).makeArray() + "<br/>");
    document.write(v.makeArray() + " - (0, 0) --> " + v.sub(0, 0).makeArray() + "<br/>");
    // Via vector
    document.write("<br/><h3>Via vector</h1>");
    document.write(v.makeArray() + " + via vector (1, 0) --> " + v.addVector(new Vector2d(1, 0)).makeArray() + "<br/>");
    document.write(v.makeArray() + " + via vector (1, 1) --> " + v.addVector(new Vector2d(1, 1)).makeArray() + "<br/>");
    document.write(v.makeArray() + " - via vector (2, 1) --> " + v.subVector(new Vector2d(2, 1)).makeArray() + "<br/>");
    document.write(v.makeArray() + " - via vector (0, 0) --> " + v.subVector(new Vector2d(0, 0)).makeArray() + "<br/>");
    // Via Vector Maker
    document.write("<br/><h3>Via vector maker</h1>");
    document.write(v.makeArray() + " + via clone (1, 0) --> " + Vector.addVector(v, new Vector2d(1, 0)).makeArray() + "<br/>");
    document.write(v.makeArray() + " + via clone (1, 1) --> " + Vector.addVector(v, new Vector2d(1, 1)).makeArray() + "<br/>");
    document.write(v.makeArray() + " - via clone (2, 1) --> " + Vector.subVector(v, new Vector2d(2, 1)).makeArray() + "<br/>");
    document.write(v.makeArray() + " - via clone (0, 0) --> " + Vector.subVector(v, new Vector2d(0, 0)).makeArray() + "<br/>");

    p = new Point2d(0, 0);

    document.write("<h2>Point</h2>");

    document.write("cooardinates: " + p.vec.makeArray() + "<br/>");
    p.vec = v;
    document.write("after setting vec to vector (1, 1): " + p.vec.makeArray() + "<br/>");
    document.write("after adding vec to vector (1, 1): " + p.vec.addVector(v).makeArray() + "<br/>");
    document.write("distance to (5, 3): " + p.distanceTo(new Point2d(5,3)) + "<br/>");
    p.setX(0);
    p.setY(0);
    document.write("fetching, after setting cooardinates to (0, 0): " + p.getX() +", " + p.getY() + "<br/>")
}
