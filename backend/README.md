## Backend for the Expense Tracker Application

This is a simple backend system for the Expense Tracker Application, creating using Spring Boot and utilizes MySQL
for storing the expenses.

## Requirements

1. Spring Boot
2. MySQL
3. Gradle

This server _assumes_ that there is a MySQL instance running in the background and has a database named `db_expense`
created on it with the user credentials being present in
the [application.properties](src/main/resources/application.properties)
file having write acces on it.

## Running Locally

Clone the whole repository (which includes both the frontend and the backend) by using the following command:

```shell
git clone https://github.com/sbansal1999/expense-tracker
```

Move to the folder that contains the code for the server side by the following command:

```shell
cd backend
```

To start the server, run the following command:

```shell
./gradlew bootRun
```

Now the server listens at `localhost:5000` exposing the following endpoints:

**Creating a new expense**

<details>
 <summary><code>POST</code> <code><b>/expense/add</b></code></summary>

##### Parameters

| name        | type     | data type |
 |-------------|----------|-----------|
| title       | required | string    |
| amount      | required | integer   |
| description | optional | string    |

##### Responses

| http code | response                               |
 |-----------|----------------------------------------|
| `200`     | Returns the details of the expense.    |
| `400`     | `{"code":"400","error":"Bad Request"}` |

</details>

**Get all expenses**

<details>
 <summary><code>GET</code> <code><b>/expense/all</b></code></summary>

##### Parameters

None

##### Responses

| http code | response                                                |
 |-----------|---------------------------------------------------------|
| `200`     | Returns an array containing details of all the expense. |

</details>









