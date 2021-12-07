// To parse this JSON data, do
//
//     final food = foodFromMap(jsonString);

import 'dart:convert';

List<Drink> foodFromMap(String str) => List<Drink>.from(json.decode(str).map((x) => Drink.fromMap(x)));

String foodToMap(List<Drink> data) => json.encode(List<dynamic>.from(data.map((x) => x.toMap())));

class Drink {
    Drink({
        required this.idRestaurant,
        required this.name,
        required this.harga,
        required this.description,
        required this.picture,
    });

    String idRestaurant;
    String name;
    String harga;
    String description;
    String picture;

    factory Drink.fromMap(Map<String, dynamic> json) => Drink(
        idRestaurant: json["id_restaurant"],
        name: json["name"],
        harga: json["harga"],
        description: json["description"],
        picture: json["picture"],
    );

    Map<String, dynamic> toMap() => {
        "id_restaurant": idRestaurant,
        "name": name,
        "harga": harga,
        "description": description,
        "picture": picture,
    };
}
