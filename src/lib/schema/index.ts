import { z } from "zod";
import * as yup from "yup";

export const configSchema = z.strictObject({
  ENDPOINT: z.string({
    required_error: "This value is required, please check the .env config",
  }),
  USERNAME: z.string({
    required_error: "This value is required, please check the .env config",
  }),
  PASSWORD: z.string({
    required_error: "This value is required, please check the .env config",
  }),
});

// export const formSchema = z
//   .strictObject({
//     name: z.string().length(0).optional(),
//     email: z.string().length(0).optional(),
//     caller: z.string(),
//     user_name: z.string().length(4),
//     u_place_of_work: z.string(),
//     u_alternativ_kontaktvag: z.string(),
//     u_additional_e_mail_address: z.string(),
//     call_type: z.enum(["sc_request", "incident"]),
//     u_business_application: z.string(),
//     short_description: z.string(),
//     description: z.string().min(20),
//     u_confidential_information: z.optional(z.string()),
//     files: z
//       .object({
//         id: z.string(),
//         name: z.string(),
//         type: z.string(),
//         data: z.string(),
//       })
//       .array()
//       .optional(),
//   })
//   .merge(
//     z
//       .strictObject({
//         incident_date: z.string(),
//         incident_other_people: z.string(),
//         incident_other_computer: z.string(),
//         incident_other_system: z.string(),
//       })
//       .partial()
//   );

// yup.setLocale({
//   mixed: {
//     required: "Nödvändig!",
//   },
//   string: {
//     min: "Minst ${min} tecken behövs",
//   },
// });

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
    is: (val) => val === "incident",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  incident_other_computer: yup.string().when("call_type", {
    is: (val) => val === "incident",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  incident_other_people: yup.string().when("call_type", {
    is: (val) => val === "incident",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  incident_other_system: yup.string().when("call_type", {
    is: (val) => val === "incident",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
});

export type FormValues = Omit<
  yup.InferType<typeof formSchema>,
  "name" | "email"
>;
