const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('api.users.show', '/:id', async (ctx) => {
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    if (!user) {
        ctx.throw(404, "User does not exists");
    }
    ctx.body = user;
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
        ctx.status = 201;
        ctx.body = user;
    } catch (ValidationError) {
        ctx.throw(404, ValidationError);
    }
});

module.exports = router;
