let db = require('../../db/models')

let apiUsersController = {

    list: (req, res) => {
        db.User.findAll()
        .then(users => {
            users.forEach(user => {
                user.setDataValue('endpoint', '/api/users/' + user.id)
            });

            let respuesta = {
                meta: {
                    status: 200,
                    total: users.length,
                    url: "/api/movies"
                },
                data: users
            }

            res.json(respuesta)
        })
        .catch(errors => {
            console.log(errors)
            res.send('Error!!!')
        })

    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id, {
            include: [{
                model: Address,
                where: { user_id: Sequelize.col('addresses.user_id') }
            }]
        })
        .then(userDetail => {
            if(userDetail) {
                userDetail.setDataValue('endpoint', '/api/users/' + userDetail.id)

                let respuesta = {
                    meta: {
                        status: 200,
                        url: `/api/users/${userDetail.id}`
                    },
                    data: userDetail
                }

                res.json(respuesta)
            } else {
                res.json('no-encontrado');
            }
        })
        .catch(errors => {
            console.log(errors)
            res.send('Error!!!')
        })

    }
}

module.exports = apiUsersController

// {
//     model: Address,
//     through: {
//       attributes: ['user_id'],
//     }
// }