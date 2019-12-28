const router = require('express').Router();
let User = require('../models/users.model');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const option = req.body.option;
    const birthday = req.body.birthday;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const newUser = new User({
        name,
        surname,
        option,
        birthday,
        startDate,
        endDate
    });

    newUser.save()
        .then(() => res.json('Member added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.endDate = req.body.newDate;
            user.option = req.body.option;

            user.save()
                .then(() => res.json('Membership updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Member deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;