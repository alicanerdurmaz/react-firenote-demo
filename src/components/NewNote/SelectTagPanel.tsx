import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import TagsIcon from '../../assets/Icons/TagsIcon';
import { firestoreAddTag } from '../../context/NoteContext/firestoreFunctions';
import { useNoteContext } from '../../context/NoteContext/NoteContext';

type Props = {
  tags: string[];
  addTag: (list: string[]) => void;
  userId: string;
};

const SelectTagPanel = ({ addTag, userId, tags }: Props) => {
  const { tagsList } = useNoteContext();

  const [tagInputText, setTagInputText] = useState('');
  const [checkedTags, setCheckedTags] = useState<string[]>(tags);

  useEffect(() => {
    addTag(checkedTags);
    // eslint-disable-next-line
  }, [checkedTags]);

  const tagInputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInputText(value);
  };

  const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const prevState = [...checkedTags];
      prevState.push(e.target.value);
      setCheckedTags(prevState);
      return;
    }
    if (!e.target.checked) {
      const prevState = [...checkedTags].filter(i => i !== e.target.value);
      setCheckedTags(prevState);
      return;
    }
  };

  const createTagHandler = () => {
    firestoreAddTag(tagInputText);
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.focus();
  };

  return (
    <Details>
      <Summary>
        <TagsIcon></TagsIcon>
      </Summary>
      <HiddenPanel>
        <TagInputContainer>
          <TagInput
            onBlur={e => onBlurHandler(e)}
            maxLength={24}
            placeholder='Enter a tag or search'
            value={tagInputText}
            onChange={e => tagInputOnChangeHandler(e)}></TagInput>
        </TagInputContainer>

        <SavedTagsContainer>
          <SavedTagsList>
            {tagsList.map(e => {
              if (!e.includes(tagInputText)) {
                return null;
              }
              return (
                <SavedTagsListItem key={e}>
                  <CheckboxContainer>
                    <Checkbox type='checkbox' id={e} name={e} value={e} onChange={e => checkBoxHandler(e)}></Checkbox>
                    <Label htmlFor={e}>
                      <span>{e}</span>
                    </Label>
                  </CheckboxContainer>
                </SavedTagsListItem>
              );
            })}
          </SavedTagsList>
        </SavedTagsContainer>

        <Divider></Divider>

        <CreateTagContainer onClick={createTagHandler}>
          <PlusIcon></PlusIcon>
          <CreateTagText>
            <div>
              <span>Create</span> "{tagInputText}"
            </div>
          </CreateTagText>
        </CreateTagContainer>
      </HiddenPanel>
    </Details>
  );
};
const Divider = styled.div`
  height: 1px;
  width: 100%;
  left: 0;
  position: absolute;
  border-top: 1px solid ${props => props.theme.borderColor};
  margin-top: 4px;
  margin-bottom: 4px;
`;
const Details = styled.details`
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  display: inline-block;
  position: relative;
  &[open] > summary:before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: block;
    cursor: default;
    content: ' ';
    background: transparent;
  }
`;
const Summary = styled.summary`
  -webkit-tap-highlight-color: transparent;
  ::-webkit-details-marker {
    display: none;
  }
  display: list-item;
  list-style: none;
  user-select: none;
  outline: none;
  margin-right: 16px;
`;
const HiddenPanel = styled.div`
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.backgroundColorSecondary};
  border-radius: 4px;
  text-align: start;
  padding: 4px 8px;
  z-index: 2;
  position: absolute;
  bottom: 120%;
  width: 265px;
`;

const TagInputContainer = styled.div`
  width: 100%;
  display: flex;
`;
const TagInput = styled.input`
  width: 100%;
  color: ${props => props.theme.textColorPrimary};
`;

const CreateTagContainer = styled.div`
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-content: center;
  align-items: center;
  margin-top: 8px;
  padding: 4px 0px;
`;
const CreateTagText = styled.div`
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  div {
    height: max-content;
    font-size: 14px;
    color: ${props => props.theme.textColorPrimary};
    display: inline-block;
    margin-top: 5px;
    word-wrap: break-word;
    font-weight: 700;
    span {
      font-weight: 400;
      margin: 0px 2px;
    }
  }
`;
const PlusIcon = styled.div`
  display: inline-block;
  min-width: 16px;
  min-height: 16px;
  margin-left: -2px;
  background: linear-gradient(${props => props.theme.textColorPrimary}, ${props => props.theme.textColorPrimary}),
    linear-gradient(${props => props.theme.textColorPrimary}, ${props => props.theme.textColorPrimary});
  background-position: center;
  background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
  background-repeat: no-repeat;
`;

const SavedTagsContainer = styled.div`
  padding: 4px 0px;
  padding-top: 16px;
  max-height: 500px;
`;
const SavedTagsList = styled.div`
  overflow: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const SavedTagsListItem = styled.div`
  user-select: none;
  color: ${props => props.theme.textColorPrimary};
  width: 100%;
  height: 24px;
`;

const CheckboxContainer = styled.div`
  height: 100%;
  display: flex;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 100%;
  &::before,
  &::after {
    position: absolute;
    content: '';
    display: inline-block;
  }
  &::before {
    height: 16px;
    width: 16px;
    border: 1px solid ${props => props.theme.textColorPrimary};
    left: 0px;
    top: 3px;
  }
  &::after {
    content: none;
    height: 5px;
    width: 9px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    transform: rotate(-45deg);
    left: 4px;
    top: 7px;
  }
  :hover {
    background: ${props => props.theme.backgroundColor};
  }
  span {
    margin-left: 22px;
    padding-top: 3px;
  }
`;
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  appearance: none;
  &:checked + ${Label}::after {
    content: '';
  }

  &:focus + ${Label} {
    background: ${props => props.theme.backgroundColor};
  }
`;

export default SelectTagPanel;
