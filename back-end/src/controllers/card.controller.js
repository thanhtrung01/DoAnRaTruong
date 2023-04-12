const Card = require('../services/card.service');

const create = async (req, res) => {
  // Deconstruct the params
  const { title, listId, boardId } = req.body;
  const user = req.user;

  // Validate the inputs
  if (!(title && listId && boardId))
    return res
      .status(400)
      .send({
        errMessage:
          'The create operation could not be completed because there is missing information',
      });

  //Call the card service
  await Card.create(title, listId, boardId, user, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(201).send(result);
  });
};

const deleteById = async (req, res) => {
  // deconstruct the params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  // Call the card service
  await Card.deleteById(cardId, listId, boardId, user, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

const getCard = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  // Call the card service
  await Card.getCard(cardId, listId, boardId, user, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

const update = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  // Call the card service
  await Card.update(cardId, listId, boardId, user, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

const addComment = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  // Call the card service
  await Card.addComment(
    cardId,
    listId,
    boardId,
    user,
    req.body,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const updateComment = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, commentId } = req.params;

  // Call the card service
  await Card.updateComment(
    cardId,
    listId,
    boardId,
    commentId,
    user,
    req.body,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const deleteComment = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, commentId } = req.params;

  // Call the card service
  await Card.deleteComment(
    cardId,
    listId,
    boardId,
    commentId,
    user,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const addMember = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  // Call the card service
  await Card.addMember(
    cardId,
    listId,
    boardId,
    user,
    req.body.memberId,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const deleteMember = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, memberId } = req.params;

  // Call the card service
  await Card.deleteMember(
    cardId,
    listId,
    boardId,
    user,
    memberId,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const createLabel = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const label = req.body;

  // Call the card service
  await Card.createLabel(
    cardId,
    listId,
    boardId,
    user,
    label,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const updateLabel = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, labelId } = req.params;
  const label = req.body;

  // Call the card service
  await Card.updateLabel(
    cardId,
    listId,
    boardId,
    labelId,
    user,
    label,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const deleteLabel = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, labelId } = req.params;

  // Call the card service
  await Card.deleteLabel(
    cardId,
    listId,
    boardId,
    labelId,
    user,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const updateLabelSelection = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, labelId } = req.params;
  const { selected } = req.body;

  // Call the card service
  await Card.updateLabelSelection(
    cardId,
    listId,
    boardId,
    labelId,
    user,
    selected,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const createChecklist = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const title = req.body.title;

  // Call the card service
  await Card.createChecklist(
    cardId,
    listId,
    boardId,
    user,
    title,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const deleteChecklist = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, checklistId } = req.params;

  // Call the card service
  await Card.deleteChecklist(
    cardId,
    listId,
    boardId,
    checklistId,
    user,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const addChecklistItem = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, checklistId } = req.params;
  const text = req.body.text;

  // Call the card service
  await Card.addChecklistItem(
    cardId,
    listId,
    boardId,
    user,
    checklistId,
    text,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const setChecklistItemCompleted = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;
  const completed = req.body.completed;

  // Call the card service
  await Card.setChecklistItemCompleted(
    cardId,
    listId,
    boardId,
    user,
    checklistId,
    checklistItemId,
    completed,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const setChecklistItemText = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;
  const text = req.body.text;

  // Call the card service
  await Card.setChecklistItemText(
    cardId,
    listId,
    boardId,
    user,
    checklistId,
    checklistItemId,
    text,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const deleteChecklistItem = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;

  // Call the card service
  await Card.deleteChecklistItem(
    cardId,
    listId,
    boardId,
    user,
    checklistId,
    checklistItemId,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const updateStartDueDates = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const { startDate, dueDate, dueTime } = req.body;

  // Call the card service
  await Card.updateStartDueDates(
    cardId,
    listId,
    boardId,
    user,
    startDate,
    dueDate,
    dueTime,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const updateDateCompleted = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const { completed } = req.body;

  // Call the card service
  await Card.updateDateCompleted(
    cardId,
    listId,
    boardId,
    user,
    completed,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const addAttachment = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const { link, name } = req.body;

  // Call the card service
  await Card.addAttachment(
    cardId,
    listId,
    boardId,
    user,
    link,
    name,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const deleteAttachment = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, attachmentId } = req.params;

  // Call the card service
  await Card.deleteAttachment(
    cardId,
    listId,
    boardId,
    user,
    attachmentId,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const updateAttachment = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId, attachmentId } = req.params;
  const { link, name } = req.body;

  // Call the card service
  await Card.updateAttachment(
    cardId,
    listId,
    boardId,
    user,
    attachmentId,
    link,
    name,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

const updateCover = async (req, res) => {
  // Get params
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const { color, isSizeOne } = req.body;

  // Call the card service
  await Card.updateCover(
    cardId,
    listId,
    boardId,
    user,
    color,
    isSizeOne,
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    },
  );
};

module.exports = {
  create,
  deleteById,
  getCard,
  update,
  addComment,
  updateComment,
  deleteComment,
  addMember,
  deleteMember,
  createLabel,
  updateLabel,
  deleteLabel,
  updateLabelSelection,
  createChecklist,
  deleteChecklist,
  addChecklistItem,
  setChecklistItemCompleted,
  setChecklistItemText,
  deleteChecklistItem,
  updateStartDueDates,
  updateDateCompleted,
  addAttachment,
  deleteAttachment,
  updateAttachment,
  updateCover,
};
