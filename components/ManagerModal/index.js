import { useForm } from "react-hook-form";
import Button from "../button";
import Input from "../input";
import Modal, { ModalHeader } from "../modal";
import { useManagerModalOpen, useManagerModalToggle } from "./state";

const ManagerModal = ({ onSetNewMemberFee, onAddMember }) => {
  const open = useManagerModalOpen();
  const toggle = useManagerModalToggle();

  const { handleSubmit, register, watch, setValue } = useForm();

  const fee = watch("fee", 0);
  const memberAddress = watch("memberAddress", 0);

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Manager" onDismiss={toggle} />
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <Input
          autoFocus
          chip=""
          className="mb-8"
          id="fee"
          label="New Member Fee"
          placeholder="UNION"
          min={0}
          ref={register}
          required
          type="number"
        />
        <Button full onClick={() => onSetNewMemberFee(fee)}>
          Confirm
        </Button>
        <div className="divider mb-8" />
        <Input
          autoFocus
          chip=""
          className="mb-8"
          id="memberAddress"
          label="User Address"
          placeholder=""
          ref={register}
          required
          type="string"
        />
        <Button full onClick={() => onAddMember(memberAddress)}>
          Add Member
        </Button>
      </div>
    </Modal>
  );
};

export default ManagerModal;