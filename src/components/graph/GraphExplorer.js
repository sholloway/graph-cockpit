/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './GraphExplorer.css';
import Element, {ElementRenderStates} from './element/Element.js';
import GraphCanvas from './canvas/GraphCanvas.js';
import GraphHud from './hud/GraphHud.js';
import GraphStandardLayout from './layout/GraphStandardLayout.js';
import {point, point2Array, diffPoints, box2points, scalar2Point} from './utils/math.js';
import {matrix} from 'numbers';

const ZOOM_FACTOR = 0.1;

class GraphExplorer extends Component{
	constructor(props) {
    super(props);
		this.handleResize = this.handleResize.bind(this);
		this._handleCanvasMouseClick = this._handleCanvasMouseClick.bind(this);
		this._handleZoomInClicked = this._handleZoomInClicked.bind(this);
		this._handleZoomOutClicked = this._handleZoomOutClicked.bind(this);
		this._handelZoomResetClicked = this._handelZoomResetClicked.bind(this);
		this._handleCanvasRightMouseClick = this._handleCanvasRightMouseClick.bind(this);
		this._createItem = this._createItem.bind(this);
		this.state = {
			viewbox: {
				minX: 0,
				minY:	0,
				width: 0,
				height: 0
			},
			graphLayoutViewbox: {
				minX: 0,
				minY:	0,
				width: 0,
				height: 0
			},
			zoom:{
				currentZoom: 1, //How much the graph layout is zoomed in or out. 1 is normal.
				zoomPoint: point(0, 0) //The point the graph layout is zoomed around. Not used when currentZoom is 1;
			},
			contextMenu:{
				display: false,
				mouse: {
					x: 0,
					y: 0
				}
			},
			nodes: this._buildNodes()
		};
	}

	componentWillMount (){
	}

	/*
	https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
	https://facebook.github.io/react/tips/dom-event-listeners.html
	*/
	componentDidMount(){
		this.svg.setAttribute('xmlns', "http://www.w3.org/2000/svg");

		window.addEventListener('resize', this.handleResize);
    var width = this.canvasContainer.clientWidth;
    var height = this.canvasContainer.clientHeight;
		this._setState({
			viewbox: {
				minX: 0,
				minY:	0,
				width: width,
				height: height
			},
			graphLayoutViewbox: {
				minX: 0,
				minY:	0,
				width: width,
				height: height
			}
		});
  }

	componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }

	handleResize(e){
		let width = this.canvasContainer.clientWidth;
    let height = this.canvasContainer.clientHeight;
		let nextState;
		if (this.state.currentZoom != 1){
			let graphLayoutViewbox = this._zoom(this.state.zoom.currentZoom, this.state.zoom.zoomPoint);
			let tempNextState = Object.assign({}, this.state, graphLayoutViewbox);
			nextState = Object.assign({}, tempNextState, {
				viewbox: {
					minX: 0,
					minY:	0,
					width: width,
					height: height
				}
			});
		}else{
			nextState = Object.assign({}, this.state, {
				viewbox: {
					minX: 0,
					minY:	0,
					width: width,
					height: height
				},
				graphLayoutViewbox: {
					minX: 0,
					minY:	0,
					width: width,
					height: height
				}
			});
		}
		this.setState(nextState);
  }

	/*
	Purpose: When the user clicks on the background of the canvas,
	capture the point and convert to SVG coordinates for the standard
	layout viewBox.

	Details:
	- The event X,Y coordinates are in DOM space.
	- Each SVG element has a coordinate system unto itself.
	- Zooming and Panning get the coordinate system of the explorer canvas out
	of sync with the background rectangle and other svg viewports.

	To address the above issues the below code:
	- Gets the mouse position in DOM coordinates.
	- Finds the Coordinate Transformation Matrix (Screen CMT) of the Graph Explorer Canvas,
	since that's the one that will be out of sync due to Zooming & Panning.
	- To correct point is then found by multiplying the DOM coordinates with the
	inverse of the Screen CMT.
	*/
	_handleCanvasMouseClick(event){
		let point = this._dom2SvgCoords(event.target, event.clientX, event.clientY);
		console.log(`SVG Coordinates: ${point.x}, ${point.y}`);
		if (this.state.contextMenu.display == true){
			this._setState({
				contextMenu:{
					display: false
				}
			});
		}
	}

	_dom2SvgCoords(element, domX, domY){
		let screenCTM = element.getScreenCTM();
		let screenPoint = this.graphStandardLayout.graphExplorerCanvas.createSVGPoint();
		screenPoint.x = domX;
		screenPoint.y = domY;
		let svgPoint = screenPoint.matrixTransform(screenCTM.inverse());
		return svgPoint;
	}

	_handleCanvasRightMouseClick(event){
		let point = this._dom2SvgCoords(event.target, event.nativeEvent.clientX, event.nativeEvent.clientY);
		this._setState({
			contextMenu:{
				display: true,
				mouse: {
					x: point.x,
					y: point.y
				}
			}
		});
	}

	_setState(data){
		let nextState = Object.assign({}, this.state, data);
		this.setState(nextState);
	}

	/*
	Purpose: Zoom in by a factor of 10%.

	Details:
	Zooming in reality is scaling the viewbox around the centroid of the viewbox.
	If the centroid is represented by sx, sy then the transformation matrix is:
                            | 1 0 dx |
	Transformation Matrix T = | 0 1 dy |
                            | 0 0 1  |

	Inverse of T is iT

	                   | sx 0 0 |
	Scaling Matrix S = | 0 sy 0 |
	                   | 0 0  1 |

  If the viewbox is V, then scaling around an arbtray point shall be V'.

	V' = T*S*iT*V'
	*/
	_handleZoomInClicked(event){
		let zoomAmount = this.state.zoom.currentZoom + ZOOM_FACTOR;
		let viewBoxPoints = box2points(
			this.state.graphLayoutViewbox.minX,
			this.state.graphLayoutViewbox.minY,
			this.state.graphLayoutViewbox.width,
			this.state.graphLayoutViewbox.height);
		let zoomPoint = diffPoints(viewBoxPoints.maxPoint, viewBoxPoints.minPoint);
		let graphLayoutViewbox = this._zoom(zoomAmount, zoomPoint);
		this._setState(graphLayoutViewbox);
	}

	_createItem(itemType){
		let node = {
			x: this.state.contextMenu.mouse.x,
			y: this.state.contextMenu.mouse.y,
			renderState: ElementRenderStates.IDLE,
			data: { id: this.state.nodes.length + 1}
		};
		let nodes = [...this.state.nodes, node];
		this._setState({
			nodes: nodes,
			contextMenu:{
				display: false
			}
		});
	}

	_zoom(zoomAmount, zoomPoint){
		// 1. Convert the viewbox to be represented by two points. Vmin & Vmax
		// TODO Pull this up to be a paramater.
		let viewBoxPoints = box2points(
			this.state.graphLayoutViewbox.minX,
			this.state.graphLayoutViewbox.minY,
			this.state.graphLayoutViewbox.width,
			this.state.graphLayoutViewbox.height);

		let vMin = viewBoxPoints.minPoint;
		let vMax = viewBoxPoints.maxPoint;

		// 2. Find the point to scale around.
		console.log(`Zoom Point: ${zoomPoint}`);

		// 3. Find the transformation matrix require to transform the zoomPoint to
		// the origin of the viewbox.
		let diff = diffPoints(zoomPoint, vMin);
		console.log(`Difference to the Origin: ${diff}`);

		// 4. Calculate the scaling factor. (Righ now do 10%.)
		let scale = scalar2Point(zoomAmount);

		// 5. Build up the affine transformations and calculate V'
		let mT = [
			[1, 0, diff.x],
			[0, 1, diff.y],
			[0, 0, 1     ]];

		let mS = [
			[scale.x, 0,       1],
			[0,       scale.y, 1],
			[0,       0,       1]];

		// 6. Calculate the new viewbox corners.
		let vPrimeMin = this.scale(point2Array(vMin), mT, mS);
		let vPrimeMax = this.scale(point2Array(vMax), mT, mS);

		// 6. Update the state with the new viewbox.
		let diminsions = diffPoints(vPrimeMax, vPrimeMin);

		let viewBoxChanges = {
			graphLayoutViewbox: {
				minX: vPrimeMin.x,
				minY:	vPrimeMin.y,
				width: diminsions.x,
				height: diminsions.y
			},
			zoom: {
				currentZoom: zoomAmount,
				zoomPoint: zoomPoint
			}
		};
		return viewBoxChanges;
	}

	scale(p, translate, scale){
		console.group();
		console.log(`Scale Point: ${p}`);
		console.log(`Translate Matrix: ${translate}`);
		console.log(`Scale Matrix: ${scale}`);

		// 1. Translate to origin.
		let movedPoint = matrix.multiply(translate, p);
		console.log(`Moved Point: ${movedPoint}`);

		// 2. Scale around the origin.
		let scaledPoint = matrix.multiply(scale, movedPoint);
		console.log(`Scaled Point: ${scaledPoint}`);

		// 3. Translate back.
		let inverseMove = matrix.inverse(translate);
		console.log(`Inverse Matrix: ${inverseMove}`);

		let newPoint = matrix.multiply(inverseMove, scaledPoint);
		console.log(`New Point: ${newPoint}`);
		console.groupEnd();
		return point(newPoint[0][0], newPoint[1][0]);
	}

	_handleZoomOutClicked(event){
		console.log("Zoom Out");
		let zoomAmount = this.state.zoom.currentZoom - ZOOM_FACTOR;
		let viewBoxPoints = box2points(
			this.state.graphLayoutViewbox.minX,
			this.state.graphLayoutViewbox.minY,
			this.state.graphLayoutViewbox.width,
			this.state.graphLayoutViewbox.height);
		let zoomPoint = diffPoints(viewBoxPoints.maxPoint, viewBoxPoints.minPoint);
		let graphLayoutViewbox = this._zoom(zoomAmount, zoomPoint);
		this._setState(graphLayoutViewbox);
	}

	_handelZoomResetClicked(event){
		let viewBoxChanges = this._resetZoom();
		this._setState(viewBoxChanges)
	}

	_resetZoom(){
		let viewBoxChanges = {
			graphLayoutViewbox: {
				minX: this.state.viewbox.minX,
				minY:	this.state.viewbox.minY,
				width: this.state.viewbox.width,
				height: this.state.viewbox.height
			},
			zoom: {
				currentZoom: 1,
				zoomPoint: point(0,0)
			}
		};
		return viewBoxChanges;
	}

	/*
	SVG ViewBox Notes:
	https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions
	Width & Height are the size of the canvas. ViewBox is how much is visible.

	https://css-tricks.com/mega-list-svg-information/
	https://sarasoueidan.com/blog/svg-coordinate-systems/

	SVG Mouse Events
		click
		mousedown
		mouseup
		mouseover
		mousemove
		mouseout

	Pan & Zoom Solution
	http://www.petercollingridge.co.uk/interactive-svg-components/pan-and-zoom-control
	https://stackoverflow.com/questions/10298658/mouse-position-inside-autoscaled-svg

	Getting SVG Coordinates From Mouse
	http://svgdiscovery.com/E/Ed.htm
	https://msdn.microsoft.com/en-us/library/hh535760(v=vs.85).aspx

	Clicking a Path
	https://stackoverflow.com/questions/33878115/react-svg-how-do-i-make-path-support-onclick

	Current Problem:
	I can't seem to get the nested svg elements to have a size. They render
	their contents but they don't display a background or have a clickable
	surface. Their elements allow clicking.

	Possible Solutions:
	1. Create a Rect for the background and have the click handler attached to it.
	2. Abandon using multiple viewports for groups. (Will complicate panning & zooming.)
	3. Reach out on stackoverflow.
	*/
	render(){
		let vb = this._buildViewBox();
		return(
			<div className="graphExplorer">
				<p>Graph Explorer</p>
				<div ref={(ref) => this.canvasContainer = ref}
					className="graphExplorerCanvasContainer">
					<svg className="graphExplorerTopSVG"
						ref={(ref) => this.svg = ref}
						version="1.1" viewBox={vb}>
						<GraphCanvas minX={this.state.viewbox.minX}
							minY={this.state.viewbox.minX}
							width={this.state.viewbox.width}
							height={this.state.viewbox.height}
							displayContextMenu={this.state.contextMenu.display}
							handleMouseClick={this._handleCanvasMouseClick}
							handleRightMouseClick={this._handleCanvasRightMouseClick}
							createItemHandler={this._createItem} />
						<GraphStandardLayout
							ref={(ref) => this.graphStandardLayout = ref}
							minX={this.state.graphLayoutViewbox.minX}
							minY={this.state.graphLayoutViewbox.minX}
							width={this.state.graphLayoutViewbox.width}
							height={this.state.graphLayoutViewbox.height}
							dataset={this.state.nodes}/>
						<GraphHud minX={this.state.viewbox.minX}
							minY={this.state.viewbox.minX}
							width={this.state.viewbox.width}
							height={this.state.viewbox.height}
							handleZoomInClick={this._handleZoomInClicked}
							handleZoomOutClick={this._handleZoomOutClicked}
							handleZoomResetClicked = {this._handelZoomResetClicked}/>
					</svg>
				</div>
			</div>
		);
	}
	/*
	*/

	_buildViewBox(){
		let vb = `${this.state.viewbox.minX} ${this.state.viewbox.minY} ${this.state.viewbox.width} ${this.state.viewbox.height}`;
		return vb;
	}

	_buildNodes(){
		let nodes = [];
		nodes.push({
			x: 100, y: 100,
			renderState: ElementRenderStates.IDLE,
			data: { id: 1}
		});

		nodes.push({
			x: 300, y: 300,
			renderState: ElementRenderStates.SELECTED,
			data: { id: 2}
		});

		nodes.push({
			x: 500, y: 500,
			renderState: ElementRenderStates.UPSTREAM,
			data: { id: 3}
		});

		nodes.push({
			x: 700, y: 700,
			renderState: ElementRenderStates.DOWNSTREAM,
			data: { id: 4}
		});
		return nodes;
	}
}
export default GraphExplorer;
