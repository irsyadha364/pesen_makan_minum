import 'package:flutter/material.dart';
import 'package:my_first_app/models/drink.dart';
import 'package:my_first_app/models/food.dart';
import 'package:my_first_app/models/toko.dart';
import 'package:my_first_app/providers/CategoryProvider.dart';
import 'package:my_first_app/providers/DrinkProvider.dart';
import 'package:my_first_app/providers/FoodProvider.dart';
import 'package:my_first_app/providers/TokoProvider.dart';
import 'package:my_first_app/widgets/Food.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({ Key? key }) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<TokoProvider>(context);
    final drinkProv = Provider.of<DrinkProvider>(context);
    final foodProv = Provider.of<FoodProvider>(context);
    List<Toko> toko = provider.toko;
    List<Drink> drink = drinkProv.toko;
  List<Food> food = foodProv.toko;
    return Scaffold(
      appBar: AppBar(
        title : Text("Home")
      ),
      body : SingleChildScrollView(
        child: ListView.builder(
          shrinkWrap: true,
          itemCount: toko.length,
          itemBuilder: (context , index){
            return Column(
              children: [
                ListTile(
                  leading: Image.network(toko[index].pictureId),
                  subtitle: Row(
                    children: [
                      Container(child: Icon(Icons.star,
                      color: Colors.yellow,
                      )),
                      SizedBox(width: 2,),
                      Text(toko[index].rating.toString()),
                    ],
                  ),
                  title: Text(toko[index].name , style: TextStyle(fontWeight: FontWeight.bold),),
                  onTap: (){
                    Navigator.push(context, MaterialPageRoute(builder: (context) => FoodPage(id :toko[index].restaurantId , drinks:drink , food: food ,)  ));
                  },
                  
                ),
                SizedBox(height: 5,)
              ],
            );
          }),
      )
    );
  }
}