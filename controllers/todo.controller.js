let todoList = [
  {
    id: "1660c8d3-2291-4373-a283-78c06f0afdde",
    details: "wake up",
    isCompleted: false,
  },
  {
    id: "b6a4d7d8-35f4-4f34-ad68-24ad5dad3606",
    details: "brush teeth",
    isCompleted: false,
  },
  {
    id: "12be0529-f475-4f19-82e9-f7c070a28564",
    details: "take a bath",
    isCompleted: false,
  },
];

exports.getAllTodoItems = (req, res) => {
  res.json({
    status: "success",
    data: todoList,
  });
};

exports.createTodoItem = (req, res) => {
  const { details } = req.body;
  const item = { id: crypto.randomUUID(), details, isCompleted: false };
  todoList.push(item);

  res.json({ status: "success", data: item });
};

exports.getTodoItem = (req, res) => {
  const { itemId } = req.params;

  const items = todoList.filter((item) => item.id === itemId);

  if (items.length === 0) {
    res.json({ status: "success", data: [] });
  } else {
    res.json({ status: "success", data: items[0] });
  }
};

exports.updateTodoItem = (req, res) => {
  const { itemId } = req.params;
  const { details, isCompleted } = req.body;

  let updatedItem = { details, isCompleted };
  const updatedList = todoList.map((item) => {
    if (item.id === itemId) {
      item = updatedItem = { ...item, ...updatedItem };
    }
    return item;
  });
  todoList = updatedList;

  res.json({ status: "success", data: { message: `Updated item ${itemId}` } });
};

exports.deleteTodoItem = (req, res) => {
  const { itemId } = req.params;

  const updatedList = todoList.filter((item) => item.id !== itemId);
  todoList = updatedList;

  res.json({ status: "success", data: { message: `Deleted item ${itemId}` } });
};
