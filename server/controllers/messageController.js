const Message = require("./../models/messageModel");

exports.createMessage = async (req, res, next) => {
  const newMessage = await Message.create({
    createdBy: req.body.createdBy,
    text: req.body.text,
    dialogId: req.body.dialogId,
  });

  res.status(201).json({ status: "success", message: { newMessage } });
};

exports.getAllDialogMessages = async (req, res, next) => {
  const Messages = await Message.find({ dialogId: req.params.id });
  res.status(200).json({ Messages });
};
