export function findBusTimeFare(path,routes){
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