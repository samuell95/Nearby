import { PressableProps, Pressable, Text } from "react-native";
import { s } from "./styles";
import { categoriesIcons } from "@/utils/categories-icons";
import { colors } from "@/styles/colors";

type Props = PressableProps & {
 IconId: string
 isSelected?: boolean
 name:string
}

export function Category({IconId,name,isSelected = false, ...rest}:Props) {
  const Icon = categoriesIcons[IconId]
  return (
    <Pressable style={[s.container, isSelected && s.containerSelected]} {...rest}>
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]}/>
      <Text style={[s.name, isSelected && s.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  )
}