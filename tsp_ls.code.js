function tsp_ls(distance_matrix) {
    const n = distance_matrix.length;
    if (n <= 1)
        return 0;

    function tourDistance(route) {
        let distance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            distance += distance_matrix[route[i]][route[i +1]];
        }
        return distance;
    }

    function twoOptSwap(route, i, k) {
        return [
            ...route.slice(0, i),
            ...route.slice(i, k + 1).reverse(),
            ...route.slice(k+1)
        ];
    }

    let currentRoute = Array.from({ length: n}, (_, i) => i);
    for (let i = n - 1; i> 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]];
    }

    let currentDistance = tourDistance(currentRoute);

    const MAX_NO_IMPROVEMENT = 1000;
    let noImprovement = 0;

    while (noImprovement < MAX_NO_IMPROVEMENT) {
        const i = Math.floor(Math.random() * (n-1));
        const k = i + 1 + Math.floor(Math.random() * (n - i -1));
        const newRoute = twoOptSwap(currentRoute, i, k);
        const newDistance = tourDistance(newRoute);

        if (newDistance < currentDistance) {
            currentRoute = newRoute;
            currentDistance = newDistance;
            noImprovement = 0;
        }
        else {
            noImprovement++;
        }
    }
    return currentDistance;
} module.exports = { tsp_ls };