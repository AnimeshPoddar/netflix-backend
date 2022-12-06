exports.checkIsAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        
        console.log("first")
      throw new Error();
    }
  } catch (err) {
    res.status(401).json({
      message: "You are not authorized to perform thie action.",
    });
  }
};
