import app from "./app";

// Message after server successfully started
const server = app.listen(app.get("port"), () => {
  console.log(
    "Server successfully started at http://localhost:%d",
    app.get("port")
  );
  console.log("Press CTRL-C to stop\n");
});

export default app;
