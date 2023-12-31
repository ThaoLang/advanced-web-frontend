// pages/api/auth/login-with-google.ts
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req, res) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/google`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
