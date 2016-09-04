/** @module graph/utils/math */

/** Create a Point from two numbers.
*/
export function point(x, y){
	return {x: x, y: y};
}

/** Build an array from a point.
*/
export function point2Array(point){
	return [[point.x], [point.y], [1]];
}

/** Create a Point P' where P' = P1 - P2.
*/
export function diffPoints(p1, p2){
	return point(p1.x - p2.x, p1.y - p2.y);
}

/** Given a box, find it's min and max points.
@param {Number} x - The x coordinate of the upper left point.
@param {Number} y - The y coordinate of the upper left point.
@param {Number} width - The length on the x-axis of the box.
@param {Number} height - The length on the y-axis of the box.
@return {Object} An object containing minPoint and maxPoint.
*/
export function box2points(x, y, width, height){
	return {
		minPoint: point(x, y),
		maxPoint: point(x + width, y + height)
	};
}

/** Convert a number to a uniform point.
@param {Number} n - The scalar to convert.
@returns {Object} A point with the x and y values set to n.
*/
export function scalar2Point(n){
	return point(n,n)
}
