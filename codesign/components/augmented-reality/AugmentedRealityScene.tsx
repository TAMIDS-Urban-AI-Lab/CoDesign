import { useState, useEffect, useCallback } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingStateConstants as ViroConstants,
  ViroARPlane,
  ViroBox,
  ViroMaterials
} from '@reactvision/react-viro';

import { ThemedView } from '@/components/ui/ThemedView';
import { useAugmentedRealityContext } from '@/components/provider/AugmentedRealityProvider';

ViroMaterials.createMaterials({
  blue_scratch: {
    shininess: 0.9,
    roughness: 0,
    diffuseTexture: require('@/assets/images/materials/blue_scratch.jpg')
  }
});

function InitialScene(props: any) {
  const sceneNavigator = props?.sceneNavigator;
  const viroAppProps = sceneNavigator?.viroAppProps;
  const resetARSession = sceneNavigator?.resetARSession;
  const { setEventCallbacks } = useAugmentedRealityContext();

  const [objectCount, setObjectCount] = useState(0);

  const updateNudgeText = viroAppProps.updateNudgeText;

  const handleAddObject = useCallback(() => {
    setObjectCount((prev) => prev + 1);
    updateNudgeText?.(`Add button clicked: ${objectCount + 1}`);
  }, [objectCount, updateNudgeText, setObjectCount]);

  const handleItemDrag = () => {};

  /** Moves all objects to new location relative to user */
  const handleMoveScene = useCallback(() => {
    const resetTracking = true;
    const removeAnchors = true;
    resetARSession(resetTracking, removeAnchors);
    updateNudgeText?.('Scene moved to new location');
  }, [updateNudgeText, resetARSession]);

  const onTrackingUpdated = (state: ViroConstants) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      updateNudgeText?.('AR tracking is normal');
    } else if (state === ViroConstants.TRACKING_LIMITED) {
      updateNudgeText?.('AR tracking is limited');
    } else if (state === ViroConstants.TRACKING_UNAVAILABLE) {
      updateNudgeText?.('AR tracking is not available');
    }
  };

  /** Save all interactive callbacks for AR UI Overlay */
  useEffect(() => {
    setEventCallbacks({
      handleMoveScene: handleMoveScene,
      handleAddObject: handleAddObject
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEventCallbacks]);

  return (
    <ViroARScene onTrackingUpdated={onTrackingUpdated}>
      <ViroARPlane minHeight={0.1} minWidth={0.1} alignment="Horizontal">
        {Array.from({ length: objectCount }).map((_, index) => (
          <ViroBox
            key={index}
            position={[index * 0.15, 0, -1]}
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

export function AugmentedRealityScene(props: AugmentedRealitySceneProps) {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: InitialScene
        }}
        viroAppProps={props}
        style={{ flex: 1 }}
      />
    </ThemedView>
  );
}
