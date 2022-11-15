import mongoose from "mongoose";

const dbString = "mongodb://localhost:27017/passport-user-auth-tut";
mongoose
  .connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successful");
  })
  .catch((err) => {
    console.log(err);
  });
