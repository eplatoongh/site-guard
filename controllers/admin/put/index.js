const { default: mongoose } = require("mongoose");
const Client = require("../../../models/admin/Client");
const Guard = require("../../../models/admin/Guard");
const Schedule = require("../../../models/admin/Schedule");

const adminFunctions = {};

{
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
  adminFunctions.updateTrackInfo = async (req, res) => {
    console.log(req.body);

    let ScheduleData = await Schedule.findByIdAndUpdate(req.body.id, {
      $set: {
        trackInfo: req.body.tracks,
      },
    });

    await Guard.findOneAndUpdate(
      { _id: ScheduleData.guardID },
      {
        $set: {
          trackInfo: req.body.tracks,
        },
      }
    );

    res.status(200).json({ done: 1 });
  };
}

module.exports = adminFunctions;
