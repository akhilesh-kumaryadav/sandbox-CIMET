import express from "express";
const router = express.Router();

import {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
} from "../controllers/user";
import {
  getBooks,
  getBookById,
  postBook,
  putBookById,
  patchBookById,
  deleteBookById,
} from "../controllers/book";

//User CRUD routes
/**
 * @openapi
 * /rest/user:
 *   get:
 *     description: users get endpoint!
 *     responses:
 *       200:
 *         description: Returns the record.
 *       404:
 *         description: Not found.
 */
router.get("/user", getUsers);
/**
 * @openapi
 * /rest/user/{id}:
 *   get:
 *     description: user get endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the record.
 *       404:
 *         description: Not found.
 */
router.get("/user/:id", getUserById);
router.post("/user", postUser);
router.put("/user/:id", putUserById);
/* router.patch("/user/:id", patchUserById);*/
router.delete("/user/:id", deleteUserById);

//Books CRUD routes
/**
 * @openapi
 * /rest/book:
 *   get:
 *     description: books get endpoint!
 *     responses:
 *       200:
 *         description: Returns the record.
 *       404:
 *         description: Not found.
 */
router.get("/book", getBooks);
/**
 * @openapi
 * /rest/book/{id}:
 *   get:
 *     description: book get endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the record.
 *       404:
 *         description: Not found.
 */
router.get("/book/:id", getBookById);
router.post("/book/", postBook);
router.put("/book/:id", putBookById);
/*router.patch("/book/:id", patchBookById);*/
router.delete("/book/:id", deleteBookById);

// Todo write the api handlers here below

router.get("/", (_req, res) => {
  return res.json({ data: "Rest API page!" });
});

export default router;
