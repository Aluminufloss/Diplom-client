import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type PropsType = {
  className?: string;
};

const AddNewListButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton className={props.className}>
      <div className="button__new-list">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/plus.svg`}
          alt="plus icon"
        />
        <span className="button__new-list--text">Add new list</span>
      </div>
      <div className="button__new-list--group">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/group.svg`}
          alt="group icon"
        />
      </div>
    </StyledButton>
  );
};

const StyledButton = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .button__new-list {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 5px 8px;

    border-radius: 5px;

    cursor: pointer;

    &--text {
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.black};

      margin-left: 5px;
    }

    &--group {
      display: flex;
      flex-direction: row;
      align-items: center;

      padding: 5px 8px;

      border-radius: 5px;

      cursor: pointer;
    }

    &:hover,
    &--group:hover {
      background-color: ${(props) => props.theme.colorValues.lightGrey};
    }
  }
`;

export default AddNewListButton;
