import dayjs from "dayjs";

export const formatFullDay = (day: any) => dayjs(day).format("MMM DD, YYYY");
