import dayjs from "dayjs";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";

const Show = ({ model, onDialogConfig }) => {
    const price = model.bev_price ? Number(model.bev_price).toFixed(2) : "0.00";

    return (
        <>
            <div className="flex space-x-10 mb-7 pt-3 w-full">
                <div className="space-y-6 w-2/3">
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Name</Label>

                        <div className="text-lg font-semibold">
                            {model.bev_name}
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Category</Label>

                        <div className="text-lg font-semibold">
                            {model.bev_category}
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Description</Label>

                        <div className="text-lg font-semibold">
                            {model.bev_description}
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Price</Label>

                        <div className="text-lg font-semibold">
                            ₱{price}
                        </div>
                    </div>
                </div>

                <div className="space-y-8 w-1/3">
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Created on</Label>

                        <div className="text-lg font-semibold">
                            {dayjs(model.created_at).format("MMMM D, YYYY [at] h:mm A")}
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Created By</Label>

                        <div className="text-lg font-semibold">
                            {model.created_by?.name || "Unknown User"}
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Updated on</Label>

                        <div className="text-lg font-semibold">
                            {dayjs(model.updated_at).format("MMMM D, YYYY [at] h:mm A")}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    className="bg-blue-600 hover:bg-blue-500 rounded-full w-40"
                    onClick={(e) =>
                        onDialogConfig({
                            open: true,
                            process: "update",
                            data: model,
                        })
                    }
                >
                    Update
                </Button>

                <Button
                    variant="secondary"
                    onClick={(e) =>
                        onDialogConfig({
                            open: false,
                            process: "",
                            data: null,
                        })
                    }
                    className="rounded-full w-40"
                >
                    Close
                </Button>
            </div>
        </>
    );
};

export default Show;
