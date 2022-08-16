import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "${path} är ett obligatoriskt fält",
  },
  string: {
    min: "Minst ${min} tecken behövs",
  },
});

export const configSchema = yup.object({
  ENDPOINT: yup.string().required(),
  USERNAME: yup.string().required(),
  PASSWORD: yup.string().required(),
});

export const formSchema = yup.object({
  name: yup.string().length(0).notRequired(),
  email: yup.string().length(0),
  caller: yup.string().required(),
  user_name: yup.string().length(4).required(),
  u_place_of_work: yup.string().required(),
  u_alternativ_kontaktvag: yup.string().required(),
  u_additional_e_mail_address: yup.string().required(),
  call_type: yup.mixed().oneOf(["sc_request", "incident"]).required(),
  u_business_application: yup.string().required(),
  short_description: yup.string().required(),
  description: yup.string().min(20).required(),
  u_confidential_information: yup.string(),
  files: yup.array(
    yup.object({
      name: yup.string(),
      type: yup.string(),
      data: yup.string(),
    })
  ),
  incident_date: yup.string().when("call_type", {
    is: (val: "incident" | "sc_request") => val === "incident",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  incident_other_computer: yup.string().when("call_type", {
    is: (val: "incident" | "sc_request") => val === "incident",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  incident_other_people: yup.string().when("call_type", {
    is: (val: "incident" | "sc_request") => val === "incident",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  incident_other_system: yup.string().when("call_type", {
    is: (val: "incident" | "sc_request") => val === "incident",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
});

export type FormValues = Omit<
  yup.InferType<typeof formSchema>,
  "name" | "email"
>;
