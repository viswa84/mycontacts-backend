const express = require("express");
const {
  getContacts,
  CreateContact,
  GetContactById,
  UpdatetheContact,
  DeleteContactByid,
} = require("../controllers/contactControllers");
const router = express.Router();

router.route("/").get(getContacts).post(CreateContact);
router
  .route("/:id")
  .get(GetContactById)
  .put(UpdatetheContact)
  .delete(DeleteContactByid);

module.exports = router;
