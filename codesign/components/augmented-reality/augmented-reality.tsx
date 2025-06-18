import { useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingStateConstants as ViroConstants,
  ViroARPlane,
  ViroBox,
  ViroMaterials,
  ViroImage
} from '@reactvision/react-viro';

import { tamuColors } from '@/constants/Colors';
import { ThemedView } from '@/components/ui/ThemedView';
import { BUTTON_PLUS_SRC } from '@/constants/ImagePaths';
import { ClickStates } from '@/constants/augmented-reality/ViroStates';

ViroMaterials.createMaterials({
  blue_scratch: {
    shininess: 0.9,
    roughness: 0,
    diffuseTexture: require('@/assets/images/materials/blue_scratch.jpg')
  }
});

function InitialScene() {
  const [text, setText] = useState('Look for a surface...');
  const [objectCount, setObjectCount] = useState(0);

  const handleAddButtonClick = (state: number) => {
    if (state === ClickStates.CLICKED) {
      setText('Add button clicked');
      setObjectCount(objectCount + 1);
    }
  };

  const handleItemDrag = () => {};

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
      <ViroText
        text={text}
        scale={[0.3, 0.3, 0.3]}
        position={[0.5, 1, -2]}
        style={styles.statusTextStyle}
      />
      <ViroImage
        source={BUTTON_PLUS_SRC.default}
        position={[0, 0, -1]}
        height={0.2}
        width={0.2}
        onClickState={handleAddButtonClick}
        transformBehaviors={['billboard']}
      />
      <ViroARPlane minHeight={0.1} minWidth={0.1} alignment="Horizontal">
        {Array.from({ length: objectCount }).map((_, index) => (
          <ViroBox
            key={index}
            position={[index * 0.15, -1, -1]}
            scale={[0.1, 0.1, 0.1]}
            opacity={1}
            materials={['blue_scratch']}
            dragType="FixedToWorld"
            onDrag={handleItemDrag}
          />
        ))}
      </ViroARPlane>
    </ViroARScene>
  );
}

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
