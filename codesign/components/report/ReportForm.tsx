import {
  StyleSheet,
  type ViewProps,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

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
  ReportFormDetails
} from '@/types/Report';
import createReport from '@/hooks/report/createReport';

const BOTTOM_SPACE_HEIGHT = 148;

export function ReportForm({ style }: ViewProps) {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: DefaultIndoorReport
  });

  // Set ReportType to FEEDBACK by default
  setValue('reportType', ReportType.FEEDBACK);

  const reportLocation = watch('reportLocation');

  const onSubmit = (data: ReportFormDetails) => {
    // TO DO: Add form validation before submitting report
    createReport(data);
  };

  const switchReportLocation = (
    reportLocation: ReportLocationType,
    onChange: (...event: any[]) => void
  ) => {
    // [TO DO: #23]: Add confirmation dialog informing user that Indoor details will be cleared

    // reset reportLocationDetails when switching between indoor and outdoor
    setValue('reportLocationDetails', {});

    // call onChange to update the value in the form
    onChange(reportLocation);
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
                    switchReportLocation(ReportLocationType.INDOOR, onChange)
                  }
                />
                <ThemedRadioButton
                  title="Outdoor"
                  checked={value === ReportLocationType.OUTDOOR}
                  onPress={() =>
                    switchReportLocation(ReportLocationType.OUTDOOR, onChange)
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
                  // Do not pass value prop to ThemedTextInput, it is managed by onChangeText
                  <ThemedTextInput
                    label="Floor Number"
                    onChangeText={(text) => onChange(parseInt(text, 10) || 1)}
                    keyboardType="numeric"
                    placeholder="Enter floor number please:"
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
            text="Clear Form"
            type="tertiary"
            smallCaps={false}
            textStyle={styles.clearFormButton}
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