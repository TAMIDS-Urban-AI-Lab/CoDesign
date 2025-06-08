import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroTrackingState,
  ViroTrackingReason
} from '@reactvision/react-viro';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';

// AR Scene Component
const ARScene = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state: ViroTrackingState, reason: ViroTrackingReason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('AR Ready! Look around to see the 3D box.');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText('AR tracking unavailable');
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Status text */}
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      {/* 3D Box */}
      <ViroBox
        position={[0, 0, -1]}
        scale={[0.3, 0.3, 0.3]}
        onClick={() => {
          // Handle box click
        }}
      />
    </ViroARScene>
  );
};

export default function Test() {
  return (
    <ThemedView>
      <ThemedText>Hello</ThemedText>
    </ThemedView>
  );
}

export function ARExperienceScreen() {
  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ARScene
        }}
        style={styles.arView}
      />
      {/* Close AR button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeButtonText}>Close AR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  arButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  arButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  arView: {
    flex: 1
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
