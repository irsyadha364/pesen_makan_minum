import 'package:flutter/material.dart';
import 'package:my_first_app/providers/AuthProvider.dart';
import 'package:my_first_app/providers/CategoryProvider.dart';
import 'package:my_first_app/providers/DrinkProvider.dart';
import 'package:my_first_app/providers/FoodProvider.dart';
import 'package:my_first_app/providers/PesanProvider.dart';
import 'package:my_first_app/providers/TokoProvider.dart';
import 'package:my_first_app/providers/TransactionProvider.dart';
import 'package:my_first_app/screens/categories.dart';
import 'package:my_first_app/screens/home.dart';
import 'package:my_first_app/screens/home_page.dart';
import 'package:my_first_app/screens/login.dart';
import 'package:my_first_app/screens/register.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
        create: (context) => AuthProvider(),
        child: Consumer<AuthProvider>(builder: (context, authProvider, child) {
          return MultiProvider(
              providers: [
                ChangeNotifierProvider<CategoryProvider>(
                    create: (context) => CategoryProvider(authProvider)),
                ChangeNotifierProvider<TransactionProvider>(
                    create: (context) => TransactionProvider(authProvider)),
                ChangeNotifierProvider<TokoProvider>(
                    create: (context) => TokoProvider(authProvider)),
                ChangeNotifierProvider<FoodProvider>(
                    create: (context) => FoodProvider(authProvider)),
                ChangeNotifierProvider<DrinkProvider>(
                    create: (context) => DrinkProvider(authProvider)),
                ChangeNotifierProvider<PesanProvider>(
                    create: (context) => PesanProvider(authProvider)),
              ],
              child: MaterialApp(title: 'Welcome to Flutter', routes: {
                '/': (context) {
                  final authProvider = Provider.of<AuthProvider>(context);
                  if (authProvider.isAuthenticated) {
                    return Home();
                  } else {
                    return Login();
                  }
                },
                '/login': (context) => Login(),
                '/register': (context) => Register(),
                '/home': (context) => Home(),
                '/homePage': (context) => HomePage(),
                '/categories': (context) => Categories(),
              }));
        }));
  }
}
