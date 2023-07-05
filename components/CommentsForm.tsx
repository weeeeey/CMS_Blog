import { useForm } from "react-hook-form";

interface FormValues {
    comment: string;
    name: string;
    email: string;
}

const CommentsForm = () => {
    const { register, control, handleSubmit } = useForm<FormValues>({});
    const onVaild = (data: FormValues) => {
        console.log(data);
    };
    return (
        <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
            <h3 className="mt-4 mb-8 text-xl font-semibold border-b-4 pb-4">
                Leave a Reply
            </h3>
            <form onSubmit={handleSubmit(onVaild)}>
                <input
                    className="placeholder-top-left py-2 px-4 outline-none w-full h-80 bg-slate-100 rounded-lg"
                    type="text"
                    {...register("comment", { required: true })}
                    placeholder="comment"
                />
                <div className="mt-4 space-x-2 w-full flex">
                    <input
                        type="text"
                        className="w-full h-20 bg-slate-100 rounded-lg p-2"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
                    <input
                        type="text"
                        className="w-full h-20 bg-slate-100 rounded-lg p-2"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                </div>
                <button className="bg-pink-500 hover:bg-pink-600 hover:border-spacing-2 hover:border text-white text-center rounded-full px-6 py-4 mt-4">
                    Post Comment
                </button>
            </form>
        </div>
    );
};

export default CommentsForm;
