











function BrainJsVisualizer(net, htmlParentNode){
	this._net = net;
	this._inputLayer = this._net.inputLookup;
	this._outputLayer = this._net.outputs;
	this._sizes = this._net.sizes;
	this._htmlParentNode = htmlParentNode;
	this._canvas = null;
	this._context = null;
	
	this._colors = {
		background: 'white',
		nodeOutline: 'black',
		inputLayerNode: 'blue',
		outputLayerNode: 'green',
		hiddenLayerNode: 'orange',
		forwardArrow: 'black',
		backArrow: 'violet'
	};
	
	
	
	
	this._createCanvas = function(){
		this._canvas = document.createElement('canvas');
		this._canvas.width = 400;
		this._canvas.height = 400;
		this._canvas.style.background = this._colors.background;
	
		if(typeof(this._htmlParentNode) == 'object'){
			this._htmlParentNode.appendChild(this._canvas);
			this._context = this._canvas.getContext('2d');
			return true;
		}
		
		return false;
	};
	
	
	this._drawNode = function(x, y, nodeRadius){
		this._context.beginPath();
		this._context.strokeStyle = this._colors.nodeOutline;
		this._context.lineWidth = 5;
		this._context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
		this._context.stroke();
		this._context.fillStyle = this._colors.hiddenLayerNode;
		this._context.fill();
		this._context.closePath();
	};
	
	
	this._drawArrow = function(node1, node2, weight){
		let x1 = node1.x, y1 = node1.y, x2 = node2.x, y2 = node2.y;
		
		this._context.beginPath();
		this._context.lineWidth = 1;
		
		this._context.fillStyle = `rgba(0,0,0, ${weight})`;
		this._context.strokeStyle = `rgba(0,0,0, ${weight})`;

		this._context.moveTo(x1, y1);
		this._context.lineTo(x2, y2);
		
		this._context.stroke();
		this._context.closePath();
	};
	
	
	
	
	//TODO: Clean up
	this._getNode = function(layerId, nodeId){
		let maxLayerSize = 0;
		for(let size of this._sizes){
			maxLayerSize = size > maxLayerSize ? size : maxLayerSize;
		}
		const stepX = Math.round(this._canvas.width / (this._sizes.length));
		const stepY = Math.round(this._canvas.height / (maxLayerSize + 1));
		let nodeRadius = 15;
		if(nodeRadius < stepY){
			nodeRadius = stepY * 0.25;
		}
		
		//TODO: these two (2 and 1) are some strange heuristics, do something better
		const offsetX = stepX - nodeRadius * 2;
		const offsetY = stepY - nodeRadius * 1;
		
		
		for(let layer in this._sizes){
			//center vertically
			let rowOffsetY = ((maxLayerSize - this._sizes[layer]) / 2 * stepY);

			for(let node = 0; node < this._sizes[layer]; node++){
				if(layer == layerId && node == nodeId){
					return {
						x: layer * stepX + offsetX,
						y: node * stepY + offsetY + rowOffsetY,
						radius: nodeRadius
					}
				}
			}
		}
		
		return false;
	};
	
	
	this.render = function(){
		console.log(this._net);
		console.log(this._net.weights);
		
		if(this._canvas == null || this._context == null){
			this._createCanvas();
		}
		
		console.log(this._canvas);
		console.log(this._context);
		
		
		//We draw arrows first
		for(let layerIndex in this._sizes){
			for(let nodeIndex = 0; nodeIndex < this._sizes[layerIndex]; nodeIndex++){
				const node = this._getNode(layerIndex, nodeIndex);
				let layerIndex2 = layerIndex * 1 + 1;
				for(let nodeIndex2 = 0; nodeIndex2 < this._sizes[layerIndex2]; nodeIndex2++){
					const node2 = this._getNode(layerIndex2, nodeIndex2);
					this._drawArrow(node, node2, Math.abs(this._net.weights[layerIndex2][nodeIndex2][nodeIndex]) / 2);
				}
			}
			
			if(layerIndex >= this._sizes.length - 2){
				break;
			}
		}
		
		//So they are overlapped by nodes (maybe change this behaviour in future)
		for(let layerIndex in this._sizes){
			for(let nodeIndex = 0; nodeIndex < this._sizes[layerIndex]; nodeIndex++){
				const node = this._getNode(layerIndex, nodeIndex);
				this._drawNode(node.x, node.y, node.radius);
			}
		}
	};
};



