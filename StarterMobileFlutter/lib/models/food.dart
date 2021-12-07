// To parse this JSON data, do
//
//     final food = foodFromMap(jsonString);

import 'dart:convert';

List<Food> foodFromMap(String str) => List<Food>.from(json.decode(str).map((x) => Food.fromMap(x)));

String foodToMap(List<Food> data) => json.encode(List<dynamic>.from(data.map((x) => x.toMap())));

class Food {
    Food({
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

    factory Food.fromMap(Map<String, dynamic> json) => Food(
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
