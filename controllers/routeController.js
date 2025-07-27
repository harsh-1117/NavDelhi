const metroGraph = require('../data/metroGraph.json');
const { dijkstra } = require('../utils/dijkstra');

exports.findShortestRoute = (req, res) => {
  const { source, destination } = req.body;

  if (!metroGraph[source] || !metroGraph[destination]) {
    return res.status(400).json({ error: 'Invalid source or destination' });
  }

  const result = dijkstra(metroGraph, source, destination);
  res.json(result);
};
