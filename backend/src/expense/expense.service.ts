import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { v4 as uuidv4 } from 'uuid';
import { randomUUID } from 'crypto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  private expenses: Expense[] = [
    { id: randomUUID(), name: 'Coffe', amount: 1.7, date: new Date() },
    { id: randomUUID(), name: 'Dinner', amount: 15, date: new Date() },
    { id: randomUUID(), name: 'Taxi 1', amount: 25, date: new Date() },
    { id: randomUUID(), name: 'Taxi 2', amount: 40, date: new Date() },
  ];

  create(createExpenseDto: CreateExpenseDto): Expense {
    const newExpense: Expense = {
      ...createExpenseDto,
      id: uuidv4(),
      date: new Date(),
    };

    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll() {
    return this.expenses;
  }

  findById(id: string) {
    const expense = this.expenses.find((expense) => expense.id === id);
    if (!expense) throw new NotFoundException(`Expense with ID ${id} doesn't exist`);

    return expense;
  }

  findByName(name: string) {
    const cleanExpenseName = name.trim().toLowerCase();

    const expense = this.expenses.find((expense) => {
      return expense.name.trim().toLowerCase() === cleanExpenseName;
    });

    if (!expense) throw new NotFoundException(`Expense with name "${name}" not found`);

    return expense;
  }

  update(expenseId: string, updateExpenseDto: UpdateExpenseDto): Expense {
    const { name, amount } = updateExpenseDto;

    const expense = this.findById(expenseId);

    if (name) expense.name = name;
    if (amount) expense.amount = amount;

    return expense;
  }

  remove(id: string) {
    this.findById(id);
    this.expenses = this.expenses.filter(expense => expense.id !== id)
  }
}
