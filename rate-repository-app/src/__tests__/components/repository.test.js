// import { FlatList, View } from "react-native";
// import RepositoryItem from "../../components/RepositoryItem";
// import { render, screen, within } from "@testing-library/react-native";

// const RepositoryListContainer = ({ repositories }) => {
//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];
//   const ItemSeparator = () => <View />;

//   return (
//     <>
//       <FlatList
//         data={repositoryNodes}
//         ItemSeparatorComponent={ItemSeparator}
//         renderItem={({ item }) => <RepositoryItem item={item} />}
//       />
//     </>
//   );
// };
// const repositories = {
//   totalCount: 8,
//   pageInfo: {
//     hasNextPage: true,
//     endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
//     startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
//   },
//   edges: [
//     {
//       node: {
//         id: "jaredpalmer.formik",
//         fullName: "jaredpalmer/formik",
//         description: "Build forms in React, without the tears",
//         language: "TypeScript",
//         forksCount: 1619,
//         stargazersCount: 21856,
//         ratingAverage: 88,
//         reviewCount: 3,
//         ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
//       },
//       cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
//     },
//     {
//       node: {
//         id: "async-library.react-async",
//         fullName: "async-library/react-async",
//         description: "Flexible promise-based React data loader",
//         language: "JavaScript",
//         forksCount: 69,
//         stargazersCount: 1760,
//         ratingAverage: 72,
//         reviewCount: 3,
//         ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
//       },
//       cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
//     },
//   ],
// };
// describe("repositoryTest", () => {
//   it("renders a greeting message based on the name prop", () => {
//     render(<RepositoryListContainer repositories={repositories} />);

//     const repositoryItems = screen.getAllByTestId("repositoryItem");

//     const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

//     const firstItemWithin = within(firstRepositoryItem);
//     const secondItemWithin = within(secondRepositoryItem);

//     // First repository item assertions
//     expect(firstItemWithin.getByText("jaredpalmer/formik")).toBeDefined();
//     expect(
//       firstItemWithin.getByText("Build forms in React, without the tears"),
//     ).toBeDefined();
//     expect(firstItemWithin.getByText("TypeScript")).toBeDefined();
//     expect(firstItemWithin.getByText("21856")).toBeDefined();
//     expect(firstItemWithin.getByText("stars")).toBeDefined();
//     expect(firstItemWithin.getByText("88")).toBeDefined();
//     expect(firstItemWithin.getByText("rating")).toBeDefined();
//     expect(firstItemWithin.getByText("3")).toBeDefined();
//     expect(firstItemWithin.getByText("reviews")).toBeDefined();
//     expect(firstItemWithin.getByText("1619")).toBeDefined();
//     expect(firstItemWithin.getByText("forks")).toBeDefined();

//     // Second repository item assertions
//     expect(
//       secondItemWithin.getByText("async-library/react-async"),
//     ).toBeDefined();
//     expect(
//       secondItemWithin.getByText("Flexible promise-based React data loader"),
//     ).toBeDefined();
//     expect(secondItemWithin.getByText("JavaScript")).toBeDefined();
//     expect(secondItemWithin.getByText("1760")).toBeDefined();
//     expect(secondItemWithin.getByText("stars")).toBeDefined();
//     expect(secondItemWithin.getByText("72")).toBeDefined();
//     expect(secondItemWithin.getByText("rating")).toBeDefined();
//     expect(secondItemWithin.getByText("3")).toBeDefined();
//     expect(secondItemWithin.getByText("reviews")).toBeDefined();
//     expect(secondItemWithin.getByText("69")).toBeDefined();
//     expect(secondItemWithin.getByText("forks")).toBeDefined();
//   });
// });
