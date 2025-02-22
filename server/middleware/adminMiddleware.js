export const adminMiddleware = (req, res, next) => {
    const user = req.user; // Assuming `authMiddleware` attaches the user to `req.user`
  
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  
    next();
  };