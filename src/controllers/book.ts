import knex from "../db";
const bookTable = "books";

export const getBooks = async (req, res) => {
  const data = await knex(bookTable).select().where({});
  return res.status(200).json({ data });
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await knex(bookTable).select().where({ id });
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};

export const postBook = async (req, res) => {
  //get data from url
  //const id = (await knex(userTable)).length;
  console.log("Post book hitted");
  const title = req.body.title;
  const summary = req.body.summary;

  //use knew to insert the new user
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

export const putBookById = async (req, res) => {
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

export const patchBookById = async (req, res) => {};

export const deleteBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await knex(bookTable).select().where({ id }).del();
    console.log(data);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({ error: "Not found" });
  }
};
