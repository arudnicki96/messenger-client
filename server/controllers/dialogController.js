const User = require("../models/userModel");
const Dialog = require("../models/dialogModel");

exports.createDialog = async (req, res, next) => {
  const { user_1, user_2 } = req.body;

  const firstUser = await User.findById(user_1);
  const secondUser = await User.findById(user_2);

  const isAlreadyConversation =
    firstUser.dialogs.filter((item) => item.userId === user_2).length > 0 ||
    secondUser.dialogs.filter((item) => item.userId === user_1).length > 0;

  if (isAlreadyConversation) {
    return res.status(400).json({
      status: "failed",
      message: "Dialog cant be created, cause there is already existing one",
    });
  }

  const newConversation = await Dialog.create({ user_1, user_2 });
  const AddToConversation1st = firstUser.addConversation(
    user_2,
    newConversation._id
  );
  const AddToConversation2nd = secondUser.addConversation(
    user_1,
    newConversation._id
  );

  await firstUser.save({ validateBeforeSave: false });
  await secondUser.save({ validateBeforeSave: false });

  res.status(200).json({ status: "success", users: [firstUser, secondUser] });
};

exports.getDialogById = async (req, res, next) => {
  try {
    const dialog = await Dialog.findById(req.params.id);
    res.status(200).json({ dialog });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Dialogue with following id was not found" });
  }
};
