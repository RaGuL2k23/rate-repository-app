import { useMutation } from "@apollo/client";
import { GET_USER_ACCESS_TOKEN } from "../graphql/mutation";

export const useSignIn = () => {
  
    const [mutate, result] = useMutation(GET_USER_ACCESS_TOKEN,{
        onError: (error) => {
            const messages = error.graphQLErrors.map((e) => e.message).join("\n");
            console.log(messages);
          },
    });
  
    const signIn = async ({ username, password }) => {
      // call the mutate function here with the right arguments
      return  await mutate({
        variables: {
          credentials: {
            username,
            password,
          },
        },
      })    }; 
      console.log('dfd',result.data);
    return [signIn,result];
  };