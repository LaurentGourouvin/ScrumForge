import axios from "axios";

const AxiosScrumForge = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

export default AxiosScrumForge;
