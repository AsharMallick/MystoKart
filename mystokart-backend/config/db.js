const mongoose = require("mongoose");

exports.connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.MONGO_URI, {
        dbName:"MystocKart"
    })
    .then(() => console.log(`DB connected`))
    .catch((e) => console.log(`Some error occured => ${e}`));
};
