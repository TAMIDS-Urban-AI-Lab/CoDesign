import { StyleSheet, Image, type ViewProps, Pressable } from 'react-native';
import { Camera } from '@rnmapbox/maps';

import { MapView } from '@/components/map/MapView';
import { Coordinates } from '@/types/Report';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { ThemedText } from '@/components/ThemedText';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';
import { ThemedView } from '@/components/ThemedView';
import { MarkerView } from '@/components/map/MarkerView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Spacing } from '@/constants/styles/Spacing';
import { useModal } from '@/components/provider/ModalProvider';
import { ImageButton } from '@/components/ui/ImageButton';
import { ThemedModal } from '@/components/ui/ThemedModal';
import { TextButton } from '@/components/shared/TextButton';
import { Typography } from '@/constants/styles/Typography';
const PREVIEW_HEIGHT = 120;

const PIN_ICON_SRC = {
  light: require('@/assets/images/location-dot-light.png'),
  dark: require('@/assets/images/location-dot-dark.png')
};

type SelectLocationProps = {
  style?: ViewProps['style'];
  selectedLocation?: Coordinates;
  setSelectedLocation?: (location: Coordinates) => void;
};

export function SelectLocation({
  style,
  selectedLocation,
  setSelectedLocation
}: SelectLocationProps) {
  const { isVisible, openModal, closeModal } = useModal('selectLocation');

  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';

  const pinLocation: Coordinates = selectedLocation ?? ALBRITTON_BELL_TOWER;
  const previewCenter = [pinLocation[0], pinLocation[1] - 0.001] as Coordinates;

  return (
    <>
      <ThemedView style={[styles.container, style]}>
        <Pressable style={[styles.roundCorner]} onPress={openModal}>
          <MapView style={[styles.previewMap]}>
            <Camera
              zoomLevel={14}
              centerCoordinate={previewCenter}
              animationMode="moveTo"
              animationDuration={0}
            />
            <MarkerView coordinates={pinLocation}>
              <Image
                source={PIN_ICON_SRC[colorScheme]}
                style={styles.pinImage}
              ></Image>
            </MarkerView>
          </MapView>
        </Pressable>
      </ThemedView>
      <ThemedView style={[styles.messageContainer]} transparent={true}>
        <ThemedText type="feedback">Tap to select location</ThemedText>
      </ThemedView>
      <ThemedModal animationType="slide" visible={isVisible}>
        <ThemedView style={styles.modalContainer}>
          <ImageButton
            source={require('@/assets/images/back-arrow.png')}
            size={24}
            onPress={closeModal}
            elevated={true}
            style={styles.backButton}
          />
          <ThemedView
            style={styles.pinAbsoluteContainer}
            transparent={true}
            pointerEvents="none"
          >
            <ThemedView
              style={styles.pinFillContainer}
              transparent={true}
              pointerEvents="none"
            >
              <Image
                source={PIN_ICON_SRC[colorScheme]}
                style={[styles.pinImage]}
              />
            </ThemedView>
          </ThemedView>
          <ThemedView style={[Layout.flex]}>
            <MapView style={[Layout.flex]}>
              <Camera
                zoomLevel={14}
                centerCoordinate={pinLocation}
                animationMode="moveTo"
              />
            </MapView>
            <ThemedView style={styles.bottomSheetContainer}>
              <TextButton
                type="tertiary"
                text="Use Current Location"
                textStyle={styles.setCurrentLocationText}
                smallCaps={false}
              >
                <Image
                  source={require('@/assets/images/location-icon.png')}
                  style={styles.locationIcon}
                />
              </TextButton>
              <TextButton type="primary" text="Set Location" />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: PREVIEW_HEIGHT,
    ...Border.roundedLarge,
    ...Border.elevatedSmall
  },
  roundCorner: {
    ...Layout.flex,
    ...Border.roundedLarge,
    overflow: 'hidden'
  },
  previewMap: {
    height: '150%'
  },
  pinAbsoluteContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1 // Position pin above map
  },
  pinFillContainer: {
    ...Layout.flex,
    ...Layout.center
  },
  pinImage: {
    width: 24,
    height: 24
  },
  messageContainer: {
    ...Layout.center,
    ...Layout.flex,
    marginTop: Spacing.small
  },
  modalContainer: {
    ...Layout.flex
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xxxlarge,
    left: Spacing.large,
    zIndex: 1
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    ...Border.roundedTopLarge,
    ...Border.elevated,
    gap: Spacing.small,
    padding: Spacing.large,
    paddingBottom: Spacing.xxlarge
  },
  locationIcon: {
    width: 24,
    height: 24
  },
  setCurrentLocationText: {
    ...Typography.formText
  }
});
