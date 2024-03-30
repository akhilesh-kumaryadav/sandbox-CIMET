import knex from "../db";
import { Request, Response, NextFunction } from "express";

const userTable = "users";
const bookTable = "books";
const authorBookTable = "authors_books"

export const getAuthorsByBookId = async (req: Request, res: Response, _next: NextFunction) => {
  const bookId = req.params.id;
  const authors = await knex(authorBookTable)
    .join(userTable, `${authorBookTable}.user_id`, `${userTable}.id`)
    .where(`${authorBookTable}.book_id`, bookId)
    .select(`${userTable}.id`, `${userTable}.firstName`);

  return res.status(200).json({ authors });
};

export const getBooksByAuthorId = async (req: Request, res: Response, _next: NextFunction) => {
  const userId = req.params.id;
  const books = await knex(authorBookTable)
    .join(bookTable, `${authorBookTable}.book_id`, `${bookTable}.id`)
    .where(`${authorBookTable}.user_id`, userId)
    .select(`${bookTable}.id`, `${bookTable}.title`);

  return res.status(200).json({ books });
};