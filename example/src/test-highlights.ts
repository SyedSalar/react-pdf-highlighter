import axios from 'axios';
import { IHighlight } from './react-pdf-highlighter';
const searchParams = new URLSearchParams(window.location.search);
const urlParam = searchParams.get("url");
const docName = searchParams.get("docName");
const user = searchParams.get("user");

export interface TestHighlights {
  [key: string]: IHighlight[];
}

// Initialize testHighlights as an empty object
export const testHighlights: TestHighlights = {};

// Fetch highlights from the API and populate testHighlights
export const fetchHighlights = async (): Promise<void> => {
  try {
    if (!docName) {
      throw new Error("docName is not provided");
    }

// <<<<<<< HEAD
    const response = await axios.get(`http://127.0.0.1:8083/api/documents/comments?docName=${docName}&user=${user}`, {
// =======
//     const response = await axios.get(`http://54.81.250.98:8083/api/documents/comments?docName=${docName}`, {
// >>>>>>> 01c2059cf8ac58b94f13f476e72d33a7e54a5610
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Highlights fetched from backend:", response.data);
    if (urlParam) {
      testHighlights[urlParam] = response.data;
    } else {
      console.error("URL parameter is not provided.");
    }  
  } catch (error) {
    console.error("Error loading highlights:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
