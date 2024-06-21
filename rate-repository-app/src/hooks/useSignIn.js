import { useApolloClient, useMutation } from "@apollo/client";
import { GET_USER_ACCESS_TOKEN } from "../graphql/mutation";
import useAuthStorage from "./useAuthStorage";

export const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient()
  
    const [mutate, result] = useMutation(GET_USER_ACCESS_TOKEN,{
        onError: (error) => {
            const messages = error.graphQLErrors.map((e) => e.message).join("\n");
            console.log(messages);
          },
    });
  
    const signIn = async ({ username, password }) => {
      // call the mutate function here with the right arguments
      const {data} =  await mutate({
        variables: {
          credentials: {
            username,
            password,
          },
        },

        
      })  
      authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore();

      return data
    }; 
    return [signIn,result];
  };