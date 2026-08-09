import csv

stops = {}
route_numbers = {}
trip_info = {}
trip_stops = {}

routes = {}

schedule = {}

with open("gtfs/stops.txt", "r", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        stops[row["stop_id"]] = {
            "name" : row["stop_name"],
            "zone_id" : row["zone_id"]
        }

# print(len(stops))
# print(stops["21629"])

with open("gtfs/routes.txt", "r", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        route_numbers[row["route_id"]] = row["route_short_name"]

# print(len(route_numbers))
# print(route_numbers["3447"])

with open("gtfs/trips.txt", "r", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        trip_info[row["trip_id"]] = {
            "route_id" : row["route_id"],
            "direction_id" : row["direction_id"],
            "trip_headsign" : row["trip_headsign"]
        }

# print(len(trip_info))
# print(trip_info["1042"])

with open("gtfs/stop_times.txt", "r", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        trip_id = row["trip_id"]

        if trip_id not in trip_stops:
            trip_stops[trip_id] = []

        trip_stops[trip_id].append({
            "stop_id" : row["stop_id"],
            "sequence" : row["stop_sequence"],
            "arrival" : row["arrival_time"],
            "departure" : row["departure_time"]
        })

# print(len(trip_stops["27862"]))
# print(trip_stops["27862"])


for trip_id,stop_list in trip_stops.items():
    route_id = trip_info[trip_id]["route_id"]
    bus_route = route_numbers[route_id]
    for i in range(len(stop_list)):
        current_stop = stop_list[i]
        current_name = stops[current_stop["stop_id"]]["name"].strip().lower()

        if current_name not in routes:
            routes[current_name] = []

        if i>0:
            previous_stop = stop_list[i-1]
            previous_name = stops[previous_stop["stop_id"]]["name"].strip().lower()
            connection = {
                "stop" : previous_name,
                "route" : bus_route
            }
            if connection not in routes[current_name]:
                routes[current_name].append(connection)
    
        if i<len(stop_list)-1:
            next_stop = stop_list[i+1]
            next_name = stops[next_stop["stop_id"]]["name"].strip().lower()
            connection = {
                "stop" : next_name,
                "route" : bus_route
            }
            if connection not in routes[current_name]:
                routes[current_name].append(connection)

        
# print(routes["Marathahalli Bridge"])

import json

with open("data/routes.js", "w", encoding="utf-8") as file:
    file.write("export const routes = ")
    file.write(json.dumps(routes, indent=2))
    file.write(";")

   

for stop_id, stop in stops.items():
    schedule[stop["name"]] = {}

for tripid, trip_list in trip_stops.items():
    for trip in trip_list:
        routeid = trip_info[tripid]["route_id"]
        bus = route_numbers[routeid]
        current_stopid = trip["stop_id"]
        current_stop = stops[current_stopid]["name"]
        if bus not in schedule[current_stop]:
            schedule[current_stop][bus] = []
        schedule[current_stop][bus].append({
            "trip_id" : tripid,
            "arrival" : trip["arrival"],
            "departure" : trip["departure"]
        })
        

with open("data/schedule.js", "w", encoding = "utf-8") as file:
    file.write("export const schedule = ")
    file.write(json.dumps(schedule, indent = 4))
    file.write(";")




