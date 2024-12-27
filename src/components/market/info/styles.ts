import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  title:{
    flex: 1,
    color: colors.gray[500],
    fontSize: 14,
    fontFamily: fontFamily.regular,
    lineHeight: 22.4
  }
})