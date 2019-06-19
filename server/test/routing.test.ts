import got from "got";

test("GET /home", () => {
  got(`http://localhost:${process.env.PORT}`).then(res => {
    expect(res.statusCode).toBe(200);
  });
});

test("GET /items", () => {
  got(`http://localhost:${process.env.PORT}/items`).then(res => {
    expect(res.statusCode).toBe(200);
  });
});

test("GET /categories", () => {
  got(`http://localhost:${process.env.PORT}/categories`).then(res => {
    expect(res.statusCode).toBe(200);
  });
});

test("GET /orders", () => {
  got(`http://localhost:${process.env.PORT}/orders`).then(res => {
    expect(res.statusCode).toBe(200);
  });
});

