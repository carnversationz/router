import {
  NavigationContainerRefWithCurrent,
  NavigationState,
  PartialState,
} from "@react-navigation/native";
import React from "react";

import { State } from "./fork/getPathFromState";

export const RootNavigationRef =
  React.createContext<NavigationContainerRefWithCurrent<ReactNavigation.RootParamList> | null>(
    null
  );

if (process.env.NODE_ENV !== "production") {
  RootNavigationRef.displayName = "RootNavigationRef";
}

export function useRootNavigation() {
  const context = React.useContext(RootNavigationRef);
  if (!context) {
    throw new Error(
      "useRootNavigation must be used within a NavigationContainerContext"
    );
  }
  return context;
}

export function useRootNavigationState(): State | undefined {
  const navigation = useRootNavigation();
  const [state, setState] = React.useState<
    PartialState<NavigationState> | NavigationState | undefined
  >(navigation?.getRootState());
  React.useEffect(() => {
    if (navigation) {
      setState(navigation.getRootState());
      const unsubscribe = navigation.addListener("state", ({ data }) => {
        setState(data.state);
      });
      return unsubscribe;
    }
    return undefined;
  }, [navigation]);

  return state;
}
