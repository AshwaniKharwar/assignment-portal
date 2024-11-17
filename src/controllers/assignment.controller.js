import { Assignment } from "../models/assignment.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const assignmentUpload = async (req, res) => {
  // get data from req
  const { task, email } = req.body;

  // validate data
  if (!task | !email) {
    return res.status(401).json({
      success: false,
      message: "All Field are Required",
    });
  }
  console.log(`req data : ${email}`)
  try {
    // check admin exist
    const existAdmin = await User.findOne({ email });
    if (!existAdmin | existAdmin.role != 'admin') {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    // create entry in db
    const assignment = new Assignment({
      userId: new mongoose.Types.ObjectId(req.user._id),
      task,
      admin: existAdmin._id,
    });
    await assignment.save();

    // return response
    return res.status(201).json({
      success: true,
      message: "assignment uploaded",
      assignment,
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
        success: false,
        message: "Server Error",
      });
  }
};

export const getAssignments = async (req, res) => {
  try {
    // fetch all assignment
    const assignments = await Assignment.find({ admin: req.user.id });

    // return response
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      assignments,
    });
  }
};
