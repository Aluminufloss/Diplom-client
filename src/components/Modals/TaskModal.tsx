import React from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";

import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

import { setModalVisibility } from "@/store/slices/TaskModal";

import ModalHeader from "../ModalHeader";
import Input from "../UI/input";
import PrioritySelector from "../TaskModalSelectors/PrioritySelector";
import RepeatSelector from "../TaskModalSelectors/RepeatSelector";
import PlannedDateSelector from "../TaskModalSelectors/PlannedDateSelector";

type ParamsType = {};

const TaskModal: React.FC<ParamsType> = () => {
  const modalInfo = useAppSelector((state) => state.taskModal);

  const dispatch = useAppDispatch();

  return (
    <>
      <Formik initialValues={modalInfo.modalParams} onSubmit={() => {}}>
        {({ values, handleChange }) => (
          <StyledModal $isModalVisible={modalInfo.isModalVisible}>
            <ModalHeader modalType={modalInfo.modalParams.modalType} />
            <div className="modal__content">
              <Input
                value={values.taskName}
                onChange={handleChange}
                name="taskName"
                placeholder="Введите название задачи"
                className="modal__input"
              />
              <textarea
                placeholder="Добавьте описание задачи"
                name="taskDescription"
                className="modal__textarea"
              />
              <PrioritySelector
                className="modal__priority"
                currentPriority={modalInfo.modalParams.priority}
              />
              <RepeatSelector
                className="modal__repeat"
                selectedDays={modalInfo.modalParams.repeatDays.days}
              />
              <PlannedDateSelector />
            </div>
          </StyledModal>
        )}
      </Formik>
      {modalInfo.isModalVisible && <StyledOverlay
        onClick={() => dispatch(setModalVisibility(false))}
      />}
    </>
  );
};

const StyledModal = styled(Form)<{ $isModalVisible: boolean }>`
  position: absolute;
  top: ${(props) => (props.$isModalVisible ? "5%" : "-100%")};
  right: 50%;
  transform: translateX(50%);

  width: 100%;
  max-width: 840px;
  max-height: 85vh;

  z-index: 300;

  transition: all 0.5s ease;

  overflow-y: scroll;
  scrollbar-width: thin;

  div::-webkit-scrollbar {
    display: none;
  }

  background-color: white;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  .modal {
    &__content {
      padding: 20px 24px;
    }

    &__input,
    &__priority,
    &__repeat,
    &__date {
      margin-bottom: 20px;
    }

    &__textarea {
      ${(props) => props.theme.typography.fnMedium};
      ${(props) => props.theme.typography.fnLabel2};

      width: 100%;
      height: 120px;

      resize: none;
      overflow: scroll;

      &::-webkit-scrollbar {
        width: 0;
      }

      padding: 12px 16px;
      margin-bottom: 20px;

      border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
      border-radius: 5px;

      &::placeholder {
        color: ${(props) => props.theme.colorValues.darkGrey};
      }
    }
  }
`;

const StyledOverlay = styled.div`
  position: absolute;

  top: -77px;
  left: 0;

  width: 100vw;
  height: 120vh;

  z-index: 200;

  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 1s ease;

  overflow: hidden;
`;

export default TaskModal;
