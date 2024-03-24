import knex from "../db";
const userTable = "users";

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
  //get data from url
  //const id = (await knex(userTable)).length;
  console.log("Post user hitted");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;

  //use knew to insert the new user
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
