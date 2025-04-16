import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react-native';
import { Text, View, Modal, Pressable } from 'react-native';

import { ModalProvider, useModal } from '@/components/provider/ModalProvider';

const TestModalComponent = ({ modalName }: { modalName: string }) => {
  const { isVisible, openModal, closeModal } = useModal(modalName);
  return (
    <View>
      <Pressable onPress={openModal}>
        <Text>{`Open ${modalName}`}</Text>
      </Pressable>
      <Modal visible={isVisible} testID={`${modalName}-modal`}>
        <Text>{modalName}</Text>
        <Pressable onPress={closeModal}>
          <Text>{`Close ${modalName}`}</Text>
        </Pressable>
      </Modal>
    </View>
  );
};

describe('<ModalProvider />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should open and close modal correctly', async () => {
    // When rendering a modal
    const modalName = 'test';
    render(
      <ModalProvider>
        <TestModalComponent modalName={modalName} />
      </ModalProvider>
    );

    // Then the modal should not be visible initially
    expect(screen.queryByTestId(`${modalName}-modal`)).toBeNull();

    // When the open button is pressed
    const openModalButton = await screen.findByText(`Open ${modalName}`);
    fireEvent.press(openModalButton);

    // Then the modal should be visible
    await waitFor(() => {
      expect(screen.getByTestId(`${modalName}-modal`)).toBeVisible();
    });

    // When the close button is pressed
    const closeModalButton = await screen.findByText(`Close ${modalName}`);
    fireEvent.press(closeModalButton);

    // Then the modal should no longer be visible
    await waitFor(() => {
      expect(screen.queryByTestId(`${modalName}-modal`)).toBeNull();
    });
  });

  test('should open and close multiple modals correctly', async () => {
    // When rendering multiple modals
    const [modal1, modal2] = ['test1', 'test2'];
    render(
      <ModalProvider>
        <TestModalComponent modalName={modal1} />
        <TestModalComponent modalName={modal2} />
      </ModalProvider>
    );

    // Then both modals should not be visible initially
    expect(screen.queryByTestId(`${modal1}-modal`)).toBeNull();
    expect(screen.queryByTestId(`${modal2}-modal`)).toBeNull();

    // When modal 1 is opened
    const openModalButton = await screen.findByText(`Open ${modal1}`);
    fireEvent.press(openModalButton);

    // Then only modal 1 should be visible
    await waitFor(() => {
      expect(screen.getByTestId(`${modal1}-modal`)).toBeVisible();
    });
    // And modal 2 should not be visible
    expect(screen.queryByTestId(`${modal2}-modal`)).toBeNull();

    // When modal 1 is closed
    const closeModalButton = await screen.findByText(`Close ${modal1}`);
    fireEvent.press(closeModalButton);

    // Then modal 1 should no longer be visible
    await waitFor(() => {
      expect(screen.queryByTestId(`${modal1}-modal`)).toBeNull();
    });
    expect(screen.queryByTestId(`${modal2}-modal`)).toBeNull();
  });
});
