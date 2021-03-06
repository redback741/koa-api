const { createUser } = require("../service/user.service");
const {userRegisterError} = require("../constant/err.type");

class USerController {
  async reqister(ctx, next) {
    // 获取数据
    const {user_name,password} = ctx.request.body;

    // if (!user_name || !password) {
    //   console.error('用户名或密码为空', ctx.request.body)
    //   ctx.status= 400;
    //   ctx.body = {
    //     code: '10001',
    //     message: '用户名或密码为空',
    //     result: ''
    //   }
    //   return
    // }

    // 查询注册用户是否存在
    // if(getUserInfo({user_name})) {
    //   ctx.status= 409;
    //   ctx.body = {
    //     code: '10002',
    //     message: '用户名已存在',
    //     result: ''
    //   }
    //   return
    // }

    // 操作数据库
    try {
      const res = await createUser(user_name,password);
      // 返回结果
      ctx.body ={
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      };
    } catch(err) {
      console.log(err);
      ctx.app.emit('error', userRegisterError, ctx);
    }
    
  }

  async login(ctx, next) {
    ctx.body = '用户登录';
  }
}

module.exports = new USerController();
