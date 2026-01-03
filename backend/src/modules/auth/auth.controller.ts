import { Request, Response } from "express";
import * as AuthService from "./auth.service";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const userRow = await AuthService.login(email, password);

    res.cookie("token", userRow.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successfull",
      user: userRow.user,
    });
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
}

export async function logout(req: Request, res: Response) {
  res.locals.user = null;
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logout successful." });
}

export async function getMe(req: Request, res: Response) {
  try {
    const { userId } = res.locals.user;
    const user = await AuthService.getCurrentUser(userId);
    return res.status(200).json({ id: user.id, email: user.email, role: user.role, name: user.name });
  } catch (error: any) {
    return res.status(404).json({ success: false, message: error.message });
  }
}
