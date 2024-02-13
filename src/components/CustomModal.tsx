import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { IconDelete } from "./Icons";

type CustomModalProps = {
  index: string;
  handleDelete: (index: string) => void;
};

const CustomModal: React.FunctionComponent<CustomModalProps> = ({
  index,
  handleDelete,
}) => {
  return (
    <DialogTrigger>
      <Button className="flex flex-row items-center gap-2 font-medium text-primary-2">
        <IconDelete></IconDelete>
        <span>Delete</span>
      </Button>
      <ModalOverlay className="fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto bg-black/50 p-4 text-center">
        <Modal className="w-full max-w-md overflow-hidden rounded-2xl bg-neutral-5 p-6 text-left align-middle shadow-xl">
          <Dialog role="alertdialog" className="flex flex-col gap-4">
            {({ close }) => (
              <>
                <Heading
                  slot="title"
                  className="text-xl font-bold  text-neutral-1"
                >
                  Delete comment
                </Heading>
                <p>
                  Are you sure you want to delete this comment? This will remove
                  the comment and can´t be undone
                </p>
                <div className="flex flex-row items-center gap-4">
                  <Button
                    className="w-full rounded-md bg-neutral-2 px-4 py-2 text-center font-bold uppercase text-neutral-5"
                    onPress={close}
                  >
                    No, cancel
                  </Button>
                  <Button
                    className="w-full rounded-md bg-primary-2 px-4 py-2 text-center font-bold uppercase text-neutral-5"
                    onPress={() => {
                      handleDelete(index);
                      close;
                    }}
                  >
                    Yes, delete
                  </Button>
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
};

export default CustomModal;
