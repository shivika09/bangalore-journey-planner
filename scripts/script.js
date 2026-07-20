import {routes} from "../data/routes.js"


const findRouteButton = document.querySelector('.js-find-route-button');

findRouteButton.
    addEventListener('click',() => {
        const start = document.querySelector('.js-start-location').value.trim().toLowerCase();
        const end = document.querySelector('.js-end-location').value.trim().toLowerCase();
        let matchingRoute = null;
        let html=''

        // const matchingRoute = routes.find((route) => {
        // return route.start === start && route.end === end;
        // });

        if(start==='' || end===''){
            document.querySelector('.js-route-box').innerHTML='<div>Please enter the locations</div>';
            return;
        }

        routes.forEach((route) =>{
            if((route.start === start) && (route.end === end)){
                matchingRoute = route;
            }
        });


        if(matchingRoute){
            html= `
            <div>Route Found!</div>
            <div>Bus : ${matchingRoute.bus}</div>
            <div>Time : ${matchingRoute.time}</div>
            <div>Fare : ${matchingRoute.fare}</div>
            `;
        }

        else{
            html= '<div>Not Found</div>'
        }
        

        document.querySelector('.js-route-box').innerHTML = html;
});






