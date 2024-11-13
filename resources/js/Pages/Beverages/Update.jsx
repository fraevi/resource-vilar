/**
 * teachasgreywolf
 * May 17, 2024
 */

import InputError from "@/Components/InputError";
import LabelEx from "@/Components/LabelEx";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import Select from "react-select";
import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

const Update = ({ model, onDialogConfig, params }) => {
    const { auth } = usePage().props;
    const { data, setData, patch, processing, reset, errors } = useForm({
        bev_name: model.bev_name ?? "",
        bev_category: model.bev_category ?? "",
        bev_description: model.bev_description ?? "",
        bev_price: model.bev_price ?? "",
        created_by: auth.user.id,
    });

    // Debugging: Log model.id to ensure it's available
    console.log("Beverage ID:", model);

    const beverageCategories = [
        { value: "Coffee", label: "Coffee" },
        { value: "Tea", label: "Tea" },
        { value: "Smoothie", label: "Smoothie" },
        { value: "Juice", label: "Juice" },
        { value: "Soda", label: "Soda" },
    ];

    // Custom styles for dark mode
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#2D3748", // Dark background
            borderColor: "#4A5568", // Dark border
            color: "#E2E8F0", // Light text
            boxShadow: "none",
            '&:hover': {
                borderColor: "#A0AEC0", // Lighter border on hover
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#2D3748", // Dark background for the dropdown
            color: "#E2E8F0", // Light text for options
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#4A5568" : state.isFocused ? "#2D3748" : "transparent", // Dark focused/selected
            color: state.isSelected ? "#E2E8F0" : "#A0AEC0", // Light text
            padding: "10px",
            cursor: "pointer",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#E2E8F0", // Light text for selected value
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#A0AEC0", // Light grey placeholder
        }),
    };


    const submit = (e) => {
        e.preventDefault();

        // Debugging: Check the correct field for the ID
        console.log("Submitting update for beverage with bev_id:", model.bev_id);

        // Ensure that the beverage bev_id is correctly passed to the route
        if (!model.bev_id) {
            console.error("Beverage bev_id is missing!");
            return;  // Exit if model.bev_id is not available
        }

        // Use the correct field for bev_id and pass it as 'beverage' in the route
        patch(route("beverages.update", { beverage: model.bev_id }), {
            onSuccess: () => {
                reset();
                onDialogConfig({
                    open: false,
                    process: "",
                    data: null,
                });
            },
        });
    };




    return (
        <>
            <form onSubmit={submit}>
                <div className="grid gap-4 mb-7 pt-3">
                    <div className="">
                        <LabelEx htmlFor="bev_name" required>Name</LabelEx>

                        <Input
                            value={data.bev_name}
                            onChange={(e) => setData("bev_name", e.target.value)}
                            type="text"
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />

                        <InputError message={errors.bev_name} className="mt-2" />
                    </div>

                    <div>
                    <label htmlFor="bev_category" required>Beverage Category</label>
                    <Select
                        options={beverageCategories}
                        value={beverageCategories.find(option => option.value === data.bev_category)}
                        onChange={(selectedOption) => setData("bev_category", selectedOption.value)}
                        styles={customStyles}
                    />
                    <InputError message={errors.bev_category} className="mt-2" />
                </div>


                    <div className="">
                        <LabelEx htmlFor="bev_description" required>Description</LabelEx>

                        <Input
                            value={data.bev_description}
                            onChange={(e) => setData("bev_description", e.target.value)}
                            type="text"
                            min="0"
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />

                        <InputError message={errors.bev_description} className="mt-2" />
                    </div>

                    <div className="">
                        <LabelEx htmlFor="bev_price" required>Price</LabelEx>

                        <Input
                            value={data.bev_price}
                            onChange={(e) => setData("bev_price", e.target.value)}
                            type="number"
                            min="0"
                            step="0.01"
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />

                        <InputError message={errors.bev_price} className="mt-2" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                    {processing ? (
                        <Button disabled className="rounded-full w-40">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 rounded-full w-40"
                        >
                            Save
                        </Button>
                    )}

                    <Button
                        variant="secondary"
                        onClick={() => onDialogConfig({ open: false, process: "", data: null })}
                        className="rounded-full w-40"
                    >
                        Close
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Update;
