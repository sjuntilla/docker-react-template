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

router.route('/kanban/:id')
  .post((req, res) => {
    return new req.database.User().where("id", req.params.id).fetch().then(card => new req.database.User({ id: req.params.id }).save({
      title: req.body.title,
      author: req.body.author,
      message: req.body.message,
      status: req.body.status
    }, { patch: true })
      .then(() => { return res.json({ success: true }) }))
  })
  .delete((req, res) => {
    return new req.database.User().where("id", req.params.id).destroy().then(data => {
      return res.json({ success: true }).redirect('/');
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
  })

router.route('/kanban/delete/:id')
  .post((req, res) => {
    return new req.database.User().where("id", req.params.id).destroy().then(data => {
      console.log('Task deleted.', data)
      return res.redirect('/');
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
  })

module.exports = router;