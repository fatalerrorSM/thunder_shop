import got from "got";

test("GET /home", () => {
  got(`http://localhost:${process.env.PORT}`).then(res => {
    expect(res.statusCode).toBe(200);
  });
});
