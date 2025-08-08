import axios from "axios";

export const evaluateResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/ai/resume-eval`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Resume evaluation failed", err);
    throw err;
  }
};
