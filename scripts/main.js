import {routes} from "../data/routes.js"
import {findRoute, findAltRoute, findRouteLeastChange, findRouteLeastTime, findRouteLeastFare, altfindRouteLeastChange} from "./routeAlgorithms.js"
import {displayRoute} from "./displayRoutes.js"
import {findBusTimeFare} from "./routeDetails.js"


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

























