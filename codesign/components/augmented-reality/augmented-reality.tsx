import { useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroAmbientLight,
  ViroTrackingStateConstants as ViroConstants,
  ViroARPlane,
  ViroBox,
  ViroMaterials
} from '@reactvision/react-viro';

import { tamuColors } from '@/constants/Colors';
import { ThemedView } from '@/components/ui/ThemedView';

ViroMaterials.createMaterials({
  blue_scratch: {
    shininess: 0.9,
    roughness: 0,
    diffuseTexture: require('@/assets/images/materials/blue_scratch.jpg')
  }
});

const InitialScene = () => {
  const [text, setText] = useState('Look for a surface...');

  const onTrackingUpdated = (state: ViroConstants) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('AR tracking is normal');
    } else if (state === ViroConstants.TRACKING_LIMITED) {
      setText('AR tracking is limited');
    } else if (state === ViroConstants.TRACKING_UNAVAILABLE) {
      setText('AR tracking is not available');
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onTrackingUpdated}>
      <ViroAmbientLight color="#FFFFFF" intensity={0.3} />
      <ViroText
        text="Hello AR World!"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={{ fontSize: 20, color: tamuColors.black }}
      />
      {/* Status text */}
      <ViroText
        text={text}
        scale={[0.3, 0.3, 0.3]}
        position={[0, 1, -2]}
        style={styles.statusTextStyle}
      />
      <ViroARPlane minHeight={0.1} minWidth={0.1} alignment="Horizontal">
        <ViroBox
          position={[0, 0, 0]}
          scale={[0.1, 0.1, 0.1]} // Very thin box to show plane surface
          opacity={1}
          materials={['blue_scratch']}
          dragType="FixedToWorld"
        />
      </ViroARPlane>
    </ViroARScene>
  );
};

export function AugmentedRealityScene() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: InitialScene
        }}
        style={{ flex: 1 }}
      />
    </ThemedView>
  );
}

const styles = {
  statusTextStyle: {
    fontSize: 24,
    color: tamuColors.white,
    backgroundColor: '#00000080',
    padding: 10
  }
};
