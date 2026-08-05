import {routes} from "../data/routes.js"

const selectStart = document.querySelector('#start-stops');
const selectEnd = document.querySelector('#end-stops');

const stops = Object.keys(routes).sort();

let startHTML = "";
let endHTML = "";

for(const stop of stops){
     startHTML += `<option value="${stop}">`;
     endHTML += `<option value="${stop}">`;
}

selectStart.innerHTML = startHTML;
selectEnd.innerHTML = endHTML;


const findRouteButton = document.querySelector('.js-find-route-button');

findRouteButton.
    addEventListener('click',() => {
        const start = document.querySelector('.js-start-location').value.trim().toLowerCase();
        const end = document.querySelector('.js-end-location').value.trim().toLowerCase();


        if(start==='' || end===''){
            document.querySelector('.js-route-box').innerHTML='<div>Please enter the locations</div>';
            return;
        }

        const {path: lleastChangePath, buses: lleastChangeBuses} = findRouteLeastChange(start,end,routes);
        console.log(lleastChangePath);
        console.log(lleastChangeBuses);


        
        const path = findRoute(start, end, routes);
        const altPath = findAltRoute(start, end, routes);
        // const fastestPath = findRouteLeastTime(start,end,routes);
        const {path: leastChangePath, buses: leastChangeBuses} = findRouteLeastChange(start,end,routes);
        // const leastFarePath = findRouteLeastFare(start,end,routes);

        let routeHtml='';

        if (!path) {
            routeHtml= '<div>Route Not Found</div>'
        }
        else if (path.length === 1) {
            routeHtml = `
                <div>You are already at ${path[0]}</div>
            `;
        }
        else{
            const uniqueRoutes = [];

            const {busNo, time, fare} = findBusTimeFare(path,routes);
            const {busNo: altBusNo, time: altTime, fare: altFare} = findBusTimeFare(altPath,routes);
            // const {busNo: fastestBusNo, time: fastestTime, fare: fastestFare} = findBusTimeFare(fastestPath,routes);
            const {busNo: leastBusNo, time: leastTime, fare: leastFare} = findBusTimeFare(leastChangePath,routes);
            // const {busNo: cheapBusNo, time: cheapTime, fare: cheapFare} = findBusTimeFare(leastFarePath,routes);

            const routesToShow = [
            {
                type: "primary",
                label: "PRIMARY ROUTE",
                path,
                busNo,
                time,
                fare
            },
            {
                type: "alternative",
                label: "ALTERNATIVE ROUTE",
                path: altPath,
                busNo: altBusNo,
                time: altTime,
                fare: altFare
            },
            // {
            //     type: "fastest",
            //     label: "FASTEST ROUTE",
            //     path: fastestPath,
            //     busNo: fastestBusNo,
            //     time: fastestTime,
            //     fare: fastestFare
            // },
            {
                type: "leastChange",
                label: "LEAST BUS CHANGES",
                path: leastChangePath,
                busNo: leastChangeBuses,
                time: leastTime,
                fare: leastFare
            }
            // {
            //     type: "leastFare",
            //     label: "CHEAPEST",
            //     path: leastFarePath,
            //     busNo: cheapBusNo,
            //     time: cheapTime,
            //     fare: cheapFare
            // }
            ];

            for(const route of routesToShow){
                const existing = uniqueRoutes.find((unique) => 
                    JSON.stringify(unique.path) === JSON.stringify(route.path) && 
                    JSON.stringify(unique.busNo) === JSON.stringify(route.busNo)
                );
                if(!existing){
                    uniqueRoutes.push(route);
                }
                else if(route.type === "alternative"){
                    continue;
                }
                else if(existing.type === "alternative"){
                    existing.type = route.type;
                    existing.label = route.label;
                }
                else{
                    existing.label += ` ⭐ ${route.label}`;
                }

            }

            for(const route of uniqueRoutes){
                routeHtml += `<div class="route-display">
                    ${displayRoute(
                        route.label, route.path, route.busNo, route.time, route.fare
                    )} </div>`;
            }   
        }

        document.querySelector('.js-route-box').innerHTML = routeHtml;

        


});



function findRoute(start,end,routes){

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


function findBusTimeFare(path,routes){
    const busNo = [];
    let time = 0;
    let fare = 0;
    for(let i = 0; i<(path.length)-1; i++ ){
        const currentStop = path[i];
        const nextStop = path[i+1];
        const neighbors = routes[currentStop];
        for(const neighbor of neighbors){
            if(neighbor.stop === nextStop){
                busNo.push(neighbor.route);
                time += neighbor.time;
                fare += neighbor.fare;
                break;
            }
        }
    }
    return {busNo, time, fare};
}

function findAltRoute(start,end,routes){

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


function displayRoute(label, path, busNo, time, fare){

    let routeHtml=`
        <h2>${label}</h2>

        <h4>Take Bus ${busNo[0]}</h4>
        <div>${path[0]}</div>
        <div>&darr;</div>
    `;

    for(let i = 1; i<(path.length)-1; i++){
        if(busNo[i] === busNo[i-1]){
            routeHtml += `
                <div>${path[i]}</div>
            `
        }
        else{
            routeHtml += `
                <br><div>${path[i]}</div>
                <br><h4>Change to Bus ${busNo[i]}</h4>
            `
        }
        routeHtml += `<strong>&darr;</strong>`
    }

    routeHtml += `
        <div>${path[path.length - 1]}</div>
        <br><div><strong>Time :</strong> ${time} min</div>
        <div><strong>Fare :</strong> &#8377;${fare}</div>
    `;

    return routeHtml;
}


function findRouteLeastTime(start,end,routes){
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

function altfindRouteLeastChange(start,end,routes){
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

function findRouteLeastFare(start,end,routes){
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


function findRouteLeastChange(start,end,routes){
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




