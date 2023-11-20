const Client = require("../models/admin/Client");
const Guard = require("../models/admin/Guard");
const Site = require("../models/admin/Site");
const Work = require("../models/admin/Work");

const adminFunctions = {};

//get
adminFunctions.getLimitedData = async (req, res, Model) => {
  let { skip, limit } = req.params;

  let data = await Model.find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json(data);
};
adminFunctions.getGuardByName = async (req, res, Model) => {
  let { nameData, month } = req.params;
  let gte = `${month}-01`;
  let lte = `${month}-31`;

  let filteredTs1 = await Model.aggregate([
    {
      $match: {
        guardName: nameData,
      },
    },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        guardName: 1,
        works: {
          $filter: {
            input: "$works",
            as: "works",
            cond: {
              $and: [
                { $gte: ["$$works.date", gte] },
                { $lte: ["$$works.date", lte] },
              ],
            },
          },
        },
      },
    },
  ]);

  res.status(200).json(filteredTs1[0]);
};
adminFunctions.getClientguards = async (req, res) => {
  let { clientName } = req.params;
  let data = await Guard.find({ "works.clientName": clientName }, "guardName");

  res.status(200).json(data);
};
//post
adminFunctions.addData = async (req, res, Model) => {
  let data = await Model.findOne(req.body);

  if (data == null) {
    await Model.create(req.body);

    res.status(200).json({ done: 1 });
  } else {
    res.status(451).send("duplicate data found!");
  }
};
adminFunctions.workAdd = async (req, res) => {
  let { clientName, siteName, guardName } = req.body;

  let cFound = await Client.findOne({ clientName });
  let sFound = await Site.findOne({ siteName });
  let gFound = await Guard.findOne({ guardName });

  let fObj = {};

  if (!cFound) {
    fObj.clientName = `Client name not found!`;
  }
  if (!sFound) {
    fObj.siteName = `Site name not found!`;
  }
  if (!gFound) {
    fObj.guardName = `Guard name not found!`;
  }

  if (Object.keys(fObj).length == 0) {
    await Guard.findOneAndUpdate({ guardName }, { $push: { works: req.body } });
    await Work.create(req.body);

    res.status(200).json({ done: 1 });
  } else {
    res.status(404).json(fObj);
  }
};
adminFunctions.ifExistsName = async (req, res, Model) => {
  let data = await Model.findOne(req.body);

  if (data) {
    res.status(200).json({ found: 1 });
  } else {
    res.status(404).json({ found: 0 });
  }
};
//delete
adminFunctions.deleteData = async (req, res, Model, type) => {
  try {
    if (type == "guard") {
      await Work.deleteMany({ guardName: req.params.guardName });
    }

    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ done: 1 });
  } catch (error) {
    res.status(404).json(error);
  }
};
//update
adminFunctions.updateReport = async (req, res) => {
  await Guard.updateOne(
    { guardName: req.body.guardName, "works._id": req.body.workId },
    {
      $set: {
        "works.$.totalWorked": req.body.totalWorked,
        "works.$.reportLeft": false,
      },
    }
  );

  await Work.updateOne(
    {
      guardName: req.body.guardName,
      date: req.body.date,
      shift: req.body.shift,
    },
    {
      $set: { totalWorked: req.body.totalWorked },
    }
  );

  res.status(200).json({ done: 1 });
};
//exports
module.exports = adminFunctions;
