import axios from 'axios';
import { FigmaFile, Node } from '../types/figma.types';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_FIGMA_API_URL,
  headers: {
    'X-Figma-Token': import.meta.env.VITE_FIGMA_API_TOKEN,
  },
});

export const getFigmaFile = async (fileId: string): Promise<FigmaFile> => {
  try {
    const response = await axiosInstance.get(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Figma file:', error);
    throw error;
  }
};

export const getNodeDetails = async (
  fileId: string,
  nodeId: string
): Promise<Node> => {
  try {
    const response = await axiosInstance.get(`/files/${fileId}/nodes`, {
      params: { ids: nodeId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching node details:', error);
    throw error;
  }
};
