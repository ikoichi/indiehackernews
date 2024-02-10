"use client";

import { useColorModeValues } from "@/hooks/useColorModeValues";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateWorkspaceModal = ({ isOpen, onClose }: Props) => {
  const { secondaryTextColor } = useColorModeValues();

  const [workspaceName, setWorkspaceName] = useState("");
  const [isCreating, setCreating] = useState(false);

  const onCreate = () => {
    setCreating(true);
    axios
      .post("/api/workspace", {
        name: workspaceName,
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again later.");
      })
      .finally(() => {
        setCreating(false);
      });
  };

  return (
    <Modal onClose={onClose} size="md" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Create Workspace
          <Text fontSize="14px" fontWeight="normal" color={secondaryTextColor}>
            Create your organization&apos;s workspace to get started.
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Acme Inc."
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Stack spacing="8px" direction={["column", "row"]}>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={onCreate}
              isDisabled={!workspaceName}
              isLoading={isCreating}
            >
              Continue
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
