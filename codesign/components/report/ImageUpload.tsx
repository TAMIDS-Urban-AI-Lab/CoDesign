import { useState } from 'react';
import { StyleSheet, type ViewProps, Image } from 'react-native';
import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
  type ImagePickerAsset
} from 'expo-image-picker';

import { ThemedView } from '@/components/ThemedView';
import { TextButton } from '@/components/shared/TextButton';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { Border } from '@/constants/styles/Border';
import { tamuColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ImageButton } from '@/components/ui/ImageButton';
import { ImageDetails } from '@/types/Report';

const PHOTO_HEIGHT = 120;
const IMAGE_UPLOAD_LIMIT = 3;
const PLACEHOLDER_KEY = 'placeholder';
const REMOVE_IMAGE_SRC = require('@/assets/images/circle-xmark.png');

type ImageUploadProps = {
  style?: ViewProps['style'];
  onChange: (...event: any[]) => void;
  value: ImageDetails[];
};

export function ImageUpload({ style, onChange, value }: ImageUploadProps) {
  const [images, setImages] = useState<ImageDetails[]>([]);
  value = images;

  const [status, requestPermission] = useMediaLibraryPermissions();

  const pickImage = async () => {
    if (!status?.granted) {
      requestPermission();
    }

    launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      selectionLimit: 1,
      base64: true // access base64 encoded image data
    })
      .then((result) => {
        if (!result.canceled) {
          const newImages = [...images];

          const imagePickerAsset: ImagePickerAsset = result.assets[0];
          if (imagePickerAsset.uri && imagePickerAsset.base64) {
            newImages.push({
              uri: imagePickerAsset.uri,
              base64: imagePickerAsset.base64
            } as ImageDetails);
            setImages(newImages);
            onChange(newImages);
          } else {
            throw new Error('Failed to upload image to Codesign');
          }
        }
      })
      .catch((error) => {
        // TO DO: Show error to user when uploading image fails
      });
  };

  const maxImagesUploaded = images.length >= IMAGE_UPLOAD_LIMIT;
  const placeholderCount = IMAGE_UPLOAD_LIMIT - images.length;

  var renderArray: string[] = [
    ...images.map((imagePickerAsset) => imagePickerAsset.uri),
    ...(Array.from({ length: placeholderCount }).fill(
      PLACEHOLDER_KEY
    ) as string[])
  ];

  const removeImage = (index: number) => {
    const newImages = [...images].toSpliced(index, 1);
    setImages(newImages);
  };

  return (
    <ThemedView style={style}>
      <ThemedView style={styles.imagePreviewRow} key="image_previews">
        {renderArray.map((imageURI, index) => {
          if (imageURI === PLACEHOLDER_KEY) {
            return <DefaultImage key={`${PLACEHOLDER_KEY}_${index}`} />;
          } else {
            return (
              <ThemedView
                key={`uploaded_${index}`}
                style={styles.imageContainer}
              >
                <ImageButton
                  source={REMOVE_IMAGE_SRC}
                  size={24}
                  transparent={true}
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                />
                <Image source={{ uri: imageURI }} style={styles.image} />
              </ThemedView>
            );
          }
        })}
      </ThemedView>
      {!maxImagesUploaded && (
        <TextButton type="secondary" text="Add Photos" onPress={pickImage} />
      )}
      {maxImagesUploaded && (
        <ThemedText
          type="feedback"
          lightColor={tamuColors.gray700}
          darkColor={tamuColors.accentGold}
        >
          Up to {IMAGE_UPLOAD_LIMIT} images may be uploaded. Please remove an
          existing image to upload another.
        </ThemedText>
      )}
    </ThemedView>
  );
}

function DefaultImage() {
  return (
    <ThemedView
      lightColor={tamuColors.gray300}
      darkColor={tamuColors.gray800}
      style={styles.defaultContainer}
    >
      <IconSymbol name="photo.fill" size={28} color={tamuColors.gray500} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  imagePreviewRow: {
    ...Layout.row,
    ...Layout.justifySpaceEvenly,
    gap: Spacing.medium,
    marginBottom: Spacing.large
  },
  defaultContainer: {
    ...Layout.flex,
    ...Layout.center,
    ...Border.elevatedSmall,
    ...Border.roundedSmall,
    width: 'auto',
    height: PHOTO_HEIGHT
  },
  imageContainer: {
    ...Layout.flex,
    ...Layout.absolute,
    ...Border.elevatedSmall,
    ...Border.roundedSmall,
    width: 'auto',
    height: PHOTO_HEIGHT
  },
  image: {
    // ...Layout.flex,
    width: '100%',
    height: '100%',
    ...Border.roundedSmall
  },
  removeImageButton: {
    position: 'absolute',
    top: Spacing.xsmall,
    right: Spacing.xsmall,
    zIndex: 1
  }
});
