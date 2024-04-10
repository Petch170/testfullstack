import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import dataClient from "./database/database.mjs";
import { ObjectId } from "mongodb";
import fs from "fs";
import { upload } from "./Middleware/Multer.js";
import bodyParser from "body-parser";

const app = express();
const port = process.env.SERVER_PORT || 3000;
// const hostname =process.env.SERVER_IP || 'localhost'

dotenv.config();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

let users = [
  {
    id: 1,
    firstname: "Somsak",
    lastname: "Deemak",
    gender: "Male",
    birthday: "13/06/2000",
    image: "base_64_1",
  },
  {
    id: 2,
    firstname: "Manee",
    lastname: "Deedee",
    gender: "female",
    birthday: "21/01/2001",
    image: "base_64_2",
  },
];

// photo
// app.post('/upload',async(req,res)=>{
//  try {
//     const newImage = await dataClient.db().collection('users').insertOne({
//         imageData:req.file.buffer.to('base64')
//     })

//     res.status(200).json({msg:'upload'})
//  } catch (error) {
//     res.status(200).json(error)
//  }
// try {
//     const imageFile = fs.readFileSync(req.file.path,'base64')
//     res.status(200).send('Image upload success')
// } catch (error) {
//     res.status(500).send(error)
// }
// })

//get all user & test mongo
app.get("/users", async (req, res) => {
  // res.status(200).json(users);
  try {
    const data = await dataClient.db().collection("users").find().toArray();
    data.forEach((user) => {
      user.birthday = new Date(user.birthday).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// const { nameSurname } = req.params;
// const foundUser = users.filter(
//     (user) =>
//         user.firstname === nameSurname || user.lastname === nameSurname
// );
// console.log(nameSurname);
// console.log(foundUser);
// console.log(foundUser.length);
// console.log(foundUser.length !== 0);
// if (foundUser.length !== 0) {
//     res.status(200).json(...foundUser);
// } else {
//     res.status(404).json({ message: "User not found" });
// }
app.get("/users/:nameSurname", async (req, res) => {
  try {
    const nameSurname = req.params.nameSurname.toLocaleLowerCase();
    const findUser = await dataClient
      .db()
      .collection("users")
      .findOne({
        $or: [
          { firstname: { $regex: nameSurname, $options: "i" } },
          { lastname: { $regex: nameSurname, $options: "i" } },
        ],
      });
    if (findUser) {
      res.status(200).json(findUser);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// console.log(nameSurname);
// console.log(findUser);
// res.status(200).json(findUser);

app.post("/users", upload, async (req, res) => {
  try {
    const body = req.body;
    if (req.file) {
      body.profileImage = req.file.filename;
    }
    console.log(body);
    // users.push(body);
    await dataClient.db().collection("users").insertOne(body);
    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send(error);
  }
});

// const userIndex = users.findIndex((user) => user.id === Number(id));
// console.log(userIndex);
// if (userIndex !== -1) {
//     users[userIndex].firstname =
//         body.firstname || users[userIndex].firstname;
//     users[userIndex].lastname =
//         body.lastnamelast || users[userIndex].lastname;
//     users[userIndex].gender = body.gender || users[userIndex].gender;
//     users[userIndex].birthday = body.birthday || users[userIndex].birthday;
//     users[userIndex].image = body.image || users[userIndex].image;
// }
app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const body = req.body;
    // console.log(body);
    const updateUser = await dataClient
      .db()
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: body });
    console.log(updateUser);
    res.status(200).json("success");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  // const newUsers = users.filter((user) => user.id !== Number(id));
  // users = newUsers;
  try {
    const id = req.params.id;
    console.log(id);
    const delUser = await dataClient
      .db()
      .collection("users")
      .findOneAndDelete({ _id: new ObjectId(id) });
    console.log(delUser);
    res.status(200).json(delUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`connect backend on http://localhost:${port}`);
  console.log(`database connect name=> ${dataClient.db().databaseName}`);
});
