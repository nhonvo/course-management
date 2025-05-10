import toast from "react-hot-toast";

export const showCourseAdded = (name: string) => toast.success(`Course "${name}" added!`);
export const showCourseDeleted = (name: string) => toast.success(`Course "${name}" deleted!`);
