import {
  StyleSheet,
  type ViewProps,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Spacing } from '@/constants/styles/Spacing';
import { Layout } from '@/constants/styles/Layout';
import { TextButton } from '@/components/shared/TextButton';
import { ThemedRadioButton } from '@/components/ui/ThemedRadioButton';
import { ThemedTextInput } from '@/components/ui/ThemedTextInput';
import { Typography } from '@/constants/styles/Typography';
import { DefaultIndoorReport } from '@/constants/report/Report';
import {
  ReportLocationType,
  ReportType,
  ReportFormDetails,
  Report
} from '@/types/Report';
import { useCodesignData } from '@/components/provider/CodesignDataProvider';
import { TAB_ROUTE_PATH, TAB_ROUTES } from '@/constants/Routes';
import { ImageUpload } from '@/components/report/ImageUpload';
import { useModal } from '@/components/provider/ModalProvider';
import { SelectLocation } from '@/components/report/SelectLocation';
import { uploadReport } from '@/api/report/uploadReport';

const BOTTOM_SPACE_HEIGHT = 148;

export function ReportForm({ style }: ViewProps) {
  const router = useRouter();
  const { reports, setReports } = useCodesignData();

  const { control, handleSubmit, watch, setValue, formState, reset } = useForm({
    defaultValues: DefaultIndoorReport
  });

  const successModal = useModal('success');

  // Set ReportType to MAINTENANCE by default
  setValue('reportType', ReportType.MAINTENANCE);

  const reportLocation = watch('reportLocation');

  const onSubmit = (data: ReportFormDetails) => {
    // TO DO: Add form validation before submitting report

    uploadReport(data)
      .then((success) => {
        // Create Report from user submitted data
        const newReport = new Report({
          ...data,
          id: success.id,
          createdAt: new Date()
        });
        // Navigate to the Map tab
        router.replace({ pathname: TAB_ROUTE_PATH[TAB_ROUTES.INDEX] });
        setReports([...reports, newReport]);
        successModal.openModal();
        reset();
      })
      .catch((error) => {
        // TO DO #24: Show an error on the form
      });
  };

  const switchReportLocation = (
    reportLocation: ReportLocationType,
    onChange: (...event: any[]) => void
  ) => {
    // reset reportLocationDetails when switching between indoor and outdoor
    setValue('reportLocationDetails', {});

    // call onChange to update the value in the form
    onChange(reportLocation);
  };

  const maybeSwitchLocationAlert = (
    reportLocation: ReportLocationType,
    onChange: (...event: any[]) => void
  ) => {
    const switchingToOutdoor = reportLocation === ReportLocationType.OUTDOOR;
    const isIndoorInputsDirty =
      formState.dirtyFields.reportLocationDetails?.indoorDetails
        ?.buildingName ||
      formState.dirtyFields.reportLocationDetails?.indoorDetails?.floorNumber;

    // Only show alert if user has filled out indoor fields
    if (switchingToOutdoor && isIndoorInputsDirty) {
      Alert.alert(
        'Are you sure?',
        'This will clear the Building Name and Floor Number',
        [
          {
            text: 'Cancel',
            onPress: () => {}
          },
          {
            text: 'Yes',
            onPress: () => switchReportLocation(reportLocation, onChange)
          }
        ]
      );
    } else {
      switchReportLocation(reportLocation, onChange);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={[style]}>
        <ThemedText
          type="title4"
          withDivider={true}
          style={{ marginBottom: Spacing.small }}
        >
          Location
        </ThemedText>
        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="reportLocation"
            defaultValue={ReportLocationType.INDOOR}
            render={({ field: { onChange, value } }) => (
              <>
                <ThemedRadioButton
                  title="Indoor"
                  checked={value === ReportLocationType.INDOOR}
                  onPress={() =>
                    maybeSwitchLocationAlert(
                      ReportLocationType.INDOOR,
                      onChange
                    )
                  }
                />
                <ThemedRadioButton
                  title="Outdoor"
                  checked={value === ReportLocationType.OUTDOOR}
                  onPress={() =>
                    maybeSwitchLocationAlert(
                      ReportLocationType.OUTDOOR,
                      onChange
                    )
                  }
                />
              </>
            )}
          />
        </ThemedView>

        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="coordinates"
            render={({ field: { onChange, value } }) => (
              <SelectLocation
                setSelectedLocation={onChange}
                selectedLocation={value}
              />
            )}
          />
        </ThemedView>

        {reportLocation === ReportLocationType.INDOOR && (
          <>
            <ThemedView style={styles.input}>
              <Controller
                control={control}
                name="reportLocationDetails.indoorDetails.buildingName"
                render={({ field: { onChange, value } }) => (
                  <ThemedTextInput
                    label="Building Name"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter building name"
                  />
                )}
              />
            </ThemedView>
            <ThemedView style={styles.input}>
              <Controller
                control={control}
                name="reportLocationDetails.indoorDetails.floorNumber"
                render={({ field: { onChange, value } }) => (
                  <ThemedTextInput
                    label="Floor Number"
                    value={value} // value is a number on purpose
                    onChangeText={(text) => onChange(parseInt(text, 10) || 1)}
                    keyboardType="numeric"
                    placeholder="Enter floor number"
                  />
                )}
              />
            </ThemedView>
          </>
        )}

        <ThemedText
          type="title4"
          style={[{ marginBottom: Spacing.large }]}
          withDivider={true}
        >
          Report Details
        </ThemedText>

        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="images"
            render={({ field: { onChange, value } }) => (
              <ImageUpload value={value} onChange={onChange} />
            )}
          />
        </ThemedView>

        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                label="Title"
                onChangeText={onChange}
                value={value}
                placeholder="Enter title"
              />
            )}
          />
        </ThemedView>

        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                label="Description"
                onChangeText={onChange}
                value={value}
                placeholder="Enter details about the issue here"
                multiline
                numberOfLines={4}
              />
            )}
          />
        </ThemedView>
        <ThemedView style={[styles.submitContainer]}>
          <TextButton
            text="Reset Form"
            type="tertiary"
            smallCaps={false}
            textStyle={styles.clearFormButton}
            onPress={() => reset()}
          />
          <TextButton
            text="Submit"
            type="primary"
            onPress={handleSubmit(onSubmit)}
          />
        </ThemedView>
        <ThemedView style={styles.bottomSpace}></ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: Spacing.large
  },
  submitContainer: {
    ...Layout.row,
    ...Layout.justifyEnd
  },
  clearFormButton: {
    ...Typography.paragraph,
    fontFamily: 'WorkSansItalic'
  },
  bottomSpace: {
    height: BOTTOM_SPACE_HEIGHT
  }
});
