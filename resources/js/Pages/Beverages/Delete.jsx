import { Button } from "@/shadcn/ui/button";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

const Delete = ({ model, onDialogConfig, params }) => {
    const { delete: deleteRequest, processing } = useForm();

    const handleDelete = () => {
        deleteRequest(route("beverages.destroy", { beverage: model.bev_id, ...params }), {
            onSuccess: () => {
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
            <div className="mb-4">
                <p className="text-lg font-semibold">Warning: This action cannot be undone.</p>
            </div>

            <div className="flex justify-end space-x-3">
                {processing ? (
                    <Button disabled className="rounded-full w-40">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                    </Button>
                ) : (
                    <Button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-500 rounded-full w-40"
                    >
                        Delete
                    </Button>
                )}

                <Button
                    variant="secondary"
                    onClick={() =>
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

export default Delete;
