import {routes} from "../data/routes.js"


const findRouteButton = document.querySelector('.js-find-route-button');

findRouteButton.
    addEventListener('click',() => {
        const start = document.querySelector('.js-start-location').value.trim().toLowerCase();
        const end = document.querySelector('.js-end-location').value.trim().toLowerCase();

        // const matchingRoute = routes.find((route) => {
        // return route.start === start && route.end === end;
        // });

        if(start==='' || end===''){
            document.querySelector('.js-route-box').innerHTML='<div>Please enter the locations</div>';
            return;
        }

        
        const path = findRoute(start, end, routes);

        let routeHtml='';

        if (path){
            console.log(path.join('->'));
            if (path.length === 1) {
                routeHtml = `
                    <div>You are already at ${path[0]}</div>
                `;
            }
            else{
                const {busNo, time, fare} = findBusTimeFare(path,routes);
                console.log(busNo.join('->'))

                routeHtml=`<div>Take Bus ${busNo[0]}</div>
                    <div>${path[0]}</div>
                    <div>&darr;</div>
                `;

                // html = `
                // <div>ROUTE FOUND!</div>
                // <div>${path.join(' => ')}</div>
                // <div>Bus Route : ${busNo.join(' => ')}</div>
                // <div>Time : ${time} min</div>
                // <div>Fare : &#8377;${fare}</div>
                // `
                for(let i = 1; i<(path.length)-1; i++){
                    if(busNo[i] === busNo[i-1]){
                        routeHtml += `
                            <div>${path[i]}</div>
                        `
                    }
                    else{
                        routeHtml += `
                            <div>${path[i]}</div>
                            <div>Change to Bus ${busNo[i]}</div>
                        `
                    }
                    routeHtml += `<div>&darr;</div>`
                }

                routeHtml += `
                    <div>${path[path.length - 1]}</div>
                    <div>Time : ${time} min</div>
                    <div>Fare : &#8377;${fare}</div>
                `
            }      
        }

        else{
            routeHtml= '<div>Route Not Found</div>'
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


