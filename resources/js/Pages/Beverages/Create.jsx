import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { titleCase } from "@/lib/util";
import LabelEx from "@/Components/LabelEx";
import InputError from "@/Components/InputError";
import Select from "react-select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";

const CreateBeverage = ({ resourceName }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    // Initialize form data with useForm
    const { data, setData, post, processing, reset, errors } = useForm({
        bev_name: "",
        bev_category: "",
        bev_description: "",
        bev_price: "",
        created_by: auth.user.id, // Automatically set the creator based on the logged-in user
    });

    // Beverage categories for the Select dropdown
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
            backgroundColor: "#111827", // Dark background
            borderColor: "#2D3748", // Dark border
            color: "#E2E8F0", // Light text
            boxShadow: "none",
            '&:hover': {
                borderColor: "#A0AEC0", // Lighter border on hover
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#111827", // Dark background for the dropdown
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

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();

        // Posting data to the store route
        post(route("beverages.store"), {
            onSuccess: () => {
                reset(); // Reset form after success
                setOpen(false); // Close the dialog
            },
        });
    };

    return (
        <Dialog className="bg-slate-400" open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 rounded-full hover:bg-blue-500 px-10">
                    Create {titleCase(resourceName)}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-none">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>
                            Create {titleCase(resourceName)}
                        </DialogTitle>
                    </DialogHeader>

                    <Separator className="h-[1px] my-4 bg-slate-500" />

                    <div className="grid gap-4 mb-7 pt-3">
                        {/* Beverage Name */}
                        <div>
                            <LabelEx htmlFor="bev_name" required>
                                Name
                            </LabelEx>
                            <Input
                                value={data.bev_name}
                                onChange={(e) =>
                                    setData("bev_name", e.target.value)
                                }
                                type="text"
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                            <InputError message={errors.bev_name} className="mt-2" />
                        </div>

                        {/* Beverage Category (Updated to use react-select) */}
                        <div>
                            <LabelEx htmlFor="bev_category" required>
                                Category
                            </LabelEx>
                            <Select
                                options={beverageCategories}
                                value={beverageCategories.find(option => option.value === data.bev_category)}
                                onChange={(selectedOption) =>
                                    setData("bev_category", selectedOption ? selectedOption.value : "")
                                }
                                styles={customStyles} // Apply the custom styles here
                            />
                            <InputError message={errors.bev_category} className="mt-2" />
                        </div>

                        {/* Beverage Description */}
                        <div>
                            <LabelEx htmlFor="bev_description" required>
                                Description
                            </LabelEx>
                            <Input
                                value={data.bev_description}
                                onChange={(e) =>
                                    setData("bev_description", e.target.value)
                                }
                                type="text"
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                            <InputError message={errors.bev_description} className="mt-2" />
                        </div>

                        {/* Beverage Price */}
                        <div>
                            <LabelEx htmlFor="bev_price" required>
                                Price
                            </LabelEx>
                            <Input
                                value={data.bev_price}
                                onChange={(e) =>
                                    setData("bev_price", e.target.value)
                                }
                                type="number"
                                step="0.01"
                                min="0"
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                            <InputError message={errors.bev_price} className="mt-2" />
                        </div>
                    </div>

                    <DialogFooter>
                        {processing ? (
                            <Button disabled className="rounded-full w-40">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 rounded-full w-40"
                            >
                                Save
                            </Button>
                        )}

                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                className="rounded-full w-40"
                            >
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBeverage;
