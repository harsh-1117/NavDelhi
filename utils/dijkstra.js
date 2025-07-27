exports.dijkstra = (graph, source, destination) => {
  const queue = [];
  const visited = new Set();
  const distances = {};
  const previous = {};
  const lineUsed = {};

  // Init
  for (let station in graph) {
    distances[station] = Infinity;
    previous[station] = null;
    lineUsed[station] = null;
  }

  distances[source] = 0;
  queue.push({ station: source, distance: 0, line: null });

  while (queue.length > 0) {
    // Always pick station with smallest distance
    queue.sort((a, b) => a.distance - b.distance);
    const { station, distance, line } = queue.shift();

    if (visited.has(station)) continue;
    visited.add(station);

    if (station === destination) break;

    for (let neighbor of graph[station]) {
      const { station: nextStation, time, line: nextLine } = neighbor;

      const isLineChange = line && line !== nextLine;
      const lineChangePenalty = isLineChange ? 5 : 0; // 5 min penalty

      const totalTime = distance + time + lineChangePenalty;

      if (totalTime < distances[nextStation]) {
        distances[nextStation] = totalTime;
        previous[nextStation] = station;
        lineUsed[nextStation] = nextLine;
        queue.push({ station: nextStation, distance: totalTime, line: nextLine });
      }
    }
  }

  // Reconstruct path
  // const path = [];
  // let current = destination;
  // while (current) {
  //   path.unshift({ station: current, line: lineUsed[current] });
  //   current = previous[current];
  // }

  // Reconstruct path
  const path = [];
  let current = destination;
  while (current) {
    const prev = previous[current];
    const line = lineUsed[current];

    // For the starting station, infer the line from the next node if not available
    if (!prev && !line && graph[current]?.length) {
      // Find the first neighbor that matches the next station
      const nextStation = path.length > 0 ? path[0].station : null;
      const neighbor = graph[current].find(n => n.station === nextStation);
      path.unshift({ station: current, line: neighbor ? neighbor.line : null });
    } else {
      path.unshift({ station: current, line });
    }

  current = prev;
}


  // Count actual interchanges in the final path
  let interchanges = 0;
  for (let i = 1; i < path.length; i++) {
    const prevLine = path[i - 1].line;
    const currLine = path[i].line;

    if (prevLine && currLine && prevLine !== currLine) {
      interchanges++;
      path[i].interchange = true;  // Tag station with interchange flag
    }
  }

  // Calculate total time and cost
  const totalHops = path.length - 1;
  const travelMinutes = totalHops * 2 + interchanges * 5; // 2 mins/hop + 5 mins/interchange
  // const cost = totalHops * 10;
  let cost = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i].station;
    const next = path[i + 1].station;
    const edge = graph[current].find(conn => conn.station === next);
    if (edge) {
      cost += edge.cost;
    }
  }


  // Convert minutes to HH:MM
  // function formatTime(minutes) {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  // }
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''}`;
  }



  return {
    path,
    travelTime: formatTime(travelMinutes),
    cost,
    interchanges
  };
};
