import dayjs from "dayjs";

export const formatFullDay = (day: any) => dayjs(day).format("MMMM D, YYYY");
