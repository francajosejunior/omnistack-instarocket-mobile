import React from "react";
import { createAppContainer, NavigationContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Image } from "react-native";

import Feed from "./pages/Feed";
import New from "./pages/New";
const logo = require("./assets/logo.png");

export default createAppContainer(
  createStackNavigator(
    {
      Feed,
      New
    },
    {
      defaultNavigationOptions: {
        headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo} />
      },
      mode: "modal"
    }
  )
) as NavigationContainer;
