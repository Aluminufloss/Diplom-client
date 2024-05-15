import React from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

const TaskSearchBar: React.FC = () => {
  const pathName = usePathname();
  const isAnalyticsPage = pathName.includes("analytics");
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  return !isAnalyticsPage ? (
    <StyledSearch
      onClick={() => setIsInputFocused(true)}
      $isFocused={isInputFocused}
    >
      <ReusableImage
        src={`${STATIC_URLS.SVG_ICONS}/search.svg`}
        alt="Search icon"
      />
      <input
        type="search"
        onBlur={() => setIsInputFocused(false)}
        placeholder="Поиск задач..."
        className="input"
      />
    </StyledSearch>
  ) : null;
};

const StyledSearch = styled.div<{ $isFocused: boolean }>`
  width: 100%;
  max-width: ${(props) => (props.$isFocused ? "340px" : "300px")};

  display: flex;
  align-items: center;

  border-radius: 5px;

  background-color: ${(props) => props.theme.colorValues.strokeGrey};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  padding: 8px 12px;

  transition: max-width 0.3s ease;

  .input {
    width: 100%;
    height: 100%;

    background-color: ${(props) => props.theme.colorValues.strokeGrey};
  }
`;

export default TaskSearchBar;
