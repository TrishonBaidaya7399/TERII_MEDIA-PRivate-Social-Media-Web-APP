import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ShareModal.css";
import PostShare from "../PostShare/PostShare";
function ShareModal({ modalOpened, setModalOpened }) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        // title="Authentication"
        size="55%"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}>
        <PostShare />
      </Modal>

      {/* <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group> */}
    </>
  );
}
export default ShareModal;
