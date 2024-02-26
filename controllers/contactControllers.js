//@desc all contacts
//@route get/api/contacts
//@access public

const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

//@desc Create new contact
//@route POST /api/contacts
//@access public

const CreateContact = (req, res) => {
  console.log(req.body, "this is  the requested body from the client ");
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All the fields are Mandatoy !");
  }
  res.status(201).json({ message: "Created Contact" });
};
//@desc Contact by Id
//@route get /api/contacts
//@access public

const GetContactById = (req, res) => {
  res.status(200).json({ message: `Get ${req.params.id} By Contact` });
};
//@desc Update the contact by Id
//@route put /api/contacts
//@access public

const UpdatetheContact = (req, res) => {
  res.status(200).json({ message: `Update contact for the ${req.params.id}` });
};

//@desc delete the contactById
//@route delete /api/contact
//aaccess public
const DeleteContactByid = (req, res) => {
  res.status(200).json({ message: `Delete contact for the ${req.params.id}` });
};

module.exports = {
  getContacts,
  CreateContact,
  GetContactById,
  UpdatetheContact,
  DeleteContactByid,
};
