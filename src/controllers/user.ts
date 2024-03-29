import knex from "../db";
import { Request, Response, NextFunction } from "express";

const Joi = require('joi'); // For input validation
const userTable = "users";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().required()
});

export const getUsers = async (_req: Request, res: Response, _next: NextFunction) => {
  const data = await knex(userTable).select().where({});
  return res.status(200).json({ data });
};

export const getUserById = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  try {
    const data = await knex(userTable).select().where({ id });
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};

export const postUser = async (req: Request, res: Response, _next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Prioritize new field names but fall back to old ones if necessary
  const givenName = req.body.givenName || req.body.firstName;
  const familyName = req.body.familyName || req.body.lastName;
  const gender = req.body.gender;

  if (!givenName || !familyName) {
    return res.status(400).send('Missing name information');
  }

  try {
    const insertData = await knex(userTable).insert({
      firstName: givenName,
      lastName: familyName,
      gender: gender,
    });

    return res.status(201).json({ insertData });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Unsuccessful attempt for creating the data" });
  }
};

export const putUserById = async (req: Request, res: Response, _next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  const { id } = req.params;
  const givenName = req.body.givenName || req.body.firstName;
  const familyName = req.body.familyName || req.body.lastName;
  const gender = req.body.gender; 

  if (!givenName || !familyName) {
    return res.status(400).send('Missing name information');
  }
  

  try {
    const data = await knex(userTable).where({ id : id }).update({
        firstName : givenName,
        lastName : familyName,
        gender : gender,
      } ,[
        'id', 'firstName', "lastName", 'gender'
      ]
    );
    console.log(data);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};

//export const patchUserById = async (req: Request, res: Response, next: NextFunction) => {};

export const deleteUserById = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;

  try {
    const data = await knex(userTable).select().where({ id }).del();
    console.log(data);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};
