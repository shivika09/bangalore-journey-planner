export function findRoute(start,end,routes){

    if(start === end){
        return [start];
    }
    
    const queue = [];
    const visited = [];
    const parent = {};
    const finalRoute = [end];
    

    queue.push(start);
    visited.push(start);

    while (queue.length>0){
        const currentStop = queue.shift();

        const neighbors = routes[currentStop];

        if (!neighbors){
            continue;
        }

        for(const neighbor of neighbors){
            if(!(visited.includes(neighbor.stop))){

                parent[neighbor.stop] = currentStop;

                if(neighbor.stop === end){
                    let current = end;
                    while(current != start){
                        finalRoute.push(parent[current]);
                        current = parent[current];
                    }
                    return finalRoute.reverse();
                }
                
                visited.push(neighbor.stop);
                queue.push(neighbor.stop);
            }
        }

    }
    return null;
}

export function findAltRoute(start,end,routes){

    if(start === end){
        return [start];
    }
    
    const queue = [];
    const visited = [];
    const parent = {};
    const finalRoute = [end];
    const busUsed = {};
    const minChanges = {};

    queue.push(start);
    visited.push(start);
    busUsed[start] = null;
    minChanges[start] = 0;
   

    while (queue.length>0){
        const currentStop = queue.shift();

        const neighbors = routes[currentStop];

        const currentBus = busUsed[currentStop];

        if (!neighbors){
            continue;
        }

        for(const neighbor of neighbors){
            
            const newBus = neighbor.route;
            const newChanges = (currentBus !== null && currentBus != newBus) ? minChanges[currentStop] + 1 : minChanges[currentStop];

            if((!(visited.includes(neighbor.stop)))|| newChanges < minChanges[neighbor.stop]){

                minChanges[neighbor.stop] = newChanges;

                busUsed[neighbor.stop] = newBus;

                parent[neighbor.stop] = currentStop;

                if(neighbor.stop === end){
                    continue;
                }
                
                visited.push(neighbor.stop);
                queue.push(neighbor.stop);
            }
        }

    }
    if(!parent[end]){
        return null;
    }

    let current = end;
    while(current != start){
        finalRoute.push(parent[current]);
        current = parent[current];
    }
    return finalRoute.reverse();
}

export function findRouteLeastTime(start,end,routes){
    const distance = {};
    const parent = {};
    const visited = [];
    const finalRoute = [];

    let currentStop = start;
    distance[currentStop] = 0;

    while(true){
        if (!currentStop){
            break;
        }

        if (currentStop === end){
            let current = end;

            while(current != null){
                finalRoute.push(current);
                if (current === start){
                    break;
                }
                current = parent[current];
            }
            return finalRoute.reverse();
        }
        
        const neighbors = routes[currentStop];

        if (neighbors){
            for (const neighbor of neighbors){
                let newCost = 0;
                if(!visited.includes(neighbor.stop)){
                    newCost = distance[currentStop] + neighbor.time;
                    if(distance[neighbor.stop] != null){
                        if(newCost < distance[neighbor.stop]){
                            distance[neighbor.stop] = newCost;
                            parent[neighbor.stop] = currentStop;
                        }
                    }
                    else{
                        distance[neighbor.stop] = newCost;
                        parent[neighbor.stop] = currentStop;
                    }  
                }
            }
        }
        

        visited.push(currentStop);

        let smallestDistance = Infinity;
        let nextStop = null;
        for(const stop in distance){
            if(!visited.includes(stop)){
                if(distance[stop] < smallestDistance){
                    smallestDistance = distance[stop];
                    nextStop = stop;
                }
            }
        }
        currentStop = nextStop;

    }
    return null;
}

export function altfindRouteLeastChange(start,end,routes){
    const change = {};
    const parent = {};
    const visited = [];
    const finalRoute = [];
    const busUsed = {};

    let currentStop = start;
    busUsed[start] =  null;
    let currentBus = null;
    change[currentStop] = 0;

    while(true){
        if (!currentStop){
            break;
        }

        if (currentStop === end){
            let current = end;

            while(current != null){
                finalRoute.push(current);
                if (current === start){
                    break;
                }
                current = parent[current];
            }
            return finalRoute.reverse();
        }
        
        const neighbors = routes[currentStop];

        if (neighbors){
            for (const neighbor of neighbors){
                let newChange = 0;
                let newBus = neighbor.route;
                if(!visited.includes(neighbor.stop)){
                    if(currentBus!==null){
                        newChange = change[currentStop] + ((newBus === currentBus)?0:1);
                    }
                    else{
                        newChange = change[currentStop];
                    }
                    
                    if(change[neighbor.stop] != null){
                        if(newChange < change[neighbor.stop]){
                            change[neighbor.stop] = newChange;
                            parent[neighbor.stop] = currentStop;
                            busUsed[neighbor.stop] = newBus;
                        }
                    }
                    else{
                        change[neighbor.stop] = newChange;
                        parent[neighbor.stop] = currentStop;
                        busUsed[neighbor.stop] = newBus;

                    }  
                }
            }
        }
        

        visited.push(currentStop);

        let smallestChange = Infinity;
        let nextStop = null;
        for(const stop in change){
            if(!visited.includes(stop)){
                if(change[stop] < smallestChange){
                    smallestChange = change[stop];
                    nextStop = stop;
                }
            }
        }
        currentStop = nextStop;
        currentBus = busUsed[currentStop];

    }
    return null;
}

