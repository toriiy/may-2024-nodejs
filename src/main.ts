import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api.error";
import { userRouter } from "./routers/user.router";
// import { readFile, writeFile } from "./fs.service";
// import { IUser } from "./interfaces/user.interface";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/users", userRouter);

// app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = JSON.parse(await readFile());
//     res.json(users);
//   } catch (e) {
//     next(e);
//   }
// });
//
// app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = req.body;
//     console.log(user);
//     if (!user.name || user.name.length < 3) {
//       throw new ApiError(
//         "Name is required and should be minimum 3 symbols",
//         400,
//       );
//     }
//     if (!user.email || !user.email.includes("@")) {
//       throw new ApiError("Email is invalid", 400);
//     }
//     if (!user.password || user.password.length < 8) {
//       throw new ApiError(
//         "Password is required and should be minimum 8 symbols",
//         400,
//       );
//     }
//     const users = JSON.parse(await readFile());
//     const newUser = {
//       id: users.length ? users[users.length - 1].id + 1 : 1,
//       name: user.name,
//       email: user.email,
//       password: user.password,
//     };
//     users.push(newUser);
//     await writeFile(users);
//     res.sendStatus(201);
//   } catch (e) {
//     next(e);
//   }
// });
//
// app.get(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const params = req.params;
//       const users = JSON.parse(await readFile());
//       const user = users.find(
//         (user: IUser) => user.id === Number(params.userId),
//       );
//       if (!user) {
//         throw new ApiError("User not found", 404);
//       }
//       res.json(user);
//     } catch (e) {
//       next(e);
//     }
//   },
// );
//
// app.delete(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const params = req.params;
//       console.log(params);
//       const users = JSON.parse(await readFile());
//       const filteredUsers = users.filter(
//         (user: IUser) => user.id !== Number(params.userId),
//       );
//       await writeFile(filteredUsers);
//       res.sendStatus(204);
//     } catch (e) {
//       next(e);
//     }
//   },
// );
//
// app.put(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const params = req.params;
//       console.log(params);
//       const body = req.body;
//       console.log(body);
//       if (!body.name || body.name.length < 3) {
//         throw new ApiError(
//           "Name is required and should be minimum 3 symbols",
//           400,
//         );
//       }
//       if (!body.email || !body.email.includes("@")) {
//         throw new ApiError("Email is invalid", 400);
//       }
//       if (!body.password || body.password.length < 8) {
//         throw new ApiError(
//           "assword is required and should be minimum 8 symbols",
//           400,
//         );
//       }
//       const users = JSON.parse(await readFile());
//       for (const user of users) {
//         if (user.id === Number(params.userId)) {
//           user.name = body.name;
//           user.email = body.email;
//           user.password = body.password;
//         }
//       }
//       await writeFile(users);
//       res.sendStatus(201);
//     } catch (e) {
//       next(e);
//     }
//   },
// );

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const message = err.message ?? "Something went wrong";
    const status = err.status ?? 500;
    res.status(status).json({ status, message });
  },
);
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception", error.message);
  process.exit(1);
});

app.listen(5000);
