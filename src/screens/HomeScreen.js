import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Asset } from 'expo-asset';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import Recipes from '../components/recipes';
import BottomNavbar from '../components/BottomNavbar';

const cuisineImages = {
  Indian: require('../../assets/images/Indian.png'),
  American: require('../../assets/images/American.png'),
  Thai: require('../../assets/images/Thai.png'),
  Mexican: require('../../assets/images/Mexican.png'),
  Japanese: require('../../assets/images/Japanese.png'),
  Chinese: require('../../assets/images/Chinese.png'),
  French: require('../../assets/images/French.png'),
  Greek: require('../../assets/images/Greek.png'),
  Italian: require('../../assets/images/Italian.png'),
  Spanish: require('../../assets/images/Spanish.png'),
  British: require('../../assets/images/British.png'),
  Jamaican: require('../../assets/images/Jamaican.png'),
};

export default function HomeScreen() {
  const [activeCuisine, setActiveCuisine] = useState('Indian');  
  const [meals, setMeals] = useState([]);
  

  // Define only the required cuisines
  const cuisineList = [
    'Indian', 'American', 'Thai', 'Mexican', 
    'Japanese', 'Chinese', 'French', 'Greek', 
    'Italian', 'Spanish', 'British', 'Jamaican'
  ];

  useEffect(() => {
    getRecipes();   
  }, []);

  const handleChangeCuisine = cuisine => {
    getRecipes(cuisine);  
    setActiveCuisine(cuisine);  // Update the active cuisine
    setMeals([]);  
  };

  const getRecipes = async (cuisine = "Indian") => {  
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`);  
      if (response && response.data && response.data.meals) {
        setMeals(response.data.meals);  
      }
    } catch (err) {
      console.error('Error fetching recipes:', err.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* Avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image 
            source={require('../../assets/images/avatar.png')} 
            style={{ height: hp(5), width: hp(5.5) }} 
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>


         {/* Horizontal scroll for cuisine boxes */}
         <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {cuisineList.map((cuisine, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCuisine(cuisine)}
              style={{
                width: hp(10),
                height: hp(10),
                borderRadius: hp(5),
                backgroundColor: activeCuisine === cuisine ? '#FFCC00' : '#f0f0f0',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp(3),
              }}
            >
              <Image
                source={cuisineImages[cuisine]} // Replace with your actual image URL
                style={{ width: hp(6), height: hp(6), borderRadius: hp(3) }}
              />
              <Text style={{ textAlign: 'center', fontSize: hp(1.5), marginTop: 5 }}>
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Greetings and punchline */}
        <View className="mx-4 space-y-1 mb-2">
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">What's in your</Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
            <Text className="text-amber-400">fridge?</Text>
          </Text>
        </View>


        {/* Search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor='gray'
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

       

        {/* Recipes */}
        <View>
          <Recipes meals={meals} categories={cuisineList} />
        </View>
      </ScrollView>
      <BottomNavbar/>
    </View>
  );
}
