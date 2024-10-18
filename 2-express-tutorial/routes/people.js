const express = require('express');
const router = express.Router();

const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require('../controllers/people');

/* No need to have /api/people for base route because app.js peopleRouter already uses it - can just have / instead
 */

// router.get('/', getPeople);

// router.post('/', createPerson);

// // using postman :)
// router.post('/postman', createPersonPostman);

// router.put('/:id', updatePerson);

// router.delete('/:id', deletePerson);

// another way to setup routes (same functionality, fewer lines) -

router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
