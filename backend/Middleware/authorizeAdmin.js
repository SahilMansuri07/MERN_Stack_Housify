// Middleware to check if user has admin role
const authorizeAdmin = (req, res, next) => {
  try {
    // Check if user exists and has admin role
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required',
        error: 'UNAUTHORIZED'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access required. You do not have permission to access this resource.',
        error: 'FORBIDDEN'
      });
    }

    // User is admin, proceed to next middleware/controller
    next();
  } catch (error) {
    console.error('Admin authorization error:', error);
    return res.status(500).json({
      message: 'Authorization check failed',
      error: 'SERVER_ERROR'
    });
  }
};

export default authorizeAdmin;