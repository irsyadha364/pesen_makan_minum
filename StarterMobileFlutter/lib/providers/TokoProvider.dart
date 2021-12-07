import 'package:flutter/material.dart';
import 'package:my_first_app/models/toko.dart';
import 'package:my_first_app/models/transaction.dart';
import 'package:my_first_app/providers/AuthProvider.dart';
import 'package:my_first_app/services/api.dart';

class TokoProvider extends ChangeNotifier {
  List<Toko> toko = [];
  late ApiService apiService;
  late AuthProvider authProvider;

  TokoProvider(AuthProvider authProvider) {
    this.authProvider = authProvider;
    this.apiService = ApiService(authProvider.token);

    init();
  }

  Future init() async {
    toko = await apiService.fetchToko();
    notifyListeners();
  }

  // Future<void> addTransaction(String amount, String category, String description, String date) async {
  //   try {
  //     Transaction addedTransaction = await apiService.addTransaction(amount, category, description, date);
  //     transactions.add(addedTransaction);

  //     notifyListeners();
  //   } catch (Exception) {
  //     await authProvider.logOut();
  //   }
  // }

  // Future<void> updateTransaction(Transaction transaction) async {
  //   try {
  //     Transaction updatedTransaction = await apiService.updateTransaction(transaction);
  //     int index = transactions.indexOf(transaction);
  //     transactions[index] = updatedTransaction;

  //     notifyListeners();
  //   } catch (Exception) {
  //     await authProvider.logOut();
  //   }
  // }

  // Future<void> deleteTransaction(Transaction transaction) async {
  //   try {
  //     await apiService.deleteTransaction(transaction.id);

  //     transactions.remove(transaction);
  //     notifyListeners();
  //   } catch (Exception) {
  //     await authProvider.logOut();
  //   }
  // }
}