import * as yup from "yup";

// Only client side gets the translation
// @ts-ignore
if (typeof window !== "undefined") {
  yup.setLocale({
    mixed: {
      required: "Obligatorisk",
    },
    string: {
      min: "Minst ${min} tecken behövs",
      length: "Måste vara ${length} tecken långt",
    },
  });
}

export const configSchema = yup.object({
  ENDPOINT: yup.string().required(),
  USERNAME: yup.string().required(),
  PASSWORD: yup.string().required(),
});

export const formSchema = yup.object({
  name: yup.string().length(0),
  email: yup.string().length(0),
  caller: yup.string().required(),
  user_name: yup.string().length(4).required(),
  u_place_of_work: yup.string().required(),
  u_alternativ_kontaktvag: yup.string().required(),
  u_additional_e_mail_address: yup.string().required(),
  other: yup.string().oneOf(["true", "false"]).required(),
  u_opened_for: yup.string().when("other", {
    is: (val: "true" | "false") => val === "true",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  user_name_2: yup.string().when("other", {
    is: (val: "true" | "false") => val === "true",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  u_place_of_work_2: yup.string().when("other", {
    is: (val: "true" | "false") => val === "true",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  call_type: yup.string().oneOf(["sc_request", "incident"]).required(),
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
