import { User } from "../models/User";

export async function newUser(
  email: string,
  username: string,
  password: string
) {
  if (!email && !username && !password) {
    console.log("bad request");
    throw new Error("bad request");
  }
  try {
    const newuser = await User.create({
      email,
      username,
      password,
    });
    return newuser;
  } catch (e) {
    console.log(e);
  }
}

export async function delUser(email: string) {
  const usr = await User.findOne({ email: email });
  if (!usr) {
    throw new Error("user not found");
  }
  try {
    await User.findByIdAndDelete(usr.id);
    console.log("deletd successfully");
    return { success: true, message: "user deleted successfully" };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}
