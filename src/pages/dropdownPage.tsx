import React, { useState } from "react";
import MultiSelectDropdown from "../components/multiSelectDropdown/multiSelectDropdown";
import "../style/multiSelectDropdown/multiSelectDropdownPage.scss";
const DropdownPage: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectionChange = (items: string[]) => {
        setSelectedItems(items);
        console.log("Selected Items:", items);
    };

    return (
        <div className="page-container">
            <MultiSelectDropdown
                initialOptions={[
                    "Education 🎓",
                    "Yeeeah, science! 📡",
                    "Art 🎭",
                    "Sport ⚽",
                    "Games 🎮",
                    "Health 🏥",
                ]}
                onSelectionChange={handleSelectionChange}
            />
        </div>
    );
};

export default DropdownPage;
