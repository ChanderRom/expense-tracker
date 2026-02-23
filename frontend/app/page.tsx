'use client';

import { useEffect, useState } from 'react';
import { IExpense } from '@/interfaces/IExpense';
import { userService } from '@/api/expenseService';

export default function HomePage() {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IExpense>>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newExpense, setNewExpense] = useState({ name: "", amount: 0 });
  const [showAlertEmptyExpense, setShowAlertEmptyExpense] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await userService.getExpenses();
        setExpenses(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    if (showAlertEmptyExpense) {
      alert("An expense must have a name and an amount");
      setShowAlertEmptyExpense(false);
    }
  }, [showAlertEmptyExpense]);

  const handleEditClick = (expense: IExpense) => {
    setEditingId(expense.id);
    setEditForm(expense);
  };

  const handleCreate = async () => {
    try {
      if (!newExpense.name || newExpense.amount <= 0) {
        setShowAlertEmptyExpense(true);
        return;
      }

      const created = await userService.createExpense(newExpense);

      setExpenses([...expenses, created]);
      setNewExpense({ name: '', amount: 0 });
      setIsCreating(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (id: string) => {
    try {
      const { id: _id, date, ...payload } = editForm;

      if (!payload.name || !payload.amount) {
        alert("An expense must have a name and and amount");
        return null;
      }

      const updated = await userService.updateExpense(id, payload);

      setExpenses(expenses.map(expense => (expense.id === id ? updated : expense)));
      setEditingId(null);
    } catch (handleSaveError) {
      throw handleSaveError
    }
  };

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1 className="title">EXPENSES</h1>

      <section style={{ marginBottom: '1rem' }}>
        {!isCreating ? (
          <button onClick={() => setIsCreating(true)}>+ New Expense</button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              placeholder="Expense name"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
            />
            <button onClick={handleCreate} style={{ color: 'green' }}>Save</button>
            <button onClick={() => setIsCreating(false)} style={{ color: 'red' }}>Cancel</button>
          </div>
        )}
      </section>

      {expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {editingId === expense.id ? (
                <>
                  {/* EDIT */}
                  <input
                    value={editForm.name}
                    maxLength={20}
                    onChange={(e) => {
                      setEditForm({
                        ...editForm,
                        name: e.target.value
                      })
                    }
                    }

                  />
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 5);
                      setEditForm({
                        ...editForm,
                        amount: value === "" ? undefined : Number(value),
                      });
                    }}
                  />
                  <button onClick={() => handleSave(expense.id)} style={{ color: 'green' }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ color: 'red' }}>Cancel</button>
                </>
              ) : (
                <>
                  {/* LECTURE */}
                  <strong>{expense.name}</strong> - ${expense.amount}
                  <button onClick={() => handleEditClick(expense)} style={{ marginLeft: '1rem', cursor: 'pointer' }}>
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}