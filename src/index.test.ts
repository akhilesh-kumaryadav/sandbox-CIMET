import request from "supertest";
import express from "express";

import * as dotenv from 'dotenv';
import { createApp } from "../src/index";
import knex from "./db";

const userTable = "users";
const bookTable = "books";

dotenv.config();

const API_KEY: string = process.env.API_KEY || '';

let app: express.Application;
beforeAll(() => {
  app = createApp(3001);
});

// User Test for getting user by id
const userIdForTest = 1;
describe("Test for getting user by id", () => {
  test(`get the ${userIdForTest}st user data`, async () => {
    const res = await request(app).get(`/rest/user/${userIdForTest}`).set('api-key', API_KEY);
    
    const userData = await knex(userTable).select().where({ id : userIdForTest });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: userData,
    });
  });
});

//Book test for getting book by id
const bookIdForTest = 1;
describe("Test for getting book by id", () => {
  test(`get the ${bookIdForTest}st book data`, async () => {
    const res = await request(app).get(`/rest/book/${bookIdForTest}`).set('api-key', API_KEY);

    const bookData = await knex(bookTable).select().where({ id : bookIdForTest });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: bookData
    });
  });
});
