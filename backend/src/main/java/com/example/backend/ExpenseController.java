package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "expense")
public class ExpenseController {
    @Autowired
    private ExpenseRepository expenseRepository;

    @PostMapping("/add")
    private @ResponseBody String addNewExpense(@RequestParam String title, @RequestParam Integer amount, @RequestParam(required = false) String description) {
        Expense expense = new Expense(title, amount, description);
        expenseRepository.save(expense);
        return expense.toString();
    }

    @GetMapping("/all")
    private @ResponseBody Iterable<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

}
