const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token')

  //check if not token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, please log in' }] })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()
  } catch (error) {
    return res.status(401).json({
      errors: [{ msg: 'Token is not valid' }],
    })
  }
}
