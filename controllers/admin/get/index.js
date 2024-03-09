const { default: mongoose } = require("mongoose");
const Client = require("../../../models/admin/Client");
const Guard = require("../../../models/admin/Guard");
const Schedule = require("../../../models/admin/Schedule");

const adminFunctions = {};

{
  adminFunctions.getLimitedData = async (req, res, Model, type) => {
    let { skip, limit, clientID, postSiteID } = req.params;
    let data;

    if (type == "guard") {
      data = await Model.find({ clientID, postSiteID })
        .skip(Number(skip))
        .limit(Number(limit))
        .sort({ createdAt: -1 });
    } else {
      if (type == "site") {
        data = await Model.find({ clientID })
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });
      } else {
        data = await Model.find({})
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });
      }
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
    let data = await Guard.find(
      { "works.clientName": clientName },
      "guardName"
    );

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
    let { date } = req.params;

    let data = await Schedule.find({ workDate: date }).sort({ createdAt: -1 });

    res.status(200).json(data);
  };
  adminFunctions.getScheduleGuard = async (req, res) => {
    let { guardId } = req.params;

    let data = await Schedule.findOne({ guardID: guardId });

    res.status(200).json(data);
  };
}

module.exports = adminFunctions;
