import { StyleSheet, type ViewProps, Image } from 'react-native';
import { useState } from 'react';
import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
  type ImagePickerAsset
} from 'expo-image-picker';

import { ThemedView } from '@/components/ui/ThemedView';
import { TextButton } from '@/components/ui/TextButton';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { Border } from '@/constants/styles/Border';
import { tamuColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ui/ThemedText';
import { ImageButton } from '@/components/ui/ImageButton';
import { ImageDetails } from '@/types/Report';

const PHOTO_HEIGHT = 120;
export const IMAGE_UPLOAD_LIMIT = 3;
const PLACEHOLDER_KEY = 'placeholder';
const REMOVE_IMAGE_SRC = require('@/assets/images/circle-xmark.png');
const MAX_MB = 20;
const MAX_IMAGE_SIZE = MAX_MB * 1024 * 1024;

type ImageUploadProps = {
  style?: ViewProps['style'];
  onChange: (...event: any[]) => void;
  value: ImageDetails[];
  errorText?: string;
};

export function ImageUpload({
  style,
  onChange: updateForm,
  value: images,
  errorText
}: ImageUploadProps) {
  const [status, requestPermission] = useMediaLibraryPermissions();
  const [uploadErrorText, setUploadErrorText] = useState<string | null>(null);

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

          if ((imagePickerAsset.fileSize ?? 0) > MAX_IMAGE_SIZE) {
            throw new Error(`Image size exceeds ${MAX_MB} MB`);
          }
          if (imagePickerAsset.uri && imagePickerAsset.base64) {
            newImages.push({
              uri: imagePickerAsset.uri,
              base64: imagePickerAsset.base64
            } as ImageDetails);
            updateForm(newImages);
            setUploadErrorText(null);
          } else {
            throw new Error('Failed to upload image. Please try again.');
          }
        }
      })
      .catch((error) => {
        setUploadErrorText(error.message);
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
    updateForm(newImages);
  };

  return (
    <ThemedView style={style}>
      {errorText && (
        <ThemedText type="error" style={styles.errorText}>
          {errorText}
        </ThemedText>
      )}
      {uploadErrorText && (
        <ThemedText type="error" style={styles.errorText}>
          {uploadErrorText}
        </ThemedText>
      )}
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
          Up to {IMAGE_UPLOAD_LIMIT} images may be uploaded.
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
  errorText: {
    marginBottom: Spacing.small
  },
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
    top: 0,
    right: 0,
    zIndex: 1
  }
});
