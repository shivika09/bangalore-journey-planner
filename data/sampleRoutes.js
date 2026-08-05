// export const routes = {

// "kundalahalli": [
//     { stop: "aecs layout", route: "500D", time: 5, fare: 10 },
//     { stop: "marathahalli", route: "335E", time: 8, fare: 10 },
//     { stop: "brookefield", route: "K4", time: 7, fare: 10 }
// ],

// "aecs layout": [
//     { stop: "kundalahalli", route: "500D", time: 5, fare: 10 },
//     { stop: "brookefield", route: "500D", time: 6, fare: 10 },
//     { stop: "itpl", route: "500K", time: 12, fare: 15 }
// ],

// "brookefield": [
//     { stop: "kundalahalli", route: "K4", time: 7, fare: 10 },
//     { stop: "aecs layout", route: "500D", time: 6, fare: 10 },
//     { stop: "itpl", route: "500D", time: 8, fare: 10 },
//     { stop: "whitefield", route: "333P", time: 10, fare: 10 }
// ],

// "itpl": [
//     { stop: "brookefield", route: "500D", time: 8, fare: 10 },
//     { stop: "aecs layout", route: "500K", time: 12, fare: 15 },
//     { stop: "hope farm", route: "333P", time: 8, fare: 10 },
//     { stop: "hoodi", route: "304", time: 12, fare: 15 }
// ],

// "hope farm": [
//     { stop: "itpl", route: "333P", time: 8, fare: 10 },
//     { stop: "kadugodi", route: "333P", time: 6, fare: 10 }
// ],

// "kadugodi": [
//     { stop: "hope farm", route: "333P", time: 6, fare: 10 },
//     { stop: "whitefield", route: "333P", time: 8, fare: 10 }
// ],

// "whitefield": [
//     { stop: "brookefield", route: "333P", time: 10, fare: 10 },
//     { stop: "kadugodi", route: "333P", time: 8, fare: 10 },
//     { stop: "hoodi", route: "304", time: 10, fare: 15 }
// ],

// "hoodi": [
//     { stop: "whitefield", route: "304", time: 10, fare: 15 },
//     { stop: "itpl", route: "304", time: 12, fare: 15 },
//     { stop: "kr puram", route: "304", time: 10, fare: 10 }
// ],

// "marathahalli": [
//     { stop: "kundalahalli", route: "335E", time: 8, fare: 10 },
//     { stop: "bellandur", route: "500A", time: 10, fare: 10 },
//     { stop: "domlur", route: "201", time: 15, fare: 15 },
//     { stop: "kr puram", route: "500C", time: 18, fare: 20 }
// ],

// "bellandur": [
//     { stop: "marathahalli", route: "500A", time: 10, fare: 10 },
//     { stop: "ecospace", route: "500A", time: 8, fare: 10 }
// ],

// "ecospace": [
//     { stop: "bellandur", route: "500A", time: 8, fare: 10 },
//     { stop: "silk board", route: "500A", time: 12, fare: 10 }
// ],

// "kr puram": [
//     { stop: "hoodi", route: "304", time: 10, fare: 10 },
//     { stop: "tin factory", route: "304", time: 8, fare: 10 },
//     { stop: "marathahalli", route: "500C", time: 18, fare: 20 },
//     { stop: "baiyappanahalli", route: "401K", time: 10, fare: 10 }
// ],

// "tin factory": [
//     { stop: "kr puram", route: "304", time: 8, fare: 10 },
//     { stop: "baiyappanahalli", route: "401K", time: 7, fare: 10 }
// ],

// "baiyappanahalli": [
//     { stop: "tin factory", route: "401K", time: 7, fare: 10 },
//     { stop: "indiranagar", route: "401K", time: 8, fare: 10 }
// ],

// "indiranagar": [
//     { stop: "baiyappanahalli", route: "401K", time: 8, fare: 10 },
//     { stop: "domlur", route: "201", time: 8, fare: 10 },
//     { stop: "mg road", route: "201", time: 12, fare: 15 },
//     { stop: "ulsoor", route: "138", time: 6, fare: 10 }
// ],

// "ulsoor": [
//     { stop: "indiranagar", route: "138", time: 6, fare: 10 },
//     { stop: "shivajinagar", route: "138", time: 10, fare: 10 }
// ],

// "domlur": [
//     { stop: "indiranagar", route: "201", time: 8, fare: 10 },
//     { stop: "marathahalli", route: "201", time: 15, fare: 15 },
//     { stop: "silk board", route: "500A", time: 20, fare: 20 },
//     { stop: "richmond circle", route: "201", time: 12, fare: 15 }
// ],

// "mg road": [
//     { stop: "indiranagar", route: "201", time: 12, fare: 15 },
//     { stop: "shivajinagar", route: "201", time: 8, fare: 10 },
//     { stop: "richmond circle", route: "210", time: 8, fare: 10 }
// ],

