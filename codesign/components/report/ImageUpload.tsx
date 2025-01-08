import { useState } from 'react';
import { StyleSheet, type ViewProps, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ThemedView } from '@/components/ThemedView';
import { TextButton } from '@/components/shared/TextButton';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { Border } from '@/constants/styles/Border';
import { tamuColors } from '@/constants/Colors';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedText } from '../ThemedText';

const PHOTO_HEIGHT = 120;
const IMAGE_UPLOAD_LIMIT = 3;
const PLACEHOLDER_KEY = 'placeholder';

type ImageUploadProps = {
  style: ViewProps['style'];
};

export function ImageUpload({ style }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      const newImages = [...images];
      newImages.push(result.assets[0].uri);
      setImages(newImages);
      setImage(result.assets[0].uri);
    }
  };

  const maxImagesUploaded = images.length >= IMAGE_UPLOAD_LIMIT;
  const placeholderCount = IMAGE_UPLOAD_LIMIT - images.length;

  var renderArray: string[] = [
    ...images,
    ...(Array.from({ length: placeholderCount }).fill(
      PLACEHOLDER_KEY
    ) as string[])
  ];

  console.log('DEBUG');

  return (
    <ThemedView style={style}>
      <ThemedView style={styles.imagePreviewRow}>
        {renderArray.map((imageURI, index) => {
          if (imageURI === PLACEHOLDER_KEY) {
            return <DefaultImage keyName={`placeholder_${index}`} />;
          } else {
            return (
              <ThemedView
                key={`uploaded_${index}`}
                style={styles.imageContainer}
              >
                <Image source={{ uri: imageURI }} style={styles.image} />
              </ThemedView>
            );
          }
        })}
      </ThemedView>
      {image && <Image source={{ uri: image }} style={styles.image} />}
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

function DefaultImage({ keyName }: { keyName: string }) {
  return (
    <ThemedView
      key={keyName}
      lightColor={tamuColors.gray300}
      darkColor={tamuColors.gray800}
      style={styles.imageContainer}
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
  imageContainer: {
    ...Layout.flex,
    ...Layout.center,
    ...Border.elevatedSmall,
    ...Border.roundedSmall,
    width: 'auto',
    height: PHOTO_HEIGHT
  },
  image: {
    flex: 1,
    width: '100%',
    ...Border.roundedSmall
  }
});
