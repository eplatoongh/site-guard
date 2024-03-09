const { default: mongoose } = require("mongoose");
const Client = require("../../../models/admin/Client");
const Guard = require("../../../models/admin/Guard");
const Site = require("../../../models/admin/Site");
const Schedule = require("../../../models/admin/Schedule");

const adminFunctions = {};

{
  adminFunctions.addData = async (req, res, Model) => {
    let createdObj = await Model.create(req.body);

    res.status(200).json(createdObj);
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
      await Guard.findOneAndUpdate(
        { guardName },
        { $push: { works: req.body } }
      );
      await Work.create(req.body);

      res.status(200).json({ done: 1 });
    } else {
      res.status(404).json(fObj);
    }
  };
  adminFunctions.ifExistsName = async (req, res, Model) => {
    let data = await Model.findOne(req.body);

    if (data) {
      res.status(200).json({ found: 1, id: data._id });
    } else {
      res.status(404).json({ found: 0 });
    }
  };
  adminFunctions.postSiteGuardWorkAdd = async (req, res) => {
    await Client.updateOne(
      { "postSites.guards._id": req.body.guardID },
      {
        $push: {
          "postSites.$[].guards.$[].assignedWorks": req.body,
        },
      }
    );

    res.status(200).json({ done: 1 });
  };
  adminFunctions.scheduleAdd = async (req, res) => {
    await Schedule.create(req.body);

    res.status(200).json({ done: 1 });
  };
  adminFunctions.scheduleWorkDone = async (req, res) => {
    await Schedule.findByIdAndUpdate(req.body.id, { workDone: req.body.done });

    res.status(200).json({ done: 1 });
  };
  adminFunctions.clientReport = async (req, res) => {
    let data = await Schedule.find(
      {
        postSiteID: req.body.postSiteID,
        guardID: req.body.guardID,
        workDate: { $gte: req.body.startDate, $lte: req.body.endDate },
        workDone: true,
      },
      "totalHour workDone workDate"
    ).sort({ createdAt: -1 });

    res.status(200).json(data);
  };
}

module.exports = adminFunctions;
