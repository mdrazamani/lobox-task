import React, { useState, useRef, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "../../style/multiSelectDropdown/multiSelectDropdown.scss";

interface MultiSelectDropdownProps {
    initialOptions: string[];
    onSelectionChange: (selectedItems: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    initialOptions,
    onSelectionChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<string[]>(initialOptions);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleItemClick = (item: string) => {
        const newSelectedItems = selectedItems.includes(item)
            ? selectedItems.filter((i) => i !== item)
            : [...selectedItems, item];

        setSelectedItems(newSelectedItems);
        onSelectionChange(newSelectedItems);
    };

    const handleInputKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            event.key === "Enter" &&
            inputValue.trim() &&
            !options.includes(inputValue.trim())
        ) {
            const newOptions = [...options, inputValue.trim()];
            setOptions(newOptions);
            handleItemClick(inputValue.trim());
            setInputValue("");
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="dropdown-wrapper" ref={wrapperRef}>
            <div
                className={`dropdown-header ${isOpen ? "active" : ""}`}
                onClick={toggleDropdown}
            >
                {selectedItems.length > 3
                    ? `... ${selectedItems[selectedItems.length - 3]}, ${
                          selectedItems[selectedItems.length - 2]
                      }, ${selectedItems[selectedItems.length - 1]}`
                    : selectedItems.join(", ") || "Select items"}
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    <Scrollbars style={{ height: 250 }}>
                        {options.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className={
                                    selectedItems.includes(item)
                                        ? "selected"
                                        : ""
                                }
                            >
                                {item}
                            </li>
                        ))}
                        <li className="input-item">
                            <input
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                                placeholder="Type and press enter..."
                                autoFocus
                            />
                        </li>
                    </Scrollbars>
                </ul>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
