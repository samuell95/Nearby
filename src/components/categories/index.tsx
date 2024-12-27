import { FlatList} from "react-native";
import { Category } from "../category";
import { s } from "./styles";

export type CategoriesProps = {
  id: string,
  name: string
}[]

type Props = {
  data: CategoriesProps
  selected: string
  onSelect: (id:string) => void
}

export function Categories({data,onSelect,selected}: Props) {
  return (
    <FlatList 
      data={data}
      keyExtractor={(item)=> item.id}
      horizontal
      contentContainerStyle={s.content}
      style={s.container}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=> 
        <Category  
          name={item.name} 
          IconId={item.id} 
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      }
    />
  )
}