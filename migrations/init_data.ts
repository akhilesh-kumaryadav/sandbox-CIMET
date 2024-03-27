import { Knex } from "knex";

const userTable = "users";
const bookTable = "books";
const authorBookTable = "authors_books"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(userTable);
  await knex.schema.dropTableIfExists(bookTable);
  await knex.schema.dropTableIfExists(authorBookTable);

  await knex.schema.createTable(userTable, (table) => {
    table.increments("id").primary();
    table.string("firstName");
    table.string("lastName");
    table.string("gender");
  });

  await knex.schema.createTable(bookTable, (table) => {
    table.increments("id").primary();
    table.string("title");
    table.string("summary");
  });

  await knex.schema.createTable(authorBookTable, table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('users.id');
    table.integer('book_id').unsigned().references('books.id');
    table.unique(['user_id', 'book_id']);
  });

  // Insert initial data
  await knex(userTable).insert([
    { id: 1, firstName: "John", lastName: "Doe", gender: "male" },
    { id: 2, firstName: "Jane", lastName: "Doe", gender: "female" },
    { id: 3, firstName: "Bob", lastName: "Smith", gender: "male" },
    { id: 4, firstName: "Alice", lastName: "Smith", gender: "female" },
    { id: 5, firstName: "Tom", lastName: "Johnson", gender: "male" },
    { id: 6, firstName: "Sara", lastName: "Johnson", gender: "female" },
    { id: 7, firstName: "Mike", lastName: "Brown", gender: "male" },
    { id: 8, firstName: "Emily", lastName: "Brown", gender: "female" },
    { id: 9, firstName: "Alex", lastName: "Davis", gender: "male" },
    { id: 10, firstName: "Olivia", lastName: "Davis", gender: "female" },
  ]);

  await knex(bookTable).insert([
    { id: 1, title: "Book 1", summary: "Summary 1" },
    { id: 2, title: "Book 2", summary: "Summary 2" },
    { id: 3, title: "Book 3", summary: "Summary 3" },
    { id: 4, title: "Book 4", summary: "Summary 4" },
    { id: 5, title: "Book 5", summary: "Summary 5" },
  ]);

  await knex(authorBookTable).insert([
    { id: 1, user_id: 1, book_id: 1},
    { id: 2, user_id: 1, book_id: 2},
    { id: 3, user_id: 1, book_id: 5},
    { id: 4, user_id: 2, book_id: 1},
    { id: 5, user_id: 2, book_id: 4},
    { id: 6, user_id: 3, book_id: 3},
    { id: 7, user_id: 4, book_id: 1},
    { id: 8, user_id: 4, book_id: 5},
    { id: 9, user_id: 5, book_id: 3},
    { id: 10, user_id: 5, book_id: 4},
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(userTable);
  await knex.schema.dropTableIfExists(bookTable);
  await knex.schema.dropTable(authorBookTable);
}
