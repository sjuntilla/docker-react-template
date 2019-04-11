const express = require('express');
const router = express.Router();

router.route('/kanban')
  .get((req, res) => {
    return new req.database.User().fetchAll()
      .then((kanban) => {
        return res.json(kanban);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    console.log(req.body);
    return new req.database.User(req.body).save()
      .then((user) => {
        return res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  })

router.route('/kanban/delete')
  .post((req, res) => {
    let id = req.body.flag;
    return new req.database.User().where({ id }).destroy().then(data => {
      return res.json({ success: true });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
  });

module.exports = router;