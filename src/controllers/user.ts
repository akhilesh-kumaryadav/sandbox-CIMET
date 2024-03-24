import knex from "../db";
const Joi = require('joi'); // For input validation
const userTable = "users";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().required()
});

export const getUsers = async (req, res) => {
  const data = await knex(userTable).select().where({});
  return res.status(200).json({ data });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await knex(userTable).select().where({ id });
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};

export const postUser = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;

  try {
    const insertData = await knex(userTable).insert({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
    });

    return res.status(201).json({ insertData });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unsuccessful attempt for creating the data" });
  }
};

export const putUserById = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  const { id } = req.params;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;

  try {
    const data = await knex(userTable).where({ id : id }).update({
        firstName : firstName,
        lastName : lastName,
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

export const patchUserById = async (req, res) => {};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await knex(userTable).select().where({ id }).del();
    console.log(data);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};
