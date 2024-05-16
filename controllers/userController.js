const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  const { username, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.create({
      username,
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users");
  } catch (err) {
    res.send("Cannot add user!");
    console.error(err);
  }
};

controller.editUser = async (req, res) => {
  const { id, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.update(
      { firstName, lastName, mobile, isAdmin: isAdmin ? true : false },
      { where: { id } },
    );
    res.send("User updated!");
  } catch (err) {
    res.status(401).send("Cannot update user!");
    console.error(err);
  }
};

controller.deleteUser = async (req, res) => {
  try {
    await models.User.destroy({ where: { id: parseInt(req.params.id) } });
    res.send("User deleted");
  } catch (err) {
    res.status(401).send("Cannot delete user!");
    console.error(err);
  }
};

module.exports = controller;
