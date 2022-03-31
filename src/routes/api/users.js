require('dotenv').config();
const KoaRouter = require('koa-router');
const jwtGenerator = require('jsonwebtoken');

const router = new KoaRouter();

function generateJWT(user) {
    return new Promise((resolve, reject) => {
        jwtGenerator.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
            (err, token) => (err ? reject(err) : resolve(token)),
        );
    });
}


router.get('api.users.show', '/:id', async (ctx) => {
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    const token_given = ctx.request.headers.authorization
    const token = await ctx.orm.userToken.findOne({
        where: { token: token_given }
    });

    if (!token || !user) {
        console.log("no hay token")
        ctx.status = 401
        ctx.body = {
            error: "invalid token"
        }
    } else if (token.user_id != user.id) {
        ctx.status = 403
        ctx.body = {
            error: "you do not have access to this resource"
        }
    } else {
        ctx.body = {
            id: user.id,
            username: user.username,
            name: user.name,
            age: user.age,
            psu_score: user.psu_score,
            university: user.university,
            gpa_score: user.gpa_score,
            job: user.job,
            salary: user.salary,
            promotion: user.promotion,
            hospital: user.hospital,
            operations: user.operations,
            medical_debt: user.medical_debt
        }
    };
});


router.post('api.users.create', '/', async (ctx) => {
    try {
        const user = ctx.orm.user.build(ctx.request.body);
        await user.save({
            field: [
                'username',
                'password',
                'name',
                'age',
                'psu_score',
                'university',
                'gpa_score',
                'job',
                'salary',
                'promotion',
                'hospital',
                'operations',
                'medical_debt'
            ]
        });
        console.log(user)
        const token = await generateJWT(user)
        const user_token = ctx.orm.userToken.build({
            token: token,
            user_id: user.id
        })
        console.log(user_token)
        await user_token.save({
            field: [
                'token',
                'user_id'
            ]
        });
        ctx.status = 201;
        ctx.body = {
            id: user.id,
            token: user_token.token
        };
    } catch (Error) {
        console.log(Error);
        if (Error.errors[0].type == "unique violation") {
            ctx.status = 409
            ctx.body = { error: "user already exists" };
        } else {
            ctx.status = 400
            ctx.body = { error: "invalid attributes" };
        };
    };
});

router.patch('api.users.update', '/:id', async (ctx) => {
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    const token_given = ctx.request.headers.authorization
    const token = await ctx.orm.userToken.findOne({
        where: { token: token_given }
    });
    if (!token || !user) {
        console.log("no hay token")
        ctx.status = 401
        ctx.body = {
            error: "invalid token"
        }
    } else if (token.user_id != user.id) {
        ctx.status = 403
        ctx.body = {
            error: "you do not have access to this resource"
        }
    } else {
        const modifications = {
            ...ctx.request.body
        };
        try {
            await ctx.orm.user.update(modifications, {
                where: { id: user.id },
                individualHooks: true,
            });
            const updatedUser = await ctx.orm.user.findByPk(user.id);
            ctx.status = 201
            ctx.body = ctx.body = {
                id: updatedUser.id,
                username: updatedUser.username,
                name: updatedUser.name,
                age: updatedUser.age,
                psu_score: updatedUser.psu_score,
                university: updatedUser.university,
                gpa_score: updatedUser.gpa_score,
                job: updatedUser.job,
                salary: updatedUser.salary,
                promotion: updatedUser.promotion,
                hospital: updatedUser.hospital,
                operations: updatedUser.operations,
                medical_debt: updatedUser.medical_debt
            };
        } catch (Error) {
            if (Error.errors[0].type == "unique violation") {
                ctx.status = 409
                ctx.body = {
                    error: "user already exists"
                }
            } else {
                ctx.status = 400
                ctx.body = {
                    error: "invalid update"
                }
            }
        }
    }
});

router.delete('api.users.delete', '/:id', async (ctx) => {
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    const token_given = ctx.request.headers.authorization
    const token = await ctx.orm.userToken.findOne({
        where: { token: token_given }
    });
    if (!token || !user) {
        ctx.status = 401
        ctx.body = {
            error: "invalid token"
        }
    } else if (token.user_id != user.id) {
        ctx.status = 403
        ctx.body = {
            error: "you do not have access to this resource"
        }
    } else {
        await user.destroy()
        ctx.status = 204
    }
})

module.exports = router;
