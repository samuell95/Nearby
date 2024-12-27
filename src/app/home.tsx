import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, {Callout, Marker} from "react-native-maps";
// import * as Location from "expo-location"

import { api } from "@/services/api";

import { Categories, CategoriesProps } from "../components/categories";
import  { PlaceProps } from "../components/place";
import { Places } from "../components/places";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { router } from "expo-router";

type MarketsProps = PlaceProps & {
  latitude: number,
  longitude: number
}

const currentLocation = {
  latitude: -23.560664454517998,
  longitude: -46.65630897855547
}

export default function Home(){
  const [categories,setCategories] = useState<CategoriesProps>([])
  const [category,setCategory] = useState("")
  const [markets,setMarkets] = useState<MarketsProps[]>([])

  async function fetchCategories() {
    try {
      const {data} = await api.get("/categories")
      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert("Categorias","Não foi possível carregar as categorias ❌")
    }
  }

  async function fetchMarkets() {
    try {
      if(!category){
        return 
      }
      const {data} = await api.get("/markets/category/" + category) 
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Locais","Não foi possível carregar os locais ❌")
    }
  }

  // async function getCurrentLocation() {
  //   try {
  //     const {granted} =  await Location.requestForegroundPermissionsAsync()
  //     if(granted){
  //       const location = await Location.getCurrentPositionAsync({})
  //       console.log(location);
        
  //     }

  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }

  useEffect(()=> {
    fetchCategories()
  },[])

  useEffect(()=> {
    fetchMarkets()
  },[category])

  return(
    <View style={{flex:1}}>
      <Categories data={categories} onSelect={setCategory} selected={category}/>

      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            longitude: currentLocation.longitude,
            latitude: currentLocation.latitude
          }}        
          image={require("@/assets/location.png")}
        />

        {
          markets.map((item)=> (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout onPress={() => router.navigate(`/market/${item.id}`)}> 
                <View>
                  <Text
                    style={{fontSize:14, color: colors.gray[600], fontFamily: fontFamily.medium}}
                  >
                    {item.name}
                  </Text>
                  <Text
                     style={{fontSize:12, color: colors.gray[600], fontFamily: fontFamily.regular}}
                  >
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>

      <Places data={markets}/>
    </View>
  )
}