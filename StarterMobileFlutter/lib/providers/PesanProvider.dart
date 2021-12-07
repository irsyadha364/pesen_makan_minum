import 'package:flutter/foundation.dart';
import 'package:my_first_app/models/drink.dart';
import 'package:my_first_app/models/food.dart';
import 'package:my_first_app/services/api.dart';

import 'AuthProvider.dart';

class PesanProvider extends ChangeNotifier {
  final List<Food> food = [];
  final List<Drink> drink = [];

  late ApiService apiService;
  late AuthProvider authProvider;

  PesanProvider(AuthProvider authProvider) {
    this.authProvider = authProvider;
    this.apiService = ApiService(authProvider.token);
  }
  List<Food> getFood() {
    return food;
  }

  int getLengthFood(String id ,String name) {
    if (food.isEmpty) {
      return 0;
    }
    if (food[0].idRestaurant == id) {
      int total= 0;
      for (var i = 0; i < food.length; i++) {
        if(food[i].name ==name ){
          total++;
        }
      }
      return total;
      
     
    } else {
      return 0;
    }
  }

  int getLengethDrink(String id ,String name) {
   if (drink.isEmpty) {
      return 0;
    }
    if (drink[0].idRestaurant == id) {
      int total= 0;
      for (var i = 0; i < drink.length; i++) {
        if(drink[i].name ==name ){
          total++;
        }
      }
      return total;
      
     
    } else {
      return 0;
    }
  }

  double totalFood() {
    double total = 0;
    for (var i = 0; i < food.length; i++) {
      total = total + double.parse(food[i].harga );
    }
    return total;
  }

  double total() {
    double total = 0;
    for (var i = 0; i < drink.length; i++) {
      total = total + double.parse(drink[i].harga);
    }
    total = total + totalFood();
    return total;
  }

  void addFood(Food item) {
    if (food.length == 0) {
      food.add(item);
    } else {
      if (food[0].idRestaurant != item.idRestaurant) {
        removeAll();
      } else {
        food.add(item);
      }
    }
    notifyListeners();
  }
   void addDrink(Drink item) {
    if (drink.length == 0) {
      drink.add(item);
    } else {
      if (drink[0].idRestaurant != item.idRestaurant) {
        removeAll();
      } else {
        drink.add(item);
      }
    }
    notifyListeners();
  }

  void removeFood(Food item) {
    food.remove(item);
    notifyListeners();
  }
    void removeDrink(Drink item) {
    drink.remove(item);
    notifyListeners();
  }



  void removeAll() {
    food.clear();
    drink.clear();
    notifyListeners();
  }
}
