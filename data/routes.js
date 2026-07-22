export const routes = {
  "kundalahalli": [
    { stop: "marathahalli", route: "500D", time: 10, fare: 10 },
    { stop: "aecs layout", route: "335E", time: 5, fare: 5 }
  ],

  "aecs layout": [
    { stop: "kundalahalli", route: "335E", time: 5, fare: 5 },
    { stop: "itpl", route: "335E", time: 12, fare: 10 },
    { stop: "brookefield", route: "KBS-3A", time: 8, fare: 8 }
  ],

  "brookefield": [
    { stop: "aecs layout", route: "KBS-3A", time: 8, fare: 8 },
    { stop: "itpl", route: "KBS-3A", time: 10, fare: 10 }
  ],

  "marathahalli": [
    { stop: "kundalahalli", route: "500D", time: 10, fare: 10 },
    { stop: "bellandur", route: "500D", time: 12, fare: 10 },
    { stop: "silk board", route: "500K", time: 20, fare: 20 }
  ],

  "bellandur": [
    { stop: "marathahalli", route: "500D", time: 12, fare: 10 },
    { stop: "silk board", route: "500D", time: 15, fare: 15 }
  ],

  "silk board": [
    { stop: "bellandur", route: "500D", time: 15, fare: 15 },
    { stop: "marathahalli", route: "500K", time: 20, fare: 20 }
  ],

  "itpl": [
    { stop: "aecs layout", route: "335E", time: 12, fare: 10 },
    { stop: "brookefield", route: "KBS-3A", time: 10, fare: 10 }
  ]
};

// export const routes = {
//   'stop a': [
//     { stop: 'stop b', route: 'Bus 1', time: 10, fare: 10 }
//   ],
//   'stop b': [
//     { stop: 'stop a', route: 'Bus 1', time: 10, fare: 10 },
//     { stop: 'stop c', route: 'Bus 2', time: 8, fare: 8 },
//     { stop: 'stop d', route: 'Bus 5', time: 15, fare: 15 }
//   ],
//   'stop c': [
//     { stop: 'stop b', route: 'Bus 2', time: 8, fare: 8 },
//     { stop: 'stop d', route: 'Bus 3', time: 12, fare: 12 }
//   ],
//   'stop d': [
//     { stop: 'stop b', route: 'Bus 5', time: 15, fare: 15 },
//     { stop: 'stop c', route: 'Bus 3', time: 12, fare: 12 },
//     { stop: 'stop e', route: 'Bus 4', time: 5, fare: 5 }
//   ],
//   'stop e': [
//     { stop: 'stop d', route: 'Bus 4', time: 5, fare: 5 }
//   ]
// };


// const neighborRoutes = {
//     'stop a' : ['stop b'],
//     'stop b' : ['stop a', 'stop c', 'stop d'],
//     'stop c' : ['stop b', 'stop d'],
//     'stop d' : ['stop b', 'stop c', 'stop e'],
//     'stop e' : ['stop d']
// };

