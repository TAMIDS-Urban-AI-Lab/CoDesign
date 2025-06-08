import { ThemedView } from '@/components/ui/ThemedView';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText
} from '@reactvision/react-viro';

const InitialScene = () => {
  return (
    <ViroARScene>
      <ViroText
        text="Hello AR World!"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={{ fontSize: 20, color: '#ffffff' }}
      />
    </ViroARScene>
  );
};

export function Basic() {
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
