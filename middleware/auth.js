module.exports = {
  authenticator: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('warning_msg', '請先登入後再使用網站')
      return res.redirect('/users/login')
    }
    return next()
  }
}