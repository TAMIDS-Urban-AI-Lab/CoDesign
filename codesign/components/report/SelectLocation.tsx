import {
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType
} from 'react-native';
import { useRef, useState } from 'react';
import MapGL, { Camera } from '@rnmapbox/maps';
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location';

import { MapView } from '@/components/map/MapView';
import { Coordinates } from '@/types/Report';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MarkerView } from '@/components/map/MarkerView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Spacing } from '@/constants/styles/Spacing';
import { useModal } from '@/components/provider/ModalProvider';
import { ImageButton } from '@/components/ui/ImageButton';
import { ThemedModal } from '@/components/ui/ThemedModal';
import { TextButton } from '@/components/shared/TextButton';
import { Typography } from '@/constants/styles/Typography';
import { DefaultIndoorReport } from '@/constants/report/Report';

const CAMERA_ZOOM = 16;
const PREVIEW_HEIGHT = 120;
const PIN_ICON_SRC = {
  light: require('@/assets/images/location-dot-light.png'),
  dark: require('@/assets/images/location-dot-dark.png')
};

type SelectLocationProps = {
  selectedLocation: Coordinates;
  setSelectedLocation: (location: Coordinates) => void;
  errorText?: string;
};

export function SelectLocation({
  selectedLocation,
  setSelectedLocation,
  errorText
}: SelectLocationProps) {
  const {
    isVisible,
    openModal: openLocationModal,
    closeModal: closeLocationModal
  } = useModal('selectLocation');

  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const pinImageSrc = PIN_ICON_SRC[colorScheme];

  const modalMapRef = useRef<MapGL.MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(
    null
  );
  const [mapKey, forceMapRerender] = useState(0);

  // Determine center of map
  var pinLocation: Coordinates;
  if (currentLocation) {
    pinLocation = currentLocation;
  } else if (selectedLocation) {
    pinLocation = selectedLocation;
  } else {
    pinLocation = DefaultIndoorReport.coordinates;
  }

  async function updateSelectedLocation() {
    if (modalMapRef.current) {
      modalMapRef.current
        .getCenter()
        .then((center) => {
          setSelectedLocation(center as Coordinates);
          setCurrentLocation(null);
          closeLocationModal();
        })
        .catch((error) => {
          console.error('Error fetching map center:', error);
        });
    }
  }

  async function centerMapOnCurrentLocation() {
    requestForegroundPermissionsAsync()
      .then((response) => {
        if (response.status !== 'granted') {
          throw new Error('Location permission not granted');
        }
        getCurrentPositionAsync({}).then((location: LocationObject) => {
          setCurrentLocation(locationToCoordinates(location));
          forceMapRerender((prevKey) => prevKey + 1);
        });
      })
      .catch((error) => {
        console.error('Error fetching location permission:', error);
        // TO DO: Show an error that the location permission is required
      });
  }

  const handleBackButton = () => {
    setCurrentLocation(null);
    closeLocationModal();
  };

  return (
    <>
      {errorText && (
        <ThemedText type="error" style={{ marginBottom: Spacing.small }}>
          {errorText}
        </ThemedText>
      )}
      <LocationPreview
        onPress={openLocationModal}
        pinLocation={pinLocation}
        pinImageSrc={pinImageSrc}
      />

      <ThemedModal animationType="slide" visible={isVisible}>
        <ThemedView style={styles.modalContainer}>
          <ImageButton
            source={require('@/assets/images/back-arrow.png')}
            size={24}
            onPress={handleBackButton}
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
            <MapView style={[Layout.flex]} ref={modalMapRef} key={mapKey}>
              <Camera
                zoomLevel={CAMERA_ZOOM}
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
                onPress={() => centerMapOnCurrentLocation()}
              >
                <Image
                  source={require('@/assets/images/location-icon.png')}
                  style={styles.locationIcon}
                />
              </TextButton>
              <TextButton
                type="primary"
                text="Set Location"
                onPress={() => updateSelectedLocation()}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedModal>
    </>
  );
}

type LocationPreviewProps = {
  onPress: () => void;
  pinLocation: Coordinates;
  pinImageSrc: ImageSourcePropType;
};

function LocationPreview({
  onPress,
  pinLocation,
  pinImageSrc
}: LocationPreviewProps) {
  const previewCenter = [
    pinLocation[0],
    pinLocation[1] - 0.00025
  ] as Coordinates;

  return (
    <ThemedView>
      <ThemedView style={[styles.previewContainer]}>
        <Pressable style={[styles.roundCorner]} onPress={onPress}>
          <MapView style={[styles.previewMap]}>
            <Camera
              zoomLevel={CAMERA_ZOOM}
              centerCoordinate={previewCenter}
              animationMode="moveTo"
              animationDuration={0}
            />
            <MarkerView coordinates={pinLocation}>
              <Image source={pinImageSrc} style={styles.pinImage}></Image>
            </MarkerView>
          </MapView>
        </Pressable>
      </ThemedView>
      <ThemedView style={[styles.messageContainer]} transparent={true}>
        <ThemedText type="feedback">Tap to select location</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

function locationToCoordinates(location: LocationObject): Coordinates {
  return [location.coords.longitude, location.coords.latitude] as Coordinates;
}

const styles = StyleSheet.create({
  previewContainer: {
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
