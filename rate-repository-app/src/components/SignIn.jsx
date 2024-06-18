import { useFormik } from "formik";
import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";

const styles = StyleSheet.create({
  errorText: {
    color: "#d73a4a",
    fontSize: 17,
    fontWeight: "400",
  },
  container: {
    padding: 20,
    borderWidth: 1,
    borderBlockColor: "gray",
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1.3322,
    marginVertical: 10,
  },
  submitBtn: {
    color: "white",
    padding: 6,
    borderRadius: 7,
    textAlign: "center",
    marginTop: 8,
  },
});
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "minimum 6 characters")
    .max(8, "Password cannot be more than 8 characters")
    .required("username is required"),
  password: yup
    .string()
    .min(6, "minimum 6 characters")
    .max(8, "Password cannot be more than 8 characters")
    .required("password is required"),
});
const initialValues = {
  username: "",
  password: "",
};
const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      <SingInTextInput formik={formik} field={"username"} />
      <SingInTextInput formik={formik} field={"password"} />
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={styles.submitBtn}
          backgroundColor={"primary"}
          fontSize={"heading"}
        >
          Submit
        </Text>
      </Pressable>
    </View>
  );
};
const SingInTextInput = ({ formik, field }) => {
  const errorStyle = [
    styles.input,
    formik.touched[field] && formik.errors[field] && { borderColor: "red" },
  ];
  return (
    <>
      <TextInput
        style={errorStyle}
        placeholder={field}
        value={formik.values[field]}
        onChangeText={formik.handleChange(field)}
        maxLength={8}
      />
      {formik.touched[field] && formik.errors[field] && (
        <Text style={styles.errorText}>{formik.errors[field]}</Text>
      )}
    </>
  );
};
const onSubmit = (values) => {
  console.log(values.username, values.password);
};
const SignIn = () => {
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
