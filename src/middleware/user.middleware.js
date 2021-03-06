const { getUserInfo } = require("../service/user.service");
const { userFormateError, userAlreadyExited } = require("../constant/err.type");
const {userRegisterError} = require("../constant/err.type");
 
const userValidator = async (ctx, next) => {
  const {user_name,password} = ctx.request.body;
  // 合法性
  if (!user_name.trim() || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const {user_name} = ctx.request.body;
  // if( await getUserInfo({user_name})) {
  //   ctx.app.emit('error', userAlreadyExited, ctx);
  //   return;
  // }

  try {
    const res = await getUserInfo({user_name});
    if (res) {
      console.error('用户名已存在', {user_name});
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }
   await next();
  } catch(err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('error', userRegisterError, ctx);
    return;
  }

};

module.exports = {
  userValidator,
  verifyUser
};