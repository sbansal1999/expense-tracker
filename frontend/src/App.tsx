import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { SERVER_URL } from "./lib/utils";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { useMutation, useQuery } from "react-query";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { useQueryClient } from "react-query";

type Expense = {
  title: string;
  amount: number;
  description?: string;
};

function App() {
  return (
    <>
      <div className="flex items-center justify-center bg-secondary p-5">
        <h1 className="text-2xl font-bold">Simple Expense Tracker</h1>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="my-40 flex-1">
          <AddExpense />
        </div>
        <div className="flex-1 p-5 lg:p-0">
          <ShowExpenses />
        </div>
      </div>
      <Toaster />
    </>
  );
}

function AddExpense() {
  const { register, handleSubmit } = useForm<Expense>();
  const queryClient = useQueryClient();

  const addExpenseMutation = useMutation(
    (expense: Expense) =>
      axios.post(SERVER_URL + "/expense/add", expense, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("expenses"),
    },
  );

  const handleSubmitExpense: SubmitHandler<Expense> = async (data) => {
    await addExpenseMutation.mutate(data);

    if (addExpenseMutation.isError) toast("Something went wrong");
    else toast("Expense has been created succesfully.");
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
          <CardDescription>Make a record about what you spent.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitExpense)}>
            <div className="flex flex-col gap-5">
              <div>
                <div className="space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="Title of the expense"
                    required
                  ></Input>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    {...register("amount")}
                    id="amount"
                    type="number"
                    min={0}
                    placeholder="Amount in ₹"
                    required
                  ></Input>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    {...register("description")}
                    id="description"
                    placeholder="Description of the expense"
                  ></Textarea>
                </div>
              </div>
              <div className="flex justify-around">
                <Button type="submit">Submit</Button>
                <Button type="reset" variant="destructive">
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ExpensesTable({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0)
    return (
      <div className="my-40 px-5 max-w-[600px]">
        <Alert>
          <AlertTitle>Your expenses will show up here.</AlertTitle>
        </Alert>
      </div>
    );
  return (
    <Table>
      <TableCaption>List of expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense, id) => (
          <TableRow key={id}>
            <TableCell>{expense.title}</TableCell>
            <TableCell>{expense.amount}</TableCell>
            <TableCell>{expense.description || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ShowExpenses() {
  const {
    data: expenses,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<Expense[]>("expenses", () => {
    return fetch(SERVER_URL + "/expense/all").then((res) => res.json());
  });

  if (isError) {
    return (
      <div className="my-40 px-5 max-w-[600px]">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong!</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return <h1 className="text-xl font-bold">Loading...</h1>;
  }

  if (isSuccess) {
    return <ExpensesTable expenses={expenses} />;
  }

  return <div>Show all expenses</div>;
}

export default App;
