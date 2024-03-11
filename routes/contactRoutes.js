const express = require("express");
const {
  getContacts,
  CreateContact,
  GetContactById,
  UpdatetheContact,
  DeleteContactByid,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/ValidateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(CreateContact);
router
  .route("/:id")
  .get(GetContactById)
  .put(UpdatetheContact)
  .delete(DeleteContactByid);

module.exports = router;
