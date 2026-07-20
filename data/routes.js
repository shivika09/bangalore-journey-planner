export const routes = {
  'stop a': [
    { stop: 'stop b', route: 'Bus 1', time: '10 mins', fare: '₹10' }
  ],
  'stop b': [
    { stop: 'stop a', route: 'Bus 1', time: '10 mins', fare: '₹10' },
    { stop: 'stop c', route: 'Bus 2', time: '8 mins', fare: '₹8' },
    { stop: 'stop d', route: 'Bus 5', time: '15 mins', fare: '₹15' }
  ],
  'stop c': [
    { stop: 'stop b', route: 'Bus 2', time: '8 mins', fare: '₹8' },
    { stop: 'stop d', route: 'Bus 3', time: '12 mins', fare: '₹12' }
  ],
  'stop d': [
    { stop: 'stop b', route: 'Bus 5', time: '15 mins', fare: '₹15' },
    { stop: 'stop c', route: 'Bus 3', time: '12 mins', fare: '₹12' },
    { stop: 'stop e', route: 'Bus 4', time: '5 mins', fare: '₹5' }
  ],
  'stop e': [
    { stop: 'stop d', route: 'Bus 4', time: '5 mins', fare: '₹5' }
  ]
};


// const neighborRoutes = {
//     'stop a' : ['stop b'],
//     'stop b' : ['stop a', 'stop c', 'stop d'],
//     'stop c' : ['stop b', 'stop d'],
//     'stop d' : ['stop b', 'stop c', 'stop e'],
//     'stop e' : ['stop d']
// };

