import { useFormik } from "formik";
import Text from "./Text";
import { Pressable,  TextInput, View } from "react-native";
import * as yup from "yup";
import { useReview } from "../hooks/useReview";
import { useNavigate } from "react-router-native";

import { formStyles } from "./SignIn";

const validationSchema = yup.object().shape({
  repoOwner: yup.string().required("Repository owner's username is required"),
  repoName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be larger than 0")
    .max(100, "Rating should not be larger than 100")
    .required("Rating is required"),
  review: yup.string().optional(),
});

const initialValues = {
  repoOwner: "",
  repoName: "",
  rating: "",
  review: "",
};

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={formStyles.container}>
      <ReviewTextInput formik={formik} field={"repoOwner"} />
      <ReviewTextInput formik={formik} field={"repoName"} />
      <ReviewTextInput formik={formik} field={"rating"} />
      <ReviewTextInput formik={formik} field={"review"} multiline={true} />
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

const ReviewTextInput = ({ formik, field, multiline = false }) => {
  const errorStyle = [
    formStyles.input,
    formik.touched[field] && formik.errors[field] && { borderColor: "red" },
  ];

  return (
    <>
      <TextInput
        style={errorStyle}
        placeholder={field + `${field == "rating" ? "(0-100)" : ""}`}
        value={formik.values[field]}
        onChangeText={formik.handleChange(field)}
        onBlur={formik.handleBlur(field)}
        maxLength={field === "rating" ? 3 : 255}
        keyboardType={field === "rating" ? "numeric" : "default"}
        multiline={multiline}
      />
      {formik.touched[field] && formik.errors[field] && (
        <Text style={formStyles.errorText}>{formik.errors[field]}</Text>
      )}
    </>
  );
};

const CreateReview = () => {
  const [Review] = useReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { repoOwner, repoName, rating, review } = values;

    try {
      const data = await Review({ repoOwner, repoName, rating, review });
        navigate(`/repositoryView/${data.createReview.repositoryId}`);
    } catch (e) {
      alert(e.message);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
