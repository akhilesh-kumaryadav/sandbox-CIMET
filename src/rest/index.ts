import express from "express";
const router = express.Router();

import {getUsers, getUserById, postUser, putUserById, deleteUserById } from "../controllers/user";

import {getBooks, getBookById, postBook, putBookById, deleteBookById } from "../controllers/book";

import { getAuthorsByBookId, getBooksByAuthorId } from "../controllers/userBook";

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
 *   component:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         in: header
 *         name: api-key
 *   security:
 *     - ApiKeyAuth: []
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
/**
 * @openapi
 * /rest/user:
 *   post:
 *     description: user post endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       201:
 *         description: Created the record.
 *       404:
 *         description: Not found.
 */
router.post("/user", postUser);
/**
 * @openapi
 * /rest/user/{id}:
 *   put:
 *     description: user put endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Updated the record.
 *       404:
 *         description: Not found.
 */
router.put("/user/:id", putUserById);
/* router.patch("/user/:id", patchUserById);*/
/**
 * @openapi
 * /rest/user/{id}:
 *   delete:
 *     description: user delete endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       201:
 *         description: Deleted the record.
 *       404:
 *         description: Not found.
 */
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
/**
 * @openapi
 * /rest/book:
 *   post:
 *     description: book post endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       201:
 *         description: Created the record.
 *       404:
 *         description: Not found.
 */
router.post("/book", postBook);
/**
 * @openapi
 * /rest/book/{id}:
 *   put:
 *     description: book put endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Updated the record.
 *       404:
 *         description: Not found.
 */
router.put("/book/:id", putBookById);
/*router.patch("/book/:id", patchBookById);*/
/**
 * @openapi
 * /rest/book/{id}:
 *   delete:
 *     description: book delete endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       201:
 *         description: Deleted the record.
 *       404:
 *         description: Not found.
 */
router.delete("/book/:id", deleteBookById);

// DB Migration
// Get authors by book ID
/**
 * @openapi
 * /rest/book/{id}/authors:
 *   get:
 *     description: authors by book ID endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       201:
 *         description: Deleted the record.
 *       404:
 *         description: Not found.
 */
router.get('/book/:id/authors', getAuthorsByBookId);

// Get books by author ID
/**
 * @openapi
 * /rest/user/{id}/books:
 *   get:
 *     description: Get books by author ID endpoint!
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       201:
 *         description: Deleted the record.
 *       404:
 *         description: Not found.
 */
router.get('/user/:id/books', getBooksByAuthorId);

// Root Route
router.get("/", (_req, res) => {
  return res.json({ data: "Rest API page!" });
});

export default router;
