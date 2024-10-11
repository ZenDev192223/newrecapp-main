import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mealData } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ categories, meals }) {
  const navigation = useNavigation();

  return (
    <View className="mx-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">Recipes</Text>
      <View>
        {
          categories.length === 0 || meals.length === 0 ? (
            <Loading size="large" className="mt-20" />
          ) : (
            meals.map((item, index) => (
              <Animated.View key={item.idMeal} entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
                <RecipeCard item={item} index={index} navigation={navigation} />
              </Animated.View>
            ))
          )
        }
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  return (
    <Pressable
      style={{
        flexDirection: 'column', // Change to column layout for vertical stacking
        alignItems: 'center',
        marginBottom: hp(3),
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: hp(1),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }}
      onPress={() => navigation.navigate('RecipeDetail', { ...item })}
    >
      {/* Image on top */}
      <CachedImage
        uri={item.strMealThumb}
        style={{
          width: wp(86),   // Adjust as needed for width
          height: hp(27),  // Adjust height accordingly
          borderRadius: 10,
          marginBottom: hp(1), // Add space between image and text
        }}
        className="bg-black/5"
      />

      {/* Text details below the image */}
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: hp(2.7), fontWeight: 'bold', textAlign: 'center' }}>
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
        </Text>
        <Text numberOfLines={2} style={{ fontSize: hp(1.6), color: 'gray', textAlign: 'center' }}>
          {`servings 2    time 30min.`} {/* Replace this with dynamic text as needed */}
        </Text>
      </View>
    </Pressable>
  );
};
