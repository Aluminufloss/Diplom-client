import React from "react";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  Categories,
  STATIC_URLS,
  TranslatedCategories,
} from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type ParamsType = {
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  value?: string;
  className?: string;
};

type CategoryOptionType = {
  title: string;
  value: string; 
  inputValue?: string;
};

const filter = createFilterOptions<CategoryOptionType>();

const CategorySelector: React.FC<ParamsType> = (props) => {
  const [value, setValue] = React.useState<CategoryOptionType | null>(null);

  React.useEffect(() => {
    const categoryTitle = TranslatedCategories.findIndex((item) => item === props.value);

    console.log()

    if (categoryTitle !== -1) {
      setValue({
        title: TranslatedCategories[categoryTitle],
        value: Categories[categoryTitle],
      });
    }
  }, [props.value]);

  return (
    <StyledCategorySelector className={props.className}>
      <div className="selector__main-title">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/category.svg`}
          alt="Category icon"
          className="selector__icon"
          width={36}
          height={36}
        />
        <span className="selector__title">Выберите категорию</span>
      </div>
      <Autocomplete
        value={value}
        defaultValue={{
          title: TranslatedCategories[TranslatedCategories.length - 1],
          value: TranslatedCategories[TranslatedCategories.length - 1],
        }}
        onChange={(_, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              title: newValue,
              value: newValue,
            });
          } else if (newValue && newValue.title) {
            setValue({
              title: newValue.title,
              value: newValue.value,
            });
          } else {
            setValue(newValue);
            props.setFieldValue("taskInfo.category", newValue?.value || "");
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Категории "${inputValue}" не существует`,
              value: inputValue,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={Categories.map((category, index) => ({
          title: TranslatedCategories[index],
          value: category, 
        }))}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        className="selector__autocomplete"
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Созданные категории"
            className="selector__input"
          />
        )}
      />
    </StyledCategorySelector>
  );
}

const StyledCategorySelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & label {
    top: -4px;

    &.Mui-focused {
      color: ${(props) => props.theme.colorValues.black};

      font-size: 16px;

      top: 0;
    }
  }

  .selector {
    &__autocomplete {
      width: 100%;
      max-width: 300px;

      & .Mui-focused {
        & fieldset {
          border-color: ${(props) => props.theme.colorValues.primary};
        }
      }

      .MuiOutlinedInput-root {
        padding: 12px 16px 0;
      }

      .MuiAutocomplete-input {
        padding: 0 0 12px;
      }
    }

    &__main-title {
      display: flex;
      align-items: center;
    }

    &__icon {
      width: auto;
      height: auto;

      padding-right: 10px;
      margin-right: 2px;

      transform: translateY(1px);
    }

    &__title {
      color: ${(props) => props.theme.colorValues.black};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
    }
  }
`;

export default CategorySelector;
