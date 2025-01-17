import React from "react";
import styled, { css } from "styled-components";

import ReusableImage from "../image";

type PropsType = {
  type: "categories" | "details";
  iconPath: string;
  itemText: string;
  isActiveTab: boolean;
  onCLick?: () => void;
  className?: string;
};

const TabItem: React.FC<PropsType> = (props) => {
  return (
    <StyledTabItem
      type={props.type}
      className={props.className}
      $isActiveTab={props.isActiveTab}
      onClick={props.onCLick}
    >
      <ReusableImage
        src={props.iconPath}
        alt="Tab action"
        className="tab-item__icon"
      />
      <p className="tab-item__text">{props.itemText}</p>
    </StyledTabItem>
  );
};

type StyleType = {
  type: "categories" | "details";
  $isActiveTab: boolean;
};

const StyledTabItem = styled.div<StyleType>`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 5px;

  background-color: ${(props) =>
    props.$isActiveTab && props.theme.colorValues.primary};

  padding: 5px 8px;

  transition: all 0.5s ease;

  cursor: pointer;

  .tab-item {
    &__text {
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) =>
        props.$isActiveTab
          ? props.theme.colorValues.white
          : props.theme.colorValues.black};

      margin-left: 5px;
    }
  }

  ${(props) =>
    !props.$isActiveTab &&
    css`
      &:hover {
        background-color: ${props.type === "categories"
          ? props.theme.colorValues.lightGrey
          : props.theme.colorValues.black};

        .tab-item__icon {
          color: ${props.theme.colorValues.white};
        }
      }
    `}
`;

export default TabItem;
