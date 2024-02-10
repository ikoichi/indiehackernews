"use client";

import { useColorModeValues } from "@/hooks/useColorModeValues";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import * as isEmail from "isemail";

type Props = {
  isOpen: boolean;
  workspaceId: string;
  workspaceName: string;
  onClose: () => void;
};

export const AddWorkspaceMember = ({
  workspaceId,
  workspaceName,
  isOpen,
  onClose,
}: Props) => {
  const { secondaryTextColor } = useColorModeValues();

  const [isCreating, setCreating] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [role, setRole] = useState("");

  const onCreate = () => {
    setCreating(true);
    axios
      .post("/api/workspace/invite", {
        workspaceId,
        email: memberEmail,
        role,
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
          Add member
          <Text fontSize="14px" fontWeight="normal" color={secondaryTextColor}>
            Add member to {workspaceName}
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="16px">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="jon@doe.com"
                onChange={(e) => setMemberEmail(e.target.value)}
              />
              <FormHelperText>An invitation email will be sent.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select onChange={(e) => setRole(e.target.value)}>
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
                <option value="Guest">Guest</option>
              </Select>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter mt="16px">
          <Stack spacing="8px" direction={["column", "row"]}>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={onCreate}
              isDisabled={!memberEmail || !isEmail.validate(memberEmail)}
              isLoading={isCreating}
            >
              Add
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
