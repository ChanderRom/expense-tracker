import { IsNotEmpty, IsNumber, IsPositive, IsString, Max } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Max(99999)
    @IsNotEmpty()
    amount: number;
}
