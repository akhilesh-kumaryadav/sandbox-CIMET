import request from "supertest";
import { createApp } from "../src/index";
import express from "express";

let app: express.Application;
beforeAll(() => {
  app = createApp(3001);
});

describe("Test user API", () => {
  test("get the 1st user data", async () => {
    const res = await request(app).get("/rest/user/1").set('api-key', 'api_key_1');;
    expect(res.body).toEqual({
      data: [{ id: 1, firstName: "John", lastName: "Doe", gender: "male" }],
    });
  });
});

// Todo: write tests here
