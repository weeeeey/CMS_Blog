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
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="mt-4 mb-8 text-xl font-semibold border-b-4 pb-4">
                Leave a Reply
            </h3>
            <form onSubmit={handleSubmit(onVaild)}>
                <textarea
                    className="focus:ring-2 focus:ring-slate-200 outline-none p-4  w-full h-80 bg-slate-100 rounded-lg"
                    {...register("comment", { required: true })}
                    placeholder="Comment"
                />
                <div className="mt-4 space-x-2 w-full flex">
                    <input
                        type="text"
                        className="focus:ring-2 focus:ring-slate-200 outline-none w-full h-14 bg-slate-100 rounded-lg p-4"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
                    <input
                        type="email"
                        className="focus:ring-2 focus:ring-slate-200 outline-none w-full h-14 bg-slate-100 rounded-lg p-4"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                </div>
                <button className="outline-none bg-pink-500 focus:bg-pink-600  hover:bg-pink-600 focus:ring-pink-600  focus:ring-offset-2 focus:ring-2  text-white text-center rounded-full px-6 py-4 mt-8">
                    Post Comment
                </button>
            </form>
        </div>
    );
};

export default CommentsForm;
