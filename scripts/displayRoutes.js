export function displayRoute(label, path, busNo, time, fare){

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