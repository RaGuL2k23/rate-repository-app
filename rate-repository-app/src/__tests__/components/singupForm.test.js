import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useFormik } from 'formik';
import { Pressable, Text, TextInput, View } from 'react-native';
import * as yup from 'yup'
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()

      render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByPlaceholderText("username"), "kalle");
    fireEvent.changeText(screen.getByPlaceholderText("password"), "password");
    fireEvent.press(screen.getByText("Submit"));


      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
      });
    });
  });
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "minimum 6 characters")
    .max(8, "Password cannot be more than 8 characters")
    .required("username is required"),
  password: yup
    .string()
    .min(4, "minimum 6 characters")
    .max(8, "Password cannot be more than 8 characters")
    .required("password is required"),
});
const initialValues = {
  username: "elina",
  password: "password",
};
const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View >
      <SingInTextInput formik={formik} field={"username"} />
      <SingInTextInput formik={formik} field={"password"} />
      <Pressable onPress={formik.handleSubmit}>
        <Text
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
    formik.touched[field] && formik.errors[field] && { borderColor: "red" },
  ];
  return (
    <>
      <TextInput
        style={errorStyle}
        placeholder={field}
        value={formik.values[field].toLowerCase()}
        onChangeText={formik.handleChange(field)}
        maxLength={8}
      />
      {formik.touched[field] && formik.errors[field] && (
        <Text >{formik.errors[field]}</Text>
      )}
    </>
  );
};