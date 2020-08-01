const Type = require('../models/Type');
const fs = require('fs');

exports.createType = (req, res, next) => {
    const typeObject = JSON.parse(req.body.sauce);
    delete typeObject._id;
    const type = new Type({
      ...typeObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  
    });
    type.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.modifyType = (req, res, next) => {
    const typeObject = req.file ?
    {
      ...JSON.parse(req.body.type),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Type.updateOne({ _id: req.params.id }, { ...typeObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.deleteType =(req, res, next) => {
    Type.findOne({ _id: req.params.id })
      .then(type => {
        const filename = type.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
         Type.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.getOneType = (req, res, next) => {
    Type.findOne({ _id: req.params.id })
      .then(type => res.status(200).json(type))
      .catch(error => res.status(404).json({ error }));
  }

  exports.getAllType = (req, res, next) => {
    Type.find()
      .then(types => res.status(200).json(types))
      .catch(error => res.status(400).json({ error }));
  }
