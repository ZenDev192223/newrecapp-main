import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


import axios from 'axios';

// In your handleSaveRecipe function
const handleSaveRecipe = async () => {
  try {
    const recipeData = {
      title,
      description,
      serves,
      cookTime,
      ingredients,
      steps,
      imageUri,
    };

    const response = await axios.post('https://your-backend-url.com/api/recipes', recipeData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Recipe saved successfully:', response.data);
      // Handle success (e.g., reset the form or navigate to another screen)
    } else {
      console.log('Failed to save the recipe');
    }
  } catch (error) {
    console.error('Error saving recipe:', error);
  }
};


const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [serves, setServes] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [steps, setSteps] = useState([{ instruction: '' }]);
  const [imageUri, setImageUri] = useState(null);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleAddStep = () => {
    setSteps([...steps, { instruction: '' }]);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index].instruction = value;
    setSteps(newSteps);
  };

  const handleDeleteStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const handleUploadPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    }
  };

  const handleDeletePhoto = () => {
    setImageUri(null);
  };

  const handleSaveRecipe = () => {
    // Logic to save the recipe
    console.log({
      title,
      description,
      serves,
      cookTime,
      ingredients,
      steps,
      imageUri,
    });
    // You can add your API call or state update here
  };

  return (
    <ScrollView style={styles.container}>
      {/* Photo Upload Section */}
      <View style={styles.photoUploadContainer}>
        {imageUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleUploadPhoto} style={styles.photoUpload}>
            <Text style={styles.photoUploadText}>Upload recipe photo</Text>
          </TouchableOpacity>
        )}
        {imageUri && (
          <Button title="Delete Photo" onPress={handleDeletePhoto} color="#FFA500" />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        maxLength={300}
      />
      <TextInput
        style={styles.input}
        placeholder="Serves"
        value={serves}
        onChangeText={setServes}
        keyboardType="numeric"
        maxLength={50}
      />
      <TextInput
        style={styles.input}
        placeholder="Cook time"
        value={cookTime}
        onChangeText={setCookTime}
        maxLength={50}
      />

      <Text style={styles.ingredientsHeader}>Ingredients</Text>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientContainer}>
          <TextInput
            style={styles.ingredientInput}
            placeholder="Quantity"
            value={ingredient.quantity}
            onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
            maxLength={200}
          />
          <TextInput
            style={styles.ingredientInput}
            placeholder="Ingredient"
            value={ingredient.name}
            onChangeText={(value) => handleIngredientChange(index, 'name', value)}
            maxLength={200}
          />
          <Button title="Delete" onPress={() => handleDeleteIngredient(index)} color="#FFA500" />
        </View>
      ))}
      <Button title="Add ingredients" onPress={handleAddIngredient} color="#FFA500" />

      {/* Steps Section */}
      <Text style={styles.stepsHeader}>Method</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <TextInput
            style={styles.stepInput}
            placeholder={`Step ${index + 1}`}
            value={step.instruction}
            onChangeText={(value) => handleStepChange(index, value)}
            maxLength={300}
          />
          <Button title="Delete" onPress={() => handleDeleteStep(index)} color="#FFA500" />
        </View>
      ))}
      <Button title="Add step" onPress={handleAddStep} color="#FFA500" />

      <View style={styles.saveButtonContainer}>
        <Button title="Save" onPress={handleSaveRecipe} color="#FFA500" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
  },
  photoUploadContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  photoUpload: {
    backgroundColor: '#FFA500', // Same as other buttons
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  photoUploadText: {
    color: '#fff', // Make text color white for better visibility
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  ingredientsHeader: {
    fontSize: 18,
    marginVertical: 10,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  stepsHeader: {
    fontSize: 18,
    marginVertical: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  saveButtonContainer: {
    marginTop: 20, // Space above the save button
    marginBottom: 25,
  },
});

export default AddRecipe;
