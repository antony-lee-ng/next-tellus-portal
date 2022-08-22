import { AttachmentIcon } from "@chakra-ui/icons";
import {
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Field, FieldInputProps, FieldProps } from "formik";
import {
  ChangeEventHandler,
  CSSProperties,
  HTMLInputTypeAttribute,
  useRef,
} from "react";
import { FormValues } from "src/lib/schema";

interface IFormFieldProps {
  name: keyof FormValues;
  as: ComponentWithAs<any>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  children?: React.ReactNode;
  placeholder?: string;
  label?: string;
  error_msg?: string;
  variant?: "outline" | "filled";
  type?: HTMLInputTypeAttribute;
  style?: CSSProperties;
}

const FileUpload: React.FC<{
  placeholder: string;
  field: FieldInputProps<any>;
}> = (props) => {
  const inputRef = useRef(null);
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<AttachmentIcon />} />
      <input
        {...props.field}
        type="file"
        ref={inputRef}
        multiple
        onChange={(e) => {
          props.field.value = ["hello there"];
        }}
      ></input>
      <Input
        onClick={() => {
          inputRef.current.click();
          console.log(inputRef);
        }}
        placeholder={props.placeholder || "Your file ..."}
      />
    </InputGroup>
  );
};

export const FormField: React.FC<IFormFieldProps> = (props) => {
  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps) => {
        return (
          <FormControl
            style={props.style}
            isInvalid={!!form.errors[props.name] && !!form.touched[props.name]}
          >
            <FormLabel>{props.label}</FormLabel>
            {props.type === "file" && (
              <FileUpload field={field} placeholder={props.placeholder} />
            )}
            {props.type !== "file" && (
              <props.as {...field} {...props}>
                {props?.children}
              </props.as>
            )}
            <FormErrorMessage>
              {form.errors[props.name] &&
                (props.error_msg || form.errors[props.name].toString())}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};
