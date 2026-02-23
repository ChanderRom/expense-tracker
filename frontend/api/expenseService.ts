import { IExpense } from "@/interfaces/IExpense";
import { INewExpense } from "@/interfaces/INewExpense";

export const userService = {
    getExpenses: async (): Promise<IExpense[]> => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/expense`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const expenses: IExpense[] = await response.json();
            return expenses;

        } catch (error) {
            throw error;
        }
    },
    updateExpense: async (id: number | string, updatedExpense: Partial<IExpense>): Promise<IExpense> => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/expense/${id}`;

        try {
            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedExpense),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    createExpense: async (newExpense: INewExpense): Promise<IExpense> => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/expense/`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExpense),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
};