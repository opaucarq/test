import styled from "@emotion/styled";
import React, { useState, useEffect, useRef } from "react";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${({ open }) => (open ? "block" : "none")};
  background-color: #fff;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const SelectAllButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const Dropdown = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const allOptionsSelected = selectedOptions.length === options.length;
    setSelectAll(allOptionsSelected);
  }, [selectedOptions, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        Seleccionar opciones
      </DropdownButton>
      <DropdownList open={isOpen}>
        <li>
          <SelectAllButton onClick={toggleSelectAll}>
            {selectAll ? "Desmarcar todo" : "Seleccionar todo"}
          </SelectAllButton>
        </li>
        {options.map((option) => (
          <DropdownItem key={option} onClick={() => handleOptionClick(option)}>
            <Checkbox
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => {}}
            />
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;
