import {
  StyleSheet,
  type ViewProps,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Spacing } from '@/constants/styles/Spacing';
import { Layout } from '@/constants/styles/Layout';
import { TextButton } from '@/components/ui/TextButton';
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
import { VALIDATION_RULES } from '@/utils/ReportValidation';
import { uploadReport } from '@/api/report/uploadReport';
import { ReportUploadSuccess } from '@/types/api';

const BOTTOM_SPACE_HEIGHT = 148;

export function ReportForm({ style }: ViewProps) {
  const { replace } = useRouter();
  const { reports, setReports } = useCodesignData();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields },
    reset
  } = useForm({
    defaultValues: DefaultIndoorReport
  });

  const successModal = useModal('success');

  // Set ReportType to MAINTENANCE by default
  setValue('reportType', ReportType.MAINTENANCE);

  const reportLocation = watch('reportLocation');

  const onSubmit = (data: ReportFormDetails) => {
    // TO DO: Add loading animation to submit button while submitting report
    uploadReport(data)
      .then((success: ReportUploadSuccess) => {
        // Update reports locally
        const newReport = new Report({
          ...data,
          id: success.id,
          createdAt: success.createdAt
            ? new Date(success.createdAt)
            : new Date()
        });
        setReports([...reports, newReport]);

        // Navigate to the Map tab on success
        replace({ pathname: TAB_ROUTE_PATH[TAB_ROUTES.INDEX] });
        successModal.openModal();

        // Clear form state
        setSubmissionError(null);
        reset();
      })
      .catch(() => {
        setSubmissionError(
          'An error occurred while submitting report. Please try again.'
        );
      });
  };

  const onReset = () => {
    // Do not change report location when resetting form
    reset({ ...DefaultIndoorReport, reportLocation });
  };

  const switchReportLocation = (
    reportLocation: ReportLocationType,
    onChange: (...event: any[]) => void
  ) => {
    // reset reportLocationDetails when switching between indoor and outdoor
    setValue(
      'reportLocationDetails',
      DefaultIndoorReport.reportLocationDetails
    );

    // call onChange to update the value in the form
    onChange(reportLocation);
  };

  const maybeSwitchLocationAlert = (
    reportLocation: ReportLocationType,
    onChange: (...event: any[]) => void
  ) => {
    const switchingToOutdoor = reportLocation === ReportLocationType.OUTDOOR;
    const isIndoorInputsDirty =
      dirtyFields.reportLocationDetails?.indoorDetails?.buildingName ||
      dirtyFields.reportLocationDetails?.indoorDetails?.floorNumber;

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
          Location Details
        </ThemedText>
        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="coordinates"
            rules={VALIDATION_RULES.coordinates}
            render={({ field: { onChange, value } }) => (
              <SelectLocation
                setSelectedLocation={onChange}
                selectedLocation={value}
                errorText={errors.coordinates?.message}
              />
            )}
          />
        </ThemedView>
        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="reportLocation"
            defaultValue={ReportLocationType.INDOOR}
            rules={VALIDATION_RULES.reportLocation}
            render={({ field: { onChange, value } }) => (
              <>
                <ThemedText type={'formText'}>
                  Issue Location
                  <ThemedText type="error">*</ThemedText>
                </ThemedText>
                {errors.reportLocation && (
                  <ThemedText type="error">
                    {errors.reportLocation.message}
                  </ThemedText>
                )}
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
        {reportLocation === ReportLocationType.INDOOR && (
          <>
            <ThemedView style={styles.input}>
              <Controller
                control={control}
                name="reportLocationDetails.indoorDetails.buildingName"
                rules={VALIDATION_RULES.buildingName}
                render={({ field: { onChange, value } }) => (
                  <ThemedTextInput
                    label="Building Name"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter building name"
                    errorText={
                      errors.reportLocationDetails?.indoorDetails?.buildingName
                        ?.message
                    }
                    required
                  />
                )}
              />
            </ThemedView>
            <ThemedView style={styles.input}>
              <Controller
                control={control}
                name="reportLocationDetails.indoorDetails.floorNumber"
                rules={VALIDATION_RULES.floorNumber}
                render={({ field: { onChange, value } }) => (
                  <ThemedTextInput
                    label="Floor Number"
                    value={value} // value may be number or string
                    onChangeText={(text) => onChange(Number(text) || text)}
                    keyboardType="numeric"
                    placeholder="Enter floor number"
                    errorText={
                      errors.reportLocationDetails?.indoorDetails?.floorNumber
                        ?.message
                    }
                    required
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
            rules={VALIDATION_RULES.images}
            render={({ field: { onChange, value } }) => (
              <ImageUpload
                value={value}
                onChange={onChange}
                errorText={errors.images?.message}
              />
            )}
          />
        </ThemedView>

        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="title"
            rules={VALIDATION_RULES.title}
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                label="Title"
                onChangeText={onChange}
                value={value}
                placeholder="Enter title"
                errorText={errors.title?.message}
                testID="report-form-title-input"
                required
              />
            )}
          />
        </ThemedView>

        <ThemedView style={styles.input}>
          <Controller
            control={control}
            name="description"
            rules={VALIDATION_RULES.description}
            render={({ field: { onChange, value } }) => (
              <ThemedTextInput
                label="Description"
                onChangeText={onChange}
                value={value}
                placeholder="Enter details about the issue here"
                multiline
                numberOfLines={4}
                errorText={errors.description?.message}
                testID="report-form-description-input"
                required
              />
            )}
          />
        </ThemedView>
        <ThemedView style={[styles.errorContainer]}>
          {submissionError && (
            <ThemedText type="error" style={[Typography.textRight]}>
              {submissionError}
            </ThemedText>
          )}
        </ThemedView>
        <ThemedView style={[styles.submitContainer]}>
          <TextButton
            text="Reset Form"
            type="tertiary"
            smallCaps={false}
            textStyle={styles.clearFormButton}
            onPress={onReset}
          />
          <TextButton
            text="Submit"
            type="primary"
            onPress={handleSubmit(onSubmit)}
            testID="submit-report-button"
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
  errorContainer: {
    ...Layout.flex,
    ...Layout.alignEnd,
    gap: Spacing.medium,
    marginBottom: Spacing.medium
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
