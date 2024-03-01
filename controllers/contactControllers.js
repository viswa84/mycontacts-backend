const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc all contacts
//@route get/api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access public

const CreateContact = asyncHandler(async (req, res) => {
  console.log(req.body, "this is  the requested body from the client ");
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All the fields are Mandatoy !");
  }
  // console.log( { name, email, phone })
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});
//@desc Contact by Id
//@route get /api/contacts
//@access public

const GetContactById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404); // Set the status code to 404
    throw new Error("Contact not found");
  }
  
  res.json(contact);
});
//@desc Update the contact by Id
//@route put /api/contacts
//@access public

const UpdatetheContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contant = await Contact.findById(id);
  if (!contact) {
    res.status(404); // Set the status code to 404
    throw new Error("Contact not found");
  }
  
  const updatecontact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatecontact);
});

//@desc delete the contactById
//@route delete /api/contact
//aaccess public
const DeleteContactByid = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contant = await Contact.findById(id);
  if (!contant) {
    res.status(404);
    throw new Error("Contact not Found");
  }
  await Contact.findByIdAndDelete(id);

  res.status(200).json(contant);
});

module.exports = {
  getContacts,
  CreateContact,
  GetContactById,
  UpdatetheContact,
  DeleteContactByid,
};
