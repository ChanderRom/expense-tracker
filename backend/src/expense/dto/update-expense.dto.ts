import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { IsNumber, IsPositive, Max, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @IsOptional()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Max(99999)
    @IsOptional()
    amount?: number;
}
