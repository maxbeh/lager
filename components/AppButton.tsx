import AppButtonStyle from "../styles/index.js";
import {Text, TouchableOpacity } from "react-native";

function AppButton({children,style,onPress}) {
 return (
   <TouchableOpacity onPress={onPress}>
    <Text
      style={{...AppButtonStyle}, style} >
      {children}
    </Text>
   </TouchableOpacity>
 );
}

export default AppButton;
