import {
  StyleSheet,
  Dimensions
} from "react-native";
const {width, height} = Dimensions.get("window");

export default styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center"
  },
  cell: {
    width: width / 50,
    height: width / 50
  }
});
