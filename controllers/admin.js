const { default: mongoose } = require("mongoose");
const Client = require("../models/admin/Client");
const Guard = require("../models/admin/Guard");
const Site = require("../models/admin/Site");
const Schedule = require("../models/admin/Schedule");

const adminFunctions = {};

//get
adminFunctions.getLimitedData = async (req, res, Model, type) => {
  let { skip, limit } = req.params;
  let data;

  if (type == "guard") {
    data = await Model.aggregate([
      {
        $lookup: {
          from: "clients", // Target collection (Client model)
          localField: "guardName",
          foreignField: "postSites.guards.guardName",
          as: "clientInfo",
        },
      },
      {
        $project: {
          guardName: 1,
          address: 1,
          contact: 1,
          createdAt: 1,
          "clientInfo.clientName": 1,
          "clientInfo.postSites.name": 1,
          "clientInfo.postSites.guards.guardName": 1,
        },
      },
    ])
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ createdAt: -1 });
  } else {
    data = await Model.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });
  }

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
adminFunctions.getEachClientGuards = async (req, res) => {
  let { nameData, month, clientName } = req.params;
  let gte = `${month}-01`;
  let lte = `${month}-31`;

  let filteredTs1 = await Guard.aggregate([
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
                { $eq: ["$$works.clientName", clientName] },
              ],
            },
          },
        },
      },
    },
  ]);

  res.status(200).json(filteredTs1[0]);
};
adminFunctions.getAclient = async (req, res) => {
  let { id } = req.params;
  let aClient = await Client.findById(
    id,
    "_id clientName address contact createdAt postSites.name postSites.address postSites.contact postSites._id postSites.createdAt postSites.guards.guardName postSites.guards.address postSites.guards.contact postSites.guards.clientID postSites.guards.postSiteID postSites.guards.postSiteID postSites.guards._id postSites.guards.createdAt"
  );
  res.status(200).json(aClient);
};
adminFunctions.getClientsWithPostSite = async (req, res) => {
  let data = await Client.aggregate([
    {
      $project: {
        clientName: 1,
        postSites: {
          $map: {
            input: "$postSites",
            as: "site",
            in: {
              _id: "$$site._id",
              name: "$$site.name",
              guards: {
                $map: {
                  input: "$$site.guards",
                  as: "guards",
                  in: {
                    _id: "$$guards._id",
                    guardName: "$$guards.guardName",
                    address: "$$guards.address",
                    contact: "$$guards.contact",
                  },
                },
              },
            },
          },
        },
      },
    },
  ]);

  res.status(200).json(data);
};
adminFunctions.getGuardsFromPostSite = async (req, res) => {
  let data = await Guard.find({
    clientID: req.params.clientID,
    postSiteID: req.params.postSiteID,
  });

  res.status(200).json(data);
};
adminFunctions.getWorksOfAguard = async (req, res) => {
  let { clientID, postSiteID, guardID } = req.params;

  let data = await Client.aggregate([
    {
      $unwind: "$postSites", // Flatten the postSites array
    },
    {
      $match: {
        "postSites._id": new mongoose.Types.ObjectId(postSiteID),
      },
    },
    {
      $project: {
        "postSites.guards": {
          $filter: {
            input: "$postSites.guards",
            as: "guard",
            cond: {
              $eq: ["$$guard._id", new mongoose.Types.ObjectId(guardID)],
            },
          },
        },
      },
    },
  ]);

  res.status(200).json(data);
};
adminFunctions.getSchedule = async (req, res) => {
  let { date, skip, limit } = req.params;

  let data = await Schedule.find({ workDate: date })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json(data);
};
//post
adminFunctions.addData = async (req, res, Model, type) => {
  let data = await Model.findOne(req.body);

  if (data == null) {
    if (type == "guard") {
      await Client.findOneAndUpdate(
        { _id: req.body.clientID, "postSites._id": req.body.postSiteID },
        {
          $push: { "postSites.$.guards": req.body },
        }
      );
    }

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
adminFunctions.updateClientAddPostSite = async (req, res) => {
  await Client.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: { postSites: req.body.obj },
    }
  );

  res.status(200).json({ done: 1 });
};
adminFunctions.updateTimeReport = async (req, res) => {
  await Schedule.findByIdAndUpdate(req.body.id, {
    $set: {
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      totalHour: req.body.totalHour,
    },
  });

  res.status(200).json({ done: 1 });
};
//exports
module.exports = adminFunctions;
