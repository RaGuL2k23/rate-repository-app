import { useFormik } from "formik";
import Text from "./Text";
import { Pressable,  TextInput, View } from "react-native";
import * as yup from "yup";
import { formStyles } from "./SignIn";
import { useCreateUser } from "../hooks/useUser";
import { useNavigate } from "react-router-native";
 

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "minimum 5 characters")
    .max(30, "Password cannot be more than 30 characters")
    .required("username is required"),
  password: yup
    .string()
    .min(5, "minimum 5 characters")
    .max(50, "Password cannot be more than 50 characters")
    .required("password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required')
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={formStyles.container}>
      <SignUpTextInput formik={formik} field={"username"} />
      <SignUpTextInput formik={formik} field={"password"} />
      <SignUpTextInput formik={formik} field={"passwordConfirmation"} />
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={formStyles.submitBtn}
          backgroundColor={"primary"}
          fontSize={"heading"}
        >
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

const SignUpTextInput = ({ formik, field }) => {
  const errorStyle = [
    formStyles.input,
    formik.touched[field] && formik.errors[field] && { borderColor: "red" },
  ];
  return (
    <>
      <TextInput
        style={errorStyle}
        placeholder={field}
        value={formik.values[field]}
        onChangeText={formik.handleChange(field)}
        maxLength={50}
      />
      {formik.touched[field] && formik.errors[field] && (
        <Text style={formStyles.errorText}>{formik.errors[field]}</Text>
      )}
    </>
  );
};

const UserForm = () => {
  const [createUser] = useCreateUser()
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      const data = await createUser({ username, password });
      navigate("/");

    } catch (e) {
      alert(e.message);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default UserForm;
