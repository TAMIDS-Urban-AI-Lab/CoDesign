import { useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingStateConstants as ViroConstants,
  ViroARPlane,
  ViroBox,
  ViroMaterials,
  ViroImage
} from '@reactvision/react-viro';

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

type InitialSceneProps = {
  sceneNavigator: {
    viroAppProps: AugmentedRealitySceneProps;
  };
};

function InitialScene({ sceneNavigator: { viroAppProps } }: InitialSceneProps) {
  const [objectCount, setObjectCount] = useState(0);

  const handleAddButtonClick = (state: number) => {
    if (state === ClickStates.CLICKED) {
      setObjectCount(objectCount + 1);
      viroAppProps.updateNudgeText?.('Add button clicked');
    }
  };

  const handleItemDrag = () => {};

  const onTrackingUpdated = (state: ViroConstants) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      viroAppProps.updateNudgeText?.('AR tracking is normal');
    } else if (state === ViroConstants.TRACKING_LIMITED) {
      viroAppProps.updateNudgeText?.('AR tracking is limited');
    } else if (state === ViroConstants.TRACKING_UNAVAILABLE) {
      viroAppProps.updateNudgeText?.('AR tracking is not available');
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onTrackingUpdated}>
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

type AugmentedRealitySceneProps = {
  updateNudgeText?: (text: string) => void;
};

export function AugmentedRealityScene({
  updateNudgeText
}: AugmentedRealitySceneProps) {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: InitialScene
        }}
        viroAppProps={{ updateNudgeText }}
        style={{ flex: 1 }}
      />
    </ThemedView>
  );
}
