import jwt from "jsonwebtoken";

const authenticationToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Access token denied: No token provided" });
    }

    // Check if header starts with 'Bearer '
    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          message:
            "Access token denied: Invalid token format. Use 'Bearer <token>'",
        });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Check if token exists after 'Bearer '
    if (!token || token === "null" || token === "undefined") {
      return res
        .status(401)
        .json({
          message: "Access token denied: No token provided after Bearer",
        });
    }

    // Verify JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET environment variable is not set");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);

    // Handle specific JWT errors
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token format" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired" });
    } else if (err.name === "NotBeforeError") {
      return res.status(403).json({ message: "Token not active yet" });
    } else {
      return res.status(403).json({ message: "Token verification failed" });
    }
  }
};

export default authenticationToken;
