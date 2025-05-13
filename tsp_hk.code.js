function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;
    if (n <= 1) 
        return 0;

    let minTourLength = Infinity;


    const memo = Array.from({ length: 1 << n }, () => Array(n).fill(Infinity));

    function heldKarp(subset, last) {
        if (subset === (1 << last)) {
            return distance_matrix[0][last];
        }

        if (memo[subset][last] !== Infinity) {
            return memo[subset][last];
        }

        const subsetWithoutLast = subset ^ (1 << last);
        let minCost = Infinity;


        for (let k = 0; k < n; k++) {
            if (k !== last && (subset & (1 << k))) {
                const cost = heldKarp(subsetWithoutLast, k) + distance_matrix[k][last];
                minCost = Math.min(minCost, cost);
            }
        }


        memo[subset][last] = minCost;
        return minCost;
    }

    const fullSet = (1 << n) - 1;
    for (let end = 1; end < n; end++) {
        const tourLength = heldKarp(fullSet, end);
        minTourLength = Math.min(minTourLength, tourLength);
    }

    return minTourLength;
} module.exports = { tsp_hk };