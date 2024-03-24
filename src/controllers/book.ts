import knex from "../db";
import { Request, Response, NextFunction } from "express";
const Joi = require('joi'); // For input validation
const bookTable = "books";

const schema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required()
});

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  const data = await knex(bookTable).select().where({});
  return res.status(200).json({ data });
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const data = await knex(bookTable).select().where({ id });
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};

export const postBook = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const title = req.body.title;
  const summary = req.body.summary;

  try {
    const insertData = await knex(bookTable).insert({
      title: title,
      summary: summary,
    });

    return res.status(201).json({ insertData });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unsuccessful attempt for creating the data" });
  }
};

export const putBookById = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = req.params;
  const title = req.body.title;
  const summary = req.body.summary;

  try {
    const data = await knex(bookTable).where({ id : id }).update({
        title : title,
        summary : summary,
      } ,[
        'id', 'title', "summary"
      ]
    );
    console.log(data);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};

export const patchBookById = async (req: Request, res: Response, next: NextFunction) => {};

export const deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const data = await knex(bookTable).select().where({ id }).del();
    console.log(data);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};
