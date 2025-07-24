const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};


const isAdmin = (req,res,next) => {
    try {
        console.log(req.user.role);

        if(req.user.role !== "admin")
        {
            return res.status(400).json({message: "Unauthorized. Only admins"});
        }

        next();

    } catch (error) {
        res.status(500).json({message : error});
    }
}

module.exports = {protect, isAdmin};
