const router = require('express').Router();
const { Category, Product } = require('../../models');


//get all categories 
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//finding 1 category at a time
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'no category found!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//creating a category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(
      req.body
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update a category 
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body,{
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found' });
      return;
    }

    res.status(200).json(categoryData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a category
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
