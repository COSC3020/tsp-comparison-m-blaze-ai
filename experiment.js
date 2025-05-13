const { tsp_hk } = require('./tsp_hk.code');
const { tsp_ls } = require('./tsp_ls.code');
const { performance } = require('perf_hooks');
const fs = require('fs');


function generateCities(n) {
  return Array.from({ length: n }, () => ({
    x: Math.random() * 1000,
    y: Math.random() * 1000
  }));
}


function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function createDistanceMatrix(cities) {
  const n = cities.length;
  const dist = Array.from({ length: n }, () => Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dist[i][j] = distance(cities[i], cities[j]);
    }
  }
  return dist;
}


function runTrial(n) {
  const cities = generateCities(n);
  const distMatrix = createDistanceMatrix(cities);

  let hkStart = performance.now();
  const hkLength = tsp_hk(distMatrix);
  let hkEnd = performance.now();
  const hkTime = (hkEnd - hkStart) / 1000; // seconds

  let lsStart = performance.now();
  const lsLength = tsp_ls(distMatrix);
  let lsEnd = performance.now();
  const lsTime = (lsEnd - lsStart) / 1000;

  return {
    n,
    hkTime,
    hkLength,
    lsTime,
    lsLength
  };
}

async function runExperiments({
  from = 4,
  to = 20,
  step = 2,
  trialsPerN = 3,
  outputFile = 'tsp_results.csv'
} = {}) {
  const results = [];


  results.push([
    'n',
    'hkTime_avg', 'hkLength_avg',
    'lsTime_avg', 'lsLength_avg'
  ].join(','));

  for (let n = from; n <= to; n += step) {
    console.log(`Running n = ${n}`);
    let hkTotalTime = 0, hkTotalLength = 0;
    let lsTotalTime = 0, lsTotalLength = 0;

    for (let i = 0; i < trialsPerN; i++) {
      const result = runTrial(n);
      hkTotalTime += result.hkTime;
      hkTotalLength += result.hkLength;
      lsTotalTime += result.lsTime;
      lsTotalLength += result.lsLength;
    }

    const hkTimeAvg = hkTotalTime / trialsPerN;
    const hkLengthAvg = hkTotalLength / trialsPerN;
    const lsTimeAvg = lsTotalTime / trialsPerN;
    const lsLengthAvg = lsTotalLength / trialsPerN;

    results.push([
      n,
      hkTimeAvg.toFixed(5), hkLengthAvg.toFixed(2),
      lsTimeAvg.toFixed(5), lsLengthAvg.toFixed(2)
    ].join(','));
  }

  fs.writeFileSync(outputFile, results.join('\n'));
  console.log(`Results written to ${outputFile}`);
}

runExperiments({
  from: 4,
  to: 22,
  step: 2,
  trialsPerN: 3,
  outputFile: 'tsp_results.csv'
});
