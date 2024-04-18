const TodoItem = require("../models/TodoItem");

exports.getAllTodoItems = async (req, res) => {
  try {
    const { isCompleted } = req.query;

    const query = {};
    if (isCompleted !== undefined) {
      query.isCompleted = isCompleted === "true";
    }

    const items = await TodoItem.find(query);

    res.status(200).json({
      status: "success",
      data: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed fetching all todo items",
    });
  }
};

exports.createTodoItem = async (req, res) => {
  try {
    const { details } = req.body;
    const item = new TodoItem({
      details,
      isCompleted: false,
    });

    const newItem = await item.save();
    res.json({
      status: "success",
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed creating new todo item",
    });
  }
};

exports.getTodoItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await TodoItem.findById(itemId);
    res.json({ status: "success", data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed fetching todo item",
    });
  }
};

exports.updateTodoItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { details, isCompleted } = req.body;
    const item = await TodoItem.findById(itemId);

    if (!item) {
      return res.status(404).send({
        status: "fail",
        message: "Todo item not found",
      });
    }

    if (details !== undefined) {
      item.details = details;
    }

    if (isCompleted !== undefined) {
      item.isCompleted = isCompleted;
    }

    await item.save();

    res.status(200).send({
      status: "success",
      message: "Todo item successfully updated.",
      data: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed updating todo item",
    });
  }
};

exports.deleteTodoItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await TodoItem.findByIdAndDelete(itemId);

    if (!item) {
      return res.status(404).send({
        status: "fail",
        message: "Todo item not found",
      });
    }

    res.status(200).send({
      status: "success",
      message: "Todo item successfully deleted.",
      data: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed deleting todo item",
    });
  }
};
