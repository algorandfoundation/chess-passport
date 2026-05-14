import Button from '@/components/world-chess/Button';
import theme from '@/theme/theme';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePickerLib from 'expo-image-picker';
import { forwardRef, useCallback, useState } from 'react';
import { Image, Pressable, Text, View, useWindowDimensions } from 'react-native';

interface AddProofSheetProps {
  onDismiss: () => void;
  onUploadProof?: () => void;
}

const AddProofSheet = forwardRef<BottomSheetModal, AddProofSheetProps>(
  ({ onDismiss, onUploadProof }, ref) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const { height: windowHeight } = useWindowDimensions();
    // Explicit pixel height so the area fills space inside Reanimated's BottomSheetView
    // (flex: 1 doesn't resolve inside worklet-driven layout)
    // 70% snap point minus header (~68px), description (~68px), upload button (~76px), paddings (~32px)
    const uploadAreaHeight = windowHeight * 0.7 - 244;

    const renderBackdrop = useCallback(
      (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      [],
    );

    const onPickFromGallery = useCallback(async () => {
      const result = await ImagePickerLib.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    }, []);

    const onTakePhoto = useCallback(async () => {
      const result = await ImagePickerLib.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    }, []);

    const onUpload = useCallback(() => {
      // Placeholder — wire up upload logic here
      if (typeof onUploadProof === 'function') onUploadProof();
      onDismiss();
    }, [onDismiss, onUploadProof]);

    const onRetake = useCallback(() => {
      setImageUri(null);
    }, []);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={['70%']}
        index={0}
        enablePanDownToClose
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.semantic.bg['surface-1'] }}
        handleIndicatorStyle={{ display: 'none' }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            paddingHorizontal: theme.primitives.spacing['16'],
            paddingBottom: theme.primitives.spacing['32'],
            flexDirection: 'column',
          }}
        >
          {/* Header row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.primitives.spacing['24'],
              position: 'relative',
            }}
          >
            <Text
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                color: theme.semantic.fg['high-emphasis'] as string,
                fontSize: theme.primitives.font.size['p-md'],
                fontFamily: theme.primitives.font.family.p,
                textAlign: 'center',
              }}
            >
              Add Proof
            </Text>
            <Pressable onPress={onDismiss} hitSlop={8}>
              <Text
                style={{
                  color: theme.semantic.fg['brand-secondary'] as string,
                  fontSize: theme.primitives.font.size['p-lg'],
                  fontFamily: theme.primitives.font.family.p,
                  marginLeft: theme.primitives.spacing['8'],
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>

          {/* Content container with flex growth */}
          <Text
            style={{
              color: theme.semantic.fg['medium-emphasis'] as string,
              fontSize: theme.primitives.font.size['p-md'],
              fontFamily: theme.primitives.font.family.p,
              textAlign: 'center',
              marginBottom: theme.primitives.spacing['24'],
              paddingHorizontal: theme.primitives.spacing['8'],
              width: '85%',
              alignSelf: 'center',
            }}
          >
            Upload a document that proves you attended this event
          </Text>

          {/* File upload area */}
          <View
            style={{
              height: uploadAreaHeight,
              borderWidth: 1,
              borderColor: theme.semantic.stroke['low-emphasis'] as string,
              borderStyle: 'dashed',
              borderRadius: theme.primitives.radius['8'],
              paddingHorizontal: theme.primitives.spacing['16'],
              paddingVertical: theme.primitives.spacing['16'],
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.primitives.spacing['8'],
              marginBottom: theme.primitives.spacing['12'],
              overflow: 'hidden',
            }}
          >
            {!imageUri ? (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  size={36}
                  color={theme.semantic.fg['medium-emphasis'] as string}
                />
                <Text
                  style={{
                    color: theme.semantic.fg['low-emphasis'] as string,
                    fontSize: theme.primitives.font.size['p-sm'],
                    fontFamily: theme.primitives.font.family.p,
                    marginBottom: theme.primitives.spacing['4'],
                  }}
                >
                  Images only
                </Text>
                <View style={{ flexDirection: 'row', gap: theme.primitives.spacing['8'] }}>
                  <Button
                    label="Gallery"
                    variant="secondary"
                    size="small"
                    onPress={onPickFromGallery}
                    leftIcon={
                      <Feather
                        name="image"
                        size={14}
                        color={theme.semantic.fg['brand-primary'] as string}
                      />
                    }
                  />
                  <Button
                    label="Camera"
                    variant="secondary"
                    size="small"
                    onPress={onTakePhoto}
                    leftIcon={
                      <Feather
                        name="camera"
                        size={14}
                        color={theme.semantic.fg['brand-primary'] as string}
                      />
                    }
                  />
                </View>
              </>
            ) : (
              <>
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: '100%',
                    height: uploadAreaHeight - 60,
                    borderRadius: theme.primitives.radius['6'],
                  }}
                  resizeMode="cover"
                />
                <Button
                  label="Retake"
                  variant="secondary"
                  size="small"
                  onPress={onRetake}
                  leftIcon={
                    <MaterialIcons
                      name="undo"
                      size={14}
                      color={theme.semantic.fg['brand-primary'] as string}
                    />
                  }
                />
              </>
            )}
          </View>

          {/* Upload button */}
          <View style={{ marginTop: theme.primitives.spacing['12'] }}>
            <Button
              label="Upload"
              variant="primary"
              onPress={onUpload}
              disabled={!imageUri}
              leftIcon={
                <Feather
                  name="upload"
                  size={16}
                  color={theme.semantic.fg.black as string}
                  style={{ paddingRight: theme.primitives.spacing[2] }}
                />
              }
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

AddProofSheet.displayName = 'AddProofSheet';

export default AddProofSheet;