export function findRouteLeastFare(start,end,routes){
    const cost = {};
    const parent = {};
    const visited = [];
    const finalRoute = [];

    let currentStop = start;
    cost[currentStop] = 0;

    while(true){
        if (!currentStop){
            break;
        }

        if (currentStop === end){
            let current = end;

            while(current != null){
                finalRoute.push(current);
                if (current === start){
                    break;
                }
                current = parent[current];
            }
            return finalRoute.reverse();
        }
        
        const neighbors = routes[currentStop];

        if (neighbors){
            for (const neighbor of neighbors){
                let newCost = 0;
                if(!visited.includes(neighbor.stop)){
                    newCost = cost[currentStop] + neighbor.fare;
                    if(cost[neighbor.stop] != null){
                        if(newCost < cost[neighbor.stop]){
                            cost[neighbor.stop] = newCost;
                            parent[neighbor.stop] = currentStop;
                        }
                    }
                    else{
                        cost[neighbor.stop] = newCost;
                        parent[neighbor.stop] = currentStop;
                    }  
                }
            }
        }
        

        visited.push(currentStop);

        let smallestCost = Infinity;
        let nextStop = null;
        for(const stop in cost){
            if(!visited.includes(stop)){
                if(cost[stop] < smallestCost){
                    smallestCost = cost[stop];
                    nextStop = stop;
                }
            }
        }
        currentStop = nextStop;

    }
    return null;
}

export function findRouteLeastChange(start,end,routes){
    const change = {};
    const parent = {};
    const visited = {};
    const finalRoute = [];
    const busRoute = [];

    let currentStop = start;
    let currentBus = null;
    change[currentStop] = {
        null : 0
    };

    while(true){
        if (!currentStop){
            break;
        }

        if (currentStop === end){
            let current = end;
            let bus = currentBus;

            while(current != null){
                finalRoute.push(current);
                if (current!= start && bus != null){
                    busRoute.unshift(bus);
                }
                if (current === start){
                    break;
                }
                const previous = parent[current][bus];

                current = previous.stop;
                bus = previous.bus;
            }
            return {path: finalRoute.reverse(),
                    buses: busRoute
            };
        }
        
        const neighbors = routes[currentStop];

        if (neighbors){
            for (const neighbor of neighbors){
                let newChange = 0;
                let newBus = neighbor.route;
                if(!(neighbor.stop in visited) || (stop in visited && !visited[stop].includes(newBus))){
                    if(currentBus!==null){
                        newChange = change[currentStop][currentBus] + ((newBus === currentBus)?0:1);
                    }
                    else{
                        newChange = 0;
                    }

                    if (!(neighbor.stop in change)){
                        change[neighbor.stop] = {};
                    }

                    if (!(neighbor.stop in parent)) {
                        parent[neighbor.stop] = {};
                    }
                    
                    if(!(newBus in change[neighbor.stop])){
                        change[neighbor.stop][newBus] = newChange;
                        parent[neighbor.stop][newBus] = {
                                                        "stop" : currentStop,
                                                        "bus" : currentBus};
                    }

                    else if(newChange < change[neighbor.stop][newBus]){
                            change[neighbor.stop][newBus] = newChange;
                            parent[neighbor.stop][newBus] = {
                                                        "stop" : currentStop,
                                                        "bus" : currentBus};
                    } 
                }
            }
        }
        if (!(currentStop in visited)){
            visited[currentStop] = [];
        }

        visited[currentStop].push(currentBus);

        let smallestChange = Infinity;
        let nextStop = null;
        let nextBus = null;
        for(const stop in change){
            for(const bus in change[stop]){
                if(!(stop in visited) || (stop in visited && !visited[stop].includes(bus))){
                    if(change[stop][bus] < smallestChange){
                        smallestChange = change[stop][bus];
                        nextStop = stop;
                        nextBus = bus;
                    }
                    
            }
            
                
            }
        }
        currentStop = nextStop;
        currentBus = nextBus;

    }
    return null;
}
