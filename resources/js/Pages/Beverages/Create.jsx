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

    const { data, setData, post, processing, reset, errors } = useForm({
        bev_name: "",
        bev_category: "",
        bev_description: "",
        bev_price: "",
        created_by: auth.user.id,
    });

    const beverageCategories = [
        { value: "Coffee", label: "Coffee" },
        { value: "Tea", label: "Tea" },
        { value: "Smoothie", label: "Smoothie" },
        { value: "Juice", label: "Juice" },
        { value: "Soda", label: "Soda" },
    ];

    const darkMode = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#111827",
            borderColor: "#2D3748",
            color: "#E2E8F0",
            boxShadow: "none",
            '&:hover': {
                borderColor: "#A0AEC0",
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#111827",
            color: "#E2E8F0",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#4A5568" : state.isFocused ? "#2D3748" : "transparent",
            color: state.isSelected ? "#E2E8F0" : "#A0AEC0",
            padding: "10px",
            cursor: "pointer",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#E2E8F0",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#A0AEC0",
        }),
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("beverages.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
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
                                styles={darkMode}
                            />
                            <InputError message={errors.bev_category} className="mt-2" />
                        </div>

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
