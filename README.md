# BrainJsVisualizer
BrainJS Neural Network visulization

```
//Create BrainJS net
const net = new brain.NeuralNetwork({ hiddenLayers: [8, 5, 3] });
net.train(trainingData});

//Visualize
const wrapper = document.getElementById('myCanvasWrapper');
const visualizer = new BrainJsVisualizer(net, wrapper);
visualizer.render();
```

<img src="https://github.com/drumrock/BrainJsVisualizer/blob/master/screenshots/visualize-01.png" />

<img src="https://github.com/drumrock/BrainJsVisualizer/blob/master/screenshots/visualize-02.png" />

<img src="https://github.com/drumrock/BrainJsVisualizer/blob/master/screenshots/visualize-03.png" />

<img src="https://github.com/drumrock/BrainJsVisualizer/blob/master/screenshots/visualize-04.png" />


