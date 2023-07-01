import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import axios from "axios";

export const lookUpConversationByParticipants = createAsyncThunk(
  "lookUpConversationByParticipants",
  async ({ participants }) => {
    try {
      const res = await api.post("/conversations/lookup", {
        recipients: participants,
      });
      console.log(res.data);

      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllConversations = createAsyncThunk(
  "getAllConversations",
  async () => {
    try {
      const res = await api.get("/conversations");
      console.log(res.data.conversations);
      return res?.data?.conversations;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "getAllMessages",
  async ({ id }) => {
    try {
      const res = await api.get(`/conversations/${id}`);
      console.log(res.data.messages);
      return res?.data?.messages;
    } catch (err) {
      console.error(err);
    }
  }
);

export const createNewGroupConversation = createAsyncThunk(
  "createNewGroupConversation",
  async (data) => {
    try {
      const res = await api.post("/conversations/newGroupConversation", data);
      console.log(res.data.returnedGroupConvo);
      return res.data?.returnedGroupConvo;
    } catch (err) {
      console.error(err);
    }
  }
);

export const createNewMessage = createAsyncThunk(
  "createNewMessage",
  async (data) => {
    try {
      const { recipients, media, convId, text, type } = data;

      let uploadedImages = [];

      if (media.length > 0) {
        uploadedImages = await uploadImages(media);
      }

      const body = {
        recipients,
        convId,
        text,
        media: uploadedImages,
        type,
      };

      const res = await api.post("/conversations/newMessage", body);

      console.log(res.data?.savedMessage);
      return res.data?.savedMessage;
    } catch (err) {
      console.error(err);
    }
  }
);

const uploadImages = async (selectedFiles) => {
  try {
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

    if (!CLOUD_NAME) return;

    const formData = new FormData();
    const images = selectedFiles;

    let uploadedImages = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i];

      if (file.file.camera) formData.append("file", file.file.camera);
      else formData.append(`file`, file.file);
      formData.append(`upload_preset`, "jtvaaajn");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const resource = response.data;

        uploadedImages.push({
          imageUrl: resource.secure_url,
          publicId: resource.public_id,
        });
      }
    }

    return uploadedImages;
  } catch (err) {
    console.log("Error uploading files to Cloudinary:", err);
  }
};

export const deleteMessage = createAsyncThunk("deleteMessage", async (id) => {
  try {
    if (!id) return;
    const res = await api.delete(`/conversations/message/${id}`);
    console.log(res.data);
    return id;
  } catch (err) {
    console.error(err);
  }
});
