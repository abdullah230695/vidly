const request = require("supertest");
const { Genre } = require("../../models/genre");
let server;

describe("api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("it should return all genres", async () => {
      const res = await request(server).get("/api/genres");
      //   console.log("genres result : ", res.body);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /:id", () => {
    it("it should return given id details", async () => {
      const res = await request(server).get(
        "/api/genres/6516f04d45d3e629003c034c"
      );
      console.log("genres result by id: ", res.body);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /create", () => {
    it("it should create a genre", async () => {
      const genre = await new Genre({ name: "new genre" });
      await genre.save();

      const res = await request(server).get("/api/genres");
      console.log("genre created successfully: ", res.body[res.body.length - 1]);
      expect(res.status).toBe(200);
    });
  });
});
