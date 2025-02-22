import jwt from "jsonwebtoken";

/**
 * Generates a JWT token, sets it as a cookie, and sends it in the response.
 * @param {string} userId - The user's unique identifier (usually their ID).
 * @param {object} res - The Express response object.
 */
const generateTokenAndCookie = (userId, res) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token expires in 15 days
  });

  // Set the token as a cookie in the response
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Cookie is accessible only by the server
    sameSite: "strict", // Helps prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development", // Ensures cookie is sent over HTTPS in production
  });
};

export default generateTokenAndCookie;
