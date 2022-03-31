require('dotenv').config()
const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');

const router = new KoaRouter();

function generateToken(user) {
    return new Promise((resolve, reject) => {
        jwtgenerator.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
            (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
        );
    });
};

router.post('api.auto.login', '/', async (ctx) => {
    const { username, password } = ctx.request.body;
    const user = await ctx.orm.user.findOne({ where: { email } });
    if (!user) ctx.throw(404, "no user found with ${username}");
    const authenticated
});

module.exports = router;