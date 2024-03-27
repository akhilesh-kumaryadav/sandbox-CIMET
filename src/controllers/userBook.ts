import knex from "../db";
import { Request, Response, NextFunction } from "express";

const authorBookTable = "authors_books"

export const getAuthorsByBookId = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.id;
  const authors = await knex(authorBookTable)
    .join('users', 'authors_books.user_id', 'users.id')
    .where('authors_books.book_id', bookId)
    .select('users.id', 'users.firstName');

  return res.status(200).json({ authors });
};

export const getBooksByAuthorId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const books = await knex(authorBookTable)
    .join('books', 'authors_books.book_id', 'books.id')
    .where('authors_books.user_id', userId)
    .select('books.id', 'books.title');

  return res.status(200).json({ books });
};