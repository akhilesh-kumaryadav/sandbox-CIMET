import request from "supertest";
import { createApp } from "../src/index";
import express from "express";

let app: express.Application;
beforeAll(() => {
  app = createApp(3001);
});

// User Test for getting user by id
describe("Test for getting user by id", () => {
  test("get the 1st user data", async () => {
    const res = await request(app).get("/rest/user/1").set('api-key', 'api_key_1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [{ id: 1, firstName: "John", lastName: "Doe", gender: "male" }],
    });
  });
});

//Book test for getting book by id
describe("Test for getting book by id", () => {
  test("get the 1st book data", async () => {
    const res = await request(app).get("/rest/book/1").set('api-key', 'api_key_1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [{ id: 1, title: "Book 1", summary: "Summary 1" }],
    });
  });
});