// "shivajinagar": [
//     { stop: "mg road", route: "201", time: 8, fare: 10 },
//     { stop: "ulsoor", route: "138", time: 10, fare: 10 },
//     { stop: "majestic", route: "250", time: 12, fare: 15 },
//     { stop: "cantonment", route: "290", time: 6, fare: 10 }
// ],

// "cantonment": [
//     { stop: "shivajinagar", route: "290", time: 6, fare: 10 },
//     { stop: "hebbal", route: "290", time: 15, fare: 15 }
// ],

// "richmond circle": [
//     { stop: "mg road", route: "210", time: 8, fare: 10 },
//     { stop: "domlur", route: "201", time: 12, fare: 15 },
//     { stop: "lalbagh", route: "210", time: 10, fare: 10 }
// ],

// "lalbagh": [
//     { stop: "richmond circle", route: "210", time: 10, fare: 10 },
//     { stop: "jayanagar", route: "201U", time: 8, fare: 10 },
//     { stop: "majestic", route: "210", time: 12, fare: 15 }
// ],

// "jayanagar": [
//     { stop: "lalbagh", route: "201U", time: 8, fare: 10 },
//     { stop: "jayadeva", route: "201U", time: 8, fare: 10 }
// ],

// "jayadeva": [
//     { stop: "jayanagar", route: "201U", time: 8, fare: 10 },
//     { stop: "btm layout", route: "201U", time: 8, fare: 10 }
// ],

// "btm layout": [
//     { stop: "jayadeva", route: "201U", time: 8, fare: 10 },
//     { stop: "silk board", route: "500A", time: 8, fare: 10 },
//     { stop: "koramangala", route: "171", time: 8, fare: 10 }
// ],

// "koramangala": [
//     { stop: "btm layout", route: "171", time: 8, fare: 10 },
//     { stop: "richmond circle", route: "171", time: 12, fare: 15 }
// ],

// "silk board": [
//     { stop: "ecospace", route: "500A", time: 12, fare: 10 },
//     { stop: "btm layout", route: "500A", time: 8, fare: 10 },
//     { stop: "domlur", route: "500A", time: 20, fare: 20 }
// ],

// "majestic": [
//     { stop: "shivajinagar", route: "250", time: 12, fare: 15 },
//     { stop: "lalbagh", route: "210", time: 12, fare: 15 },
//     { stop: "yeshwanthpur", route: "401", time: 18, fare: 20 }
// ],

// "yeshwanthpur": [
//     { stop: "majestic", route: "401", time: 18, fare: 20 },
//     { stop: "peenya", route: "401", time: 10, fare: 10 },
//     { stop: "hebbal", route: "401A", time: 15, fare: 15 }
// ],

// "peenya": [
//     { stop: "yeshwanthpur", route: "401", time: 10, fare: 10 }
// ],

// "hebbal": [
//     { stop: "cantonment", route: "290", time: 15, fare: 15 },
//     { stop: "yeshwanthpur", route: "401A", time: 15, fare: 15 }
// ]
// };
// // export const routes = {
// //   "kundalahalli": [
// //     { stop: "marathahalli", route: "500D", time: 10, fare: 10 },
// //     { stop: "aecs layout", route: "335E", time: 5, fare: 5 }
// //   ],

// //   "aecs layout": [
// //     { stop: "kundalahalli", route: "335E", time: 5, fare: 5 },
// //     { stop: "itpl", route: "335E", time: 12, fare: 10 },
// //     { stop: "brookefield", route: "KBS-3A", time: 8, fare: 8 }
// //   ],

// //   "brookefield": [
// //     { stop: "aecs layout", route: "KBS-3A", time: 8, fare: 8 },
// //     { stop: "itpl", route: "KBS-3A", time: 10, fare: 10 }
// //   ],

// //   "marathahalli": [
// //     { stop: "kundalahalli", route: "500D", time: 10, fare: 10 },
// //     { stop: "bellandur", route: "500D", time: 12, fare: 10 },
// //     { stop: "silk board", route: "500K", time: 20, fare: 20 }
// //   ],

// //   "bellandur": [
// //     { stop: "marathahalli", route: "500D", time: 12, fare: 10 },
// //     { stop: "silk board", route: "500D", time: 15, fare: 15 }
// //   ],

// //   "silk board": [
// //     { stop: "bellandur", route: "500D", time: 15, fare: 15 },
// //     { stop: "marathahalli", route: "500K", time: 20, fare: 20 }
// //   ],

// //   "itpl": [
// //     { stop: "aecs layout", route: "335E", time: 12, fare: 10 },
// //     { stop: "brookefield", route: "KBS-3A", time: 10, fare: 10 }
// //   ]
// // };



