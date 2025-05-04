import emailjs from "emailjs-com";

const SERVICE_ID = "service_59vnphj";
const TEMPLATE_ID = "template_gsmkfyt";
const USER_ID = "sVQj2R9wmZV9y-8Br";

export const sendEmail = (templateParams) => {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
};
