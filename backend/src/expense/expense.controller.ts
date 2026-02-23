import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) { }

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get('find-id/:uuid')
  findById(@Param('uuid', ParseUUIDPipe) uuid: string): Expense {
    return this.expenseService.findById(uuid);
  }

  @Get('find-name/:name')
  findByName(@Param('name') name: string): Expense {
    return this.expenseService.findByName(name);
  }

  @Patch(':id')
  update(
    @Param('id') expenseName: string,
    @Body() updateExpenseDto: UpdateExpenseDto
  ) {
    return this.expenseService.update(expenseName, updateExpenseDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
