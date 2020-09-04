let db = require('../../db/models');

let apiUsersController = {

    list: (req, res) => {

        let allUsers = db.User.findAll();

        let users = db.User.findAll({
            offset: Number(req.query.page) * 10 || 0,
            limit: 10
        })

        Promise.all([allUsers, users])
            .then(([allUsers, users]) => {

                users.forEach(user => {
                    user.setDataValue('endpoint', '/api/users/' + user.id);
                });

                let respuesta = {
                    meta: {
                        status: 200,
                        url: "/api/users",
                        page: req.query.page,
                        users_per_page: 10,
                        total_users: allUsers.length,
                        total_pages: Math.ceil(allUsers.length / 10)
                    },
                    data: users
                }

                res.json(respuesta);
            })

            .catch(err => {
                res.json({
                    error: true
                })
            })
    },
    detail: (req, res) => {
        db.User.findOne({
            include: ['phone', 'address'],
            where: {id: req.params.id}
        })
        .then(userDetail => {
            if (userDetail) {
                userDetail.setDataValue('endpoint', '/api/users/' + userDetail.id);

                let respuesta = {
                    meta: {
                        status: 200,
                        url: `/api/users/${userDetail.id}`
                    },
                    data: userDetail
                }

                res.json(respuesta);
            } else {
                res.json('no-encontrado');
            }
        })
        .catch(errors => {
            console.log(errors);
            res.send('Error!!!');
        })

    }/* ,
    update: (req, res) => {
        db.User.update({
            name: req.body.name,
            last_name: req.body.lastname,
            phone: {
                cell_phone: req.body.cell_phone,
                cell_phone_2: req.body.phone,
                phone: req.body.cell_phone_2,
            }
        },
        {
            where:{
                id: req.params.id
            }
        },
        {
            include: ['phone']
        })
    } */
}

module.exports = apiUsersController;

// {
//     model: Address,
//     through: {
//       attributes: ['user_id'],
//     }
// }                  },